<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const auth = useAuthStore()
const router = useRouter()

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

const handleLogout = async () => {
  await auth.logout()
  router.push({ name: 'home' })
}

const switchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const switchToLogin = () => {
  showLoginModal.value = true
  showRegisterModal.value = false
}
</script>

<template>
  <div class="auth-page"></div>
  <header class="header">
    <nav class="nav">
      <div class="nav__brand">
        <router-link :to="{ name: 'home' }" class="nav__logo-container">
          <img src="@/assets/logo.svg" alt="Compant Logo" class="nav__logo" />
        </router-link>
      </div>
      <ul class="nav__list">
        <template v-if="!auth.isAuthenticated">
          <li class="nav__item">
            <button
              @click="() => (showLoginModal = true)"
              class="nav__link nav__link--login"
            >
              Login
            </button>
          </li>
          <li class="nav__item">
            <button
              @click="() => (showRegisterModal = true)"
              class="nav__link nav__link--register"
            >
              Register
            </button>
          </li>
        </template>
        <template v-else>
          <li class="nav__item">
            <span class="nav__user">{{ auth.user?.username }}</span>
          </li>
          <li class="nav__item">
            <button @click="handleLogout" class="nav__link nav__link--logout">
              Logout
            </button>
          </li>
        </template>
      </ul>
    </nav>

    <LoginModal
      :show="showLoginModal"
      @close="() => (showLoginModal = false)"
      @switch-to-register="switchToRegister"
    />

    <RegisterModal
      :show="showRegisterModal"
      @close="() => (showRegisterModal = false)"
      @switch-to-login="switchToLogin"
    />
  </header>
</template>

<style scoped lang="stylus">
.header {
  width 100%
  border-bottom 1px solid #ccc
  padding 1rem 0
}

.nav {
  display flex
  justify-content space-between
  align-items center
  padding 0 2rem
  margin 0 auto
  max-width 1200px

  &__brand {
    display flex
    align-items center
  }

  &__logo {
    height 3rem
    width auto
  }

  &__list {
    display flex
    list-style none
    padding 0
    margin 0
    gap 1.5rem
  }

  &__item {
    display flex
    align-items center
  }

  &__link {
    text-decoration none
    padding 0.5rem 1rem
    border-radius 6px
    font-weight 500
    transition all 0.3s ease
    color #333

    &--login {
      color #007bff
    }

    &--register {
      color #28a745
    }

    &--active {
      background-color #f8f9fa
    }
  }
}
</style>
