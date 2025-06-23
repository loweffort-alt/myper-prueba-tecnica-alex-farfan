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
  <section class="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Gestión de Usuarios</h1>
      <button 
        @click="openCreateForm"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
      >
        Nuevo Usuario
      </button>
    </div>

    <div v-if="userStore.loading" class="text-center py-8">
      <div class="text-lg text-gray-700 dark:text-gray-300">Cargando usuarios...</div>
    </div>

    <div v-else-if="userStore.error" class="text-red-600 text-center py-8">
      {{ userStore.error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">
              Nombre
            </th>
            <th class="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">
              Username
            </th>
            <th class="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">
              Email
            </th>
            <th class="border border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">
              Teléfono
            </th>
            <th class="border border-gray-300 dark:border-gray-600 p-3 text-center text-gray-900 dark:text-white">
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
            <td class="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-white">
              {{ user.name }}
            </td>
            <td class="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-white">
              {{ user.username }}
            </td>
            <td class="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-white">
              {{ user.email }}
            </td>
            <td class="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-white">
              {{ user.phone }}
            </td>
            <td class="border border-gray-300 dark:border-gray-600 p-3 text-center">
              <div class="flex gap-2 justify-center">
                <button 
                  @click="openEditForm(user)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Editar
                </button>
                <button 
                  @click="deleteUser(user)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
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
