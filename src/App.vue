<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(async () => {
  await auth.initializeAuth()
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

body {
  display: flex;
  flex-direction: column;
}
</style>
