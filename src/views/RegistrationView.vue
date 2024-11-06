<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async (event: Event) => {
  event.preventDefault()

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const success = await auth.register(
      username.value,
      password.value,
      email.value,
    )

    if (success) {
      router.push('/')
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed'
    console.error('Registration error: ', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <Navigation />
    <main class="auth-content">
      <h2>Registration</h2>
      <div class="register-form">
        <form @submit="handleRegister">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <p>
            <label for="username">Username:</label>
            <input
              type="text"
              id="reg-username"
              v-model="username"
              required
              :disabled="loading"
            />
          </p>
          <p>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              :disabled="loading"
            />
          </p>
          <p>
            <label for="password">Password:</label>
            <input
              type="password"
              id="reg-password"
              v-model="password"
              required
              :disabled="loading"
            />
          </p>
          <p>
            <label for="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="reg-confirm-password"
              v-model="confirmPassword"
              required
              :disabled="loading"
            />
          </p>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>
        <p class="auth-switch">
          Already have an account?
          <router-link :to="{ name: 'login' }">Login</router-link>
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
