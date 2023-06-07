const multer = require("multer");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from Express!' });
});
//mysql
const mysql = require('mysql');
const { request } = require("express");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8',
  database: 'webData'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');
});
//用户注册
app.post('/mysql/users/register',(req, res) => {
  let id=req.body.id;
  let password=req.body.password;
  let imageSrc=req.body.imageSrc;
  console.log(id,password);
  connection.query('insert into users values(?,?) ',[id,password], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);    
  });
});
//用户查询
app.get('/mysql/users/select', (req, res) => {
  let id=req.query.id;
  let password=req.query.password;
  console.log(id,password);
  connection.query('SELECT * FROM users where id=? and password=?',[id,password], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    if(!results.length){
      res.json({})
      return
    }
    const imageData = {id:String}
    imageData.id =results[0].id    
    res.json({userData:imageData});    
  });
});
//增加商品的照片
const upload = multer({ storage: multer.memoryStorage() });
app.post('/mysql/goods/imageUpload', upload.single("image"),(req, res) => {
  const image = req.file;
  if (!image || !image.mimetype.startsWith("image/")) {
    return res.status(400).send("Invalid image file");
  }

  connection.query('insert into goodsImage (name,image) values(?,?)',[image.originalname, image.buffer], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    // LOAD_FILE()
    res.json(results);    
  });
  // 

});
//增加商品
app.post('/mysql/goods/infoAdd',(req, res) => {
  const {title,name,tag,description,price,num}=req.body
  console.log(title,name,tag,description,price,num)
  connection.query('insert into goods (title,shopkeeper,tag,description,price,num) value(?,?,?,?,?,?)',[title,name,tag,description,price,num], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    // LOAD_FILE()
    res.json(results);    
  });
});
//删除商品
app.post('/mysql/goods/infoDel',(req, res) => {
  const id=req.body.id
  console.log(id);
  connection.query('delete from goods where id=?',[id], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);    
  });
});
//删除图片
app.post('/mysql/image/infoDel',(req, res) => {
  const id=req.body.id
  console.log(id);
  connection.query('delete from goodsImage where id=?',[id], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);    
  });
});
//更新商品信息
//前端展示图片,商品信息
app.get('/mysql/goods/show',(req, res) => {
  connection.query('SELECT * FROM goods', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);    
  });
}),
app.get('/mysql/goods/imageShow',(req, res) => {
  connection.query('SELECT id,image FROM goodsImage', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    const imageData = {id:[],image:[]}
    for(let i in results){
      imageData.image[i] = results[i].image.toString('base64')
      imageData.id[i] =results[i].id    
    }
    // const imageData = results[0].image.toString('base64'); 
    // const dataUri = `data:image/jpeg;base64,${imageData}`;
    res.json({image:imageData});    
  });
}),
//商品搜索功能
app.get('/mysql/goods/search', (req, res) => {
  let search=req.query.search.split('')
  // console.log(search);

  connection.query('SELECT id,tag FROM goods',(error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    const tagData={id:[],tag:[]}
    for(let i=0; i<results.length; i++) {
      tagData.id[i]=results[i].id
      tagData.tag[i]=results[i].tag
    }
    // console.log(tagData);
    const keyId={id:[]}
    for(let i=0; i<tagData.id.length; i++) {
      for(let j=0; j<search.length; j++){
        if(tagData.tag[i].includes(search[j])){
          keyId.id.push(tagData.id[i])
        }
      }
    }
    const set = new Set(keyId.id);
    const arr=Array.from(set)
    // console.log(arr);  
    res.json(arr);    
  });
});
//自己的商品搜索
app.get('/mysql/mygoods/search', (req, res) => {
  connection.query('SELECT id FROM goods where shopkeeper=?',[req.query.name],(error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    } 
    res.json(results);    
  });
});
//根据ID搜索商品图片
app.get('/mysql/goods/imageSelect',(req, res) => {
  if(!req.query.id)return;
  connection.query('SELECT * FROM goodsImage where id=?', [req.query.id],(error, results, fields) => {
   
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    const imageData = results[0].image.toString('base64');
    res.json(imageData);    
  });
}),
//根据ID搜索商品
app.get('/mysql/goods/select',(req, res) => {
  if(!req.query.id)return;
  connection.query('SELECT * FROM goods where id=?', [req.query.id],(error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results[0]);    
  });
}),
//查询聊天信息
app.get('/mysql/messages/select',(req, res) => {
  connection.query('SELECT * FROM messages where reciever=? and isRead=false', [req.query.id],(error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);    
  });
  connection.query('update messages set isRead=true where reciever=? and isRead=false', [req.query.id],(error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }   
  });
}),
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
// app.use(cors({
//     origin: 'http://localhost:5173/account',
//   }));


