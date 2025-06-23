<template>
  <div class="min-h-screen transition-colors duration-300">
    <div class="min-h-screen bg-app transition-colors duration-300">
      <!-- Navigation Header -->
      <nav class="bg-navbar shadow-lg border-b border-app transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
          <div class="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 py-2 sm:py-0 gap-2 sm:gap-0">
            <!-- Logo/Title - Responsive -->
            <div class="flex-shrink-0 mb-2 sm:mb-0">
              <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-navbar transition-colors duration-300">
                <span class="hidden sm:inline">CRUD de Usuarios</span>
                <span class="sm:hidden">CRUD Users</span>
              </h1>
            </div>
            
            <!-- Navigation Links - Hidden on mobile, can be expanded later -->
            <div class="hidden md:flex items-center space-x-8">
              <router-link 
                to="/" 
                class="relative text-navbar hover:text-emerald-600 font-medium transition-colors duration-300 group"
              >
                <span>Usuarios</span>
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
              </router-link>
            </div>
            
            <!-- Right section with theme toggle and author -->
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Theme Toggle Button -->
              <button
                @click="toggleTheme"
                class="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
              >
                <!-- Sun Icon (Light Mode) -->
                <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                </svg>
                <!-- Moon Icon (Dark Mode) -->
                <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
              <!-- Author info - Responsive -->
              <div class="text-right">
                <p class="text-xs sm:text-sm text-navbar transition-colors duration-300">
                  <span class="hidden sm:inline">Developed by</span>
                </p>
                <p class="text-sm sm:text-base font-medium text-navbar transition-colors duration-300">
                  <span class="hidden sm:inline">Alex Farfán</span>
                  <span class="sm:hidden">AF</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- Main Content -->
      <main class="transition-colors duration-300 px-2 sm:px-4 lg:px-8 w-full max-w-7xl mx-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

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
