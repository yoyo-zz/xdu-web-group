<template>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange($emit)"
    />
  </template>
  
  <script setup lang="ts">
    import {ref,watch} from 'vue'
  
  const props = defineProps({
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  })
  
  const currentPage = ref(1)
  watch(currentPage, (newPage) => {
  console.log(`page is ${newPage}`)
})
  function handleCurrentChange(emit) {
    // console.log(pageNumber)
    // currentPage.value = pageNumber
    console.log(currentPage.value,434324)
    emit('page-change',currentPage.value)
  }
  </script>