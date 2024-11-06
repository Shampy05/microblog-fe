<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="home">
    <Navigation />
    <main class="main-content">
      <h1>Welcome to Microblog</h1>
      <div v-if="auth.isAuthenticated">
        <p>Welcome back, {{ auth.user?.username }}!</p>
      </div>

      <div v-else>
        <p>Register or login to start posting!</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="stylus">
.home {
  min-width 100vh
  display flex
  flex-direction column
}

.main-content {
  flex 1
  padding 2rem
  max-width 1200px
  margin 0 auto
  width 100%
}
</style>
