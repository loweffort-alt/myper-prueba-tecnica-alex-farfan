<template>
  <div class="min-h-screen transition-colors duration-300">
    <div class="min-h-screen transition-colors duration-300">
      <!-- Navigation Header -->
      <nav class="bg-white dark:bg-[#181c23] shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
          <div class="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 py-2 sm:py-0 gap-2 sm:gap-0">
            <!-- Logo/Title - Responsive -->
            <div class="flex-shrink-0 mb-2 sm:mb-0">
              <h1 class="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white">
                <span class="hidden sm:inline">Myper</span>
                <span class="sm:hidden">Myper</span>
              </h1>
            </div>
            
            <!-- Right section with theme toggle and author -->
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Botón Nuevo Usuario -->
              <button
                @click="openCreateForm"
                id="nuevo-usuario-navbar"
                class="btn-primary px-4 py-2 flex items-center gap-2"
                style="font-size: 1rem;"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                <span class="hidden sm:inline">Nuevo Usuario</span>
                <span class="sm:hidden">Nuevo</span>
              </button>
              <!-- Theme Toggle Button -->
              <ThemeToggle :is-dark="isDark" :toggle-theme="toggleTheme" />
              <!-- Author info - Responsive -->
              <div class="text-right">
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <span class="hidden sm:inline">Developed by</span>
                </p>
                <p class="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  <span class="hidden sm:inline">Alex Farfán</span>
                  <span class="sm:hidden">AF</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- Main Content -->
      <main class="transition-colors duration-300 px-2 sm:px-0 lg:px-0 w-full max-w-7xl mx-auto">
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
        <Toast 
          :show="toast.show" 
          :message="toast.message" 
          :type="toast.type" 
          :show-undo="toast.showUndo" 
          @undo="handleUndo"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserList from './views/UserList.vue'
import UserForm from './components/UserForm.vue'
import Toast from './components/Toast.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useUserStore } from './store/user'

const isDark = ref(false)

// Estado global para mostrar el formulario de usuario
const showUserForm = ref(false)
const selectedUser = ref(null)
const isEdit = ref(false)

// Toast state
const toast = ref({ show: false, message: '', type: 'success', showUndo: false })
let toastTimeout = null
const lastDeletedUser = ref(null)
const userStore = useUserStore()

const showToast = (message, type = 'success', showUndo = false) => {
  toast.value = { show: true, message, type, showUndo }
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
const handleUserDeleted = (user) => {
  lastDeletedUser.value = user
  showToast('Usuario eliminado', 'success', true)
}

const handleUndo = () => {
  if (lastDeletedUser.value) {
    // Insert the deleted user back to the store
    userStore.users.push(lastDeletedUser.value)
    toast.value.show = false
    lastDeletedUser.value = null
    showToast('Eliminación deshecha', 'success', false)
  }
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
