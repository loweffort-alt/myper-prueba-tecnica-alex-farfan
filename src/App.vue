<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-6">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-600 dark:text-green-400">
          CRUD de Usuarios - Prueba Técnica
        </h1>
        
        <div class="flex gap-8">
          <router-link 
            to="/" 
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Usuarios
          </router-link>
        </div>
        
        <h2 class="text-lg text-gray-700 dark:text-gray-300">
          Developed by Alex Farfan Navarro
        </h2>
      </div>
    </nav>
    
    <main class="bg-white dark:bg-gray-900 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Estilos específicos para la navegación */
nav {
  backdrop-filter: blur(10px);
}

/* Hover effects para los links */
router-link {
  position: relative;
  text-decoration: none;
}

router-link:hover {
  text-decoration: none;
}

router-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

router-link:hover::after {
  width: 100%;
}
</style>
