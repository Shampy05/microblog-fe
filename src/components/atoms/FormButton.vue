<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :class="['form-button', `form-button-${variant || 'primary'}`]"
  >
    <slot></slot>
  </button>
</template>

<style lang="stylus" scoped>
.form-button {
  width 100%
  padding 0.875rem
  border none
  border-radius 4px
  font-size 1rem
  cursor pointer
  transition opacity 0.2s
}

.form-button:disabled {
  opacity 0.7
  cursor not-allowed
}

.form-button-primary {
  background-color #007bff
  color white
}

.form-button-secondary {
  background-color #6c757d
  color white
}

.form-button-danger {
  background-color #dc3545
  color white
}
</style>
