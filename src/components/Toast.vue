<template>
  <transition name="fade">
    <div v-if="show" :class="['toast', toastClass, 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50', 'flex items-center gap-3 px-4 py-2 rounded-lg shadow']">
      <svg v-if="type === 'success'" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      <svg v-else-if="type === 'error'" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      <span>{{ message }}</span>
      <button v-if="showUndo" @click="$emit('undo')" class="ml-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs shadow transition-colors">{{ undoText }}</button>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success',
  },
  showUndo: {
    type: Boolean,
    default: false,
  },
  undoText: {
    type: String,
    default: 'Deshacer',
  },
});

const toastClass = props.type === 'error' ? 'toast-error' : 'toast-success';
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 