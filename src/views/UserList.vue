<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import UserForm from '../components/UserForm.vue';

const userStore = useUserStore();
const showForm = ref(false);
const selectedUser = ref(null);
const isEdit = ref(false);

onMounted(() => {
  userStore.fetchUsers();
});

const openCreateForm = () => {
  selectedUser.value = { name: '', username: '', email: '', phone: '' };
  isEdit.value = false;
  showForm.value = true;
};

const openEditForm = (user) => {
  selectedUser.value = { ...user };
  isEdit.value = true;
  showForm.value = true;
};

const handleSaved = () => {
  showForm.value = false;
  selectedUser.value = null;
};

const handleCancel = () => {
  showForm.value = false;
  selectedUser.value = null;
};

const deleteUser = (user) => {
  if (confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
    userStore.deleteUser(user.id);
  }
};
</script>

<template>
  <section class="p-4 sm:p-6 min-h-screen bg-app text-app">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold text-navbar">Gestión de Usuarios</h1>
      <button 
        @click="openCreateForm"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto"
      >
        Nuevo Usuario
      </button>
    </div>

    <div v-if="userStore.loading" class="text-center py-8">
      <div class="text-lg text-app">Cargando usuarios...</div>
    </div>

    <div v-else-if="userStore.error" class="text-red-600 text-center py-8">
      {{ userStore.error }}
    </div>

    <div v-else class="overflow-x-auto rounded-lg shadow-sm">
      <table class="w-full min-w-[600px] border-collapse border-app bg-card text-sm sm:text-base">
        <thead class="bg-card">
          <tr>
            <th class="border-app p-3 text-left text-card whitespace-nowrap">
              Nombre
            </th>
            <th class="border-app p-3 text-left text-card whitespace-nowrap">
              Username
            </th>
            <th class="border-app p-3 text-left text-card whitespace-nowrap">
              Email
            </th>
            <th class="border-app p-3 text-left text-card whitespace-nowrap">
              Teléfono
            </th>
            <th class="border-app p-3 text-center text-card whitespace-nowrap">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="user in userStore.users" 
            :key="user.id" 
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td class="border-app p-3 text-card">
              {{ user.name }}
            </td>
            <td class="border-app p-3 text-card">
              {{ user.username }}
            </td>
            <td class="border-app p-3 text-card">
              {{ user.email }}
            </td>
            <td class="border-app p-3 text-card">
              {{ user.phone }}
            </td>
            <td class="border-app p-3 text-center">
              <div class="flex flex-col sm:flex-row gap-2 justify-center">
                <button 
                  @click="openEditForm(user)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors w-full sm:w-auto"
                >
                  Editar
                </button>
                <button 
                  @click="deleteUser(user)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors w-full sm:w-auto"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UserForm 
      v-if="showForm"
      :user="selectedUser"
      :is-edit="isEdit"
      @saved="handleSaved"
      @cancel="handleCancel"
    />
  </section>
</template>
