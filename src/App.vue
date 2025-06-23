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
              <button
                @click="toggleTheme"
                class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
              >
                <!-- Sun Icon (Light Mode) -->
                <svg v-if="isDark" fill="currentColor" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M24.90625,3.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM10.65625,9.84375c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.20703,-0.22266 -0.50781,-0.33594 -0.8125,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0zM39.03125,9.84375c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.3125,-0.29687 0.40234,-0.76172 0.21875,-1.15234c-0.1875,-0.39453 -0.60156,-0.62109 -1.03125,-0.56641zM25,15c-5.51562,0 -10,4.48438 -10,10c0,5.51563 4.48438,10 10,10c5.51563,0 10,-4.48437 10,-10c0,-5.51562 -4.48437,-10 -10,-10zM4.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM38.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM15,33.875c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.29688,-0.28516 0.38672,-0.72656 0.22656,-1.10547c-0.15625,-0.37891 -0.53516,-0.62109 -0.94531,-0.61328c-0.03125,0 -0.0625,0 -0.09375,0zM34.6875,33.875c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.1875,-0.19922 -0.44531,-0.30859 -0.71875,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.90625,37.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z"></path></g></g>
                </svg>
                <!-- Moon Icon (Dark Mode) -->
<svg v-else width="25" height="25" fill="white" viewBox="0 0 24 24" >
<path d="M19.32 13.38a6.986 6.986 0 0 1-9.01-6.68c0-.69.1-1.37.3-2.02a1.002 1.002 0 0 0-1.25-1.25 8.92 8.92 0 0 0-6.37 8.59c0 4.95 4.03 8.98 8.98 8.98 3.98 0 7.44-2.56 8.59-6.37.11-.35.01-.74-.25-1s-.64-.36-1-.25Z"></path>
</svg>
              </button>
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
        <div v-if="toast.show" class="toast toast-success fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          {{ toast.message }}
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserList from './views/UserList.vue'
import UserForm from './components/UserForm.vue'

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
