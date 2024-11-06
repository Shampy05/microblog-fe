<script setup lang="ts">
defineProps<{
  modalValue: string
  label: string
  type?: string
  id: string
  required?: boolean
  disabled?: boolean
  error?: string
}>()
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}:</label>
    <input
      :type="type || 'text'"
      :id="id"
      :value="modalValue"
      :required="required"
      :disabled="disabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="form-input"
      :class="{ 'form-input-error': error }"
    />
    <span v-if="error" class="form-error">{{ error }}</span>
  </div>
</template>

<style scoped lang="stylus">
.form-group {
  margin-bottom 1rem
}

.form-input {
  width 100%
  padding 0.5rem
  font-size 1rem
  border 1px solid #ddd
  border-radius 4px
  font-size 1rem
}

.form-input-error {
  border-color red
}

.form-error {
  color #dc3545
  font-size 0.875rem
  margin-top 0.25rem
  display block
}
</style>
