<script setup lang="ts">
import FormInput from '../atoms/FormInput.vue'
import FormButton from '../atoms/FormButton.vue'

defineProps<{
  type: 'login' | 'register'
  loading?: boolean
  error?: string
}>()

defineEmits(['submit'])
</script>

<template>
  <form @submit.prevent="$emit('submit')" class="auth-form">
    <div v-if="error" class="auth-error">
      {{ error }}
    </div>

    <slot name="inputs"></slot>

    <FormButton type="submit" :disabled="loading">
      {{
        loading
          ? type === 'login'
            ? 'Signing in...'
            : 'Registering...'
          : type === 'login'
            ? 'Sign In'
            : 'Register'
      }}
    </FormButton>

    <div class="auth-footer">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<style scoped lang="stylus">
.auth-form {
  display flex
  flex-direction column
  gap 1rem
}

.auth-error {
  padding 0.75rem
  background-color #ffebee
  border 1px solid #ffcdd2
  border-radius 4px
  color #c62828
}

.auth-footer {
  text-align center
  margin-top 1rem
}
</style>
