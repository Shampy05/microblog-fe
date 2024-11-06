<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const loading = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  loading.value = false
  error.value = ''

  try {
    const success = await auth.login(username.value, password.value)

    if (success) {
      if (rememberMe.value) {
        console.log('clicked on rememberMe')
      }

      // use router-link to navigate to home page
      router.push({ name: 'home' })
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed'
    console.error('Login error: ', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <Navigation />
    <main class="auth-content">
      <h2>Login</h2>
      <div class="login-form">
        <form @submit="handleSubmit">
          <div class="error-message" v-if="error">
            {{ error }}
          </div>
          <p>
            <label for="username">Enter username:</label>
            {{ console.log('username', username) }}
            <input
              type="text"
              name="username"
              v-model="username"
              id="username"
              required
              :disabled="loading"
            />
          </p>
          <p>
            <label for="password">Enter password:</label>
            <input
              type="password"
              v-model="password"
              id="password"
              required
              :disabled="loading"
            />
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="rememberMe" :disabled="loading" />
              Remember me
            </label>
          </p>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        <p class="auth-switch">
          Don't have an account?
          <router-link :to="{ name: 'register' }">Register</router-link>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="stylus">
.auth-page {
  min-height 100vh
  display flex
  flex-direction column
}

.auth-content {
  flex 1
  display flex
  flex-direction column
  align-items center
  padding 2rem
}

.auth-switch {
  margin-top 1rem
  text-align center
}
</style>
