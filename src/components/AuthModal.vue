<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps<{
  show: boolean
  title: string
}>()

const emit = defineEmits(['close'])

const modalContent = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (modalContent.value && !modalContent.value.contains(e.target as Node)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="modal-overlay" role="dialog" aria-modal="true">
        <div ref="modalContent" class="modal-content" role="document">
          <div class="modal-header">
            <h2>
              {{ title }}
              <button
                class="close-button"
                @click="$emit('close')"
                aria-label="Close modal"
              >
                &times;
              </button>
            </h2>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="stylus">
.modal-overlay {
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0, 0, 0, 0.5)
  display flex
  justify-content center
  align-items center
  z-index 1000
}

.modal-content {
  background-color var(--galaxy-black)
  padding 2rem
  border-radius 8px
  max-width 500px
  width 90%
  max-height 90vh
  overflow-y auto
}

.modal-header {
  display flex
  justify-content space-between
  align-items center
  margin-bottom 1.5rem
}

.close-button {
  background none
  color var(--galaxy-white)
  border none
  font-size 1.5rem
  cursor pointer
  padding 0.5rem
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition opacity 0.3s ease
}

.modal-fade-enter, .modal-fade-leave-to {
  opacity 0
}
</style>
