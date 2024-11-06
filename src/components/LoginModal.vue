<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'
import AuthModal from './AuthModal.vue'
import AuthForm from './molecules/AuthForm.vue'
import FormInput from './atoms/FormInput.vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close', 'switch-to-register'])

const { isOpen, close } = useModal(props.show)

watch(
  () => props.show,
  newVal => {
    isOpen.value = newVal
  },
)

watch(isOpen, newVal => {
  if (!newVal) {
    emit('close')
  }
})

const handleClose = () => {
  close()
  emit('close')
}

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await auth.login(username.value, password.value)

    if (success) {
      emit('close')
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
  <AuthModal :show="show" title="Login" @close="handleClose">
    <AuthForm
      type="login"
      :loading="loading"
      :error="error"
      @submit="handleSubmit"
    >
      <template #inputs>
        <FormInput
          v-model="username"
          :modal-value="username"
          label="Enter username"
          id="username"
          required
          :disabled="loading"
        />
        <FormInput
          v-model="password"
          :modal-value="password"
          type="password"
          id="password"
          label="Enter password"
          required
          :disabled="loading"
        />
      </template>

      <template #footer>
        <p>
          Don't have an account?
          <a href="#" @click.prevent="$emit('switch-to-register')">
            Register here
          </a>
        </p>
      </template>
    </AuthForm>
  </AuthModal>
</template>
