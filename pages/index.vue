<template>
   <div></div> 
</template>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

onMounted(() => {
  router.replace('/client')
})
</script>