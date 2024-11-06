import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useModal(initialState = false) {
  const isOpen = ref(initialState)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  }

  const handleBodyScroll = (shouldPrevent: boolean) => {
    document.body.style.overflow = shouldPrevent ? 'hidden' : ''
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscKey)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKey)
    handleBodyScroll(false)
  })

  watch(isOpen, newVal => {
    handleBodyScroll(newVal)
  })

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
