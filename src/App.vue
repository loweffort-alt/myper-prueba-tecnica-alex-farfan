<template>
  <div class="min-h-screen transition-colors duration-300">
    <div class="min-h-screen bg-app transition-colors duration-300">
      <!-- Navigation Header -->
      <nav class="bg-navbar shadow-lg border-b border-app transition-colors duration-300 px-2 sm:px-4 lg:px-8 w-full">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 py-2 sm:py-0 gap-2 sm:gap-0">
          <!-- Logo/Title - Responsive -->
          <div class="flex items-center gap-3">
            <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-navbar-contrast tracking-wide">
              <span class="hidden sm:inline">CRUD de Usuarios</span>
              <span class="sm:hidden">CRUD Users</span>
            </h1>
          </div>
          <!-- Right section: Nuevo Usuario + Theme Toggle + Author -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Botón Nuevo Usuario -->
            <button
              @click="openCreateForm"
              id="nuevo-usuario-navbar"
              class="btn-primary px-4 py-2 flex items-center gap-2 shadow hover:scale-105 active:scale-95 transition-transform"
              style="font-size: 1rem;"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              <span class="hidden sm:inline">Nuevo Usuario</span>
              <span class="sm:hidden">Nuevo</span>
            </button>
            <!-- Theme Toggle Button -->
            <button
              @click="toggleTheme"
              class="relative flex items-center justify-center w-10 h-10 rounded-full border border-app bg-navbar transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary group"
              :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <span class="sr-only">Cambiar tema</span>
              <span class="relative flex items-center justify-center w-6 h-6">
                <svg v-if="isDark" class="absolute w-6 h-6 text-yellow-400 transition-transform duration-300 rotate-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="absolute w-6 h-6 text-blue-400 transition-transform duration-300 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </span>
            </button>
            <!-- Author info - Responsive -->
            <div class="text-right hidden sm:block">
              <p class="text-xs text-navbar-contrast opacity-70">Developed by</p>
              <p class="text-sm font-medium text-navbar-contrast">Alex Farfán</p>
            </div>
          </div>
        </div>
      </nav>
      <!-- Main Content -->
      <main class="transition-colors duration-300 px-2 sm:px-4 lg:px-8 w-full max-w-7xl mx-auto">
        <UserList
          :open-edit-form="openEditForm"
          :show-user-form="showUserForm"
          :selected-user="selectedUser"
          :is-edit="isEdit"
          @close-user-form="closeUserForm"
          @user-saved="handleUserSaved"
          @user-deleted="handleUserDeleted"
        />
        <UserForm
          v-if="showUserForm"
          :user="selectedUser"
          :is-edit="isEdit"
          @saved="handleUserSaved"
          @cancel="closeUserForm"
        />
        <div v-if="toast.show" :class="['fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-base font-semibold', toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white']">
          {{ toast.message }}
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserForm from './components/UserForm.vue'
import UserList from './views/UserList.vue'

const isDark = ref(false)

// Estado global para mostrar el formulario de usuario
const showUserForm = ref(false)
const selectedUser = ref(null)
const isEdit = ref(false)

// Toast state
const toast = ref({ show: false, message: '', type: 'success' })
let toastTimeout = null

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, 2500)
}

const openCreateForm = () => {
  selectedUser.value = { name: '', username: '', email: '', phone: '' }
  isEdit.value = false
  showUserForm.value = true
}
const openEditForm = (user) => {
  selectedUser.value = { ...user }
  isEdit.value = true
  showUserForm.value = true
}
const closeUserForm = () => {
  showUserForm.value = false
  selectedUser.value = null
}

const handleUserSaved = (action) => {
  closeUserForm()
  if (action === 'create') showToast('Usuario creado', 'success')
  if (action === 'edit') showToast('Usuario actualizado', 'success')
}
const handleUserDeleted = () => {
  showToast('Usuario eliminado', 'success')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    isDark.value = true
  }
  
  updateTheme()
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      updateTheme()
    }
  })
})
</script>
