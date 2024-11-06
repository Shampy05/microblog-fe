<script setup lang="ts">
import AuthModal from './AuthModal.vue'
import AuthForm from './molecules/AuthForm.vue'
import FormInput from './atoms/FormInput.vue'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'

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
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await auth.register(
      username.value,
      password.value,
      email.value,
    )
    if (success) {
      emit('close')
      router.push('/')
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthModal :show="show" title="Register" @close="handleClose">
    <AuthForm
      type="register"
      :loading="loading"
      :error="error"
      @submit="handleSubmit"
    >
      <template #inputs>
        <FormInput
          v-model="username"
          :modal-value="username"
          label="Username"
          id="register-username"
          required
          :disabled="loading"
        />
        <FormInput
          v-model="email"
          :modal-value="email"
          label="Email"
          id="register-email"
          type="email"
          required
          :disabled="loading"
        />
        <FormInput
          v-model="password"
          :modal-value="password"
          label="Password"
          id="register-password"
          type="password"
          required
          :disabled="loading"
        />
      </template>
      <template #footer>
        <p>
          Already have an account?
          <a href="#" @click.prevent="emit('switch-to-login')"> Login here </a>
        </p>
      </template>
    </AuthForm>
  </AuthModal>
</template>
