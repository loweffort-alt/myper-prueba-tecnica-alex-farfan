<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '../store/user';
import UserForm from '../components/UserForm.vue';

const props = defineProps({
  openEditForm: Function,
  showUserForm: Boolean,
  selectedUser: Object,
  isEdit: Boolean
});
const emit = defineEmits(['open-edit-form', 'close-user-form', 'user-saved', 'user-deleted']);

const userStore = useUserStore();
const showForm = ref(false);
const selectedUserLocal = ref(null);
const isEditLocal = ref(false);

onMounted(() => {
  userStore.fetchUsers();
});

watch(() => props.showUserForm, (val) => {
  showForm.value = val;
  if (val) {
    selectedUserLocal.value = props.selectedUser;
    isEditLocal.value = props.isEdit;
  }
});

const handleEdit = (user) => {
  props.openEditForm(user);
};
const handleSaved = (action) => {
  emit('user-saved', action);
};
const handleCancel = () => {
  emit('close-user-form');
};
const deleteUser = (user) => {
  userStore.deleteUser(user.id);
  emit('user-deleted');
};
</script>

<template>
  <section class="p-4 sm:p-8 min-h-screen bg-app text-app flex flex-col items-center">
    <div class="w-full max-w-5xl">
      <div v-if="userStore.loading" class="text-center py-12">
        <div class="text-lg text-app font-medium">Cargando usuarios...</div>
      </div>
      <div v-else-if="userStore.error" class="text-red-600 text-center py-12 font-semibold">
        {{ userStore.error }}
      </div>
      <div v-else class="overflow-x-auto rounded-2xl shadow-lg bg-card border border-app">
        <table class="w-full min-w-[600px] border-collapse text-sm sm:text-base">
          <thead>
            <tr>
              <th class="border-app p-4 text-left text-card font-bold uppercase tracking-wider bg-app">Nombre</th>
              <th class="border-app p-4 text-left text-card font-bold uppercase tracking-wider bg-app">Username</th>
              <th class="border-app p-4 text-left text-card font-bold uppercase tracking-wider bg-app">Email</th>
              <th class="border-app p-4 text-left text-card font-bold uppercase tracking-wider bg-app">Teléfono</th>
              <th class="border-app p-4 text-center text-card font-bold uppercase tracking-wider bg-app">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="user in userStore.users" 
              :key="user.id" 
              class="transition-colors row-hover"
            >
              <td class="border-app p-4 text-card align-middle">{{ user.name }}</td>
              <td class="border-app p-4 text-card align-middle">{{ user.username }}</td>
              <td class="border-app p-4 text-card align-middle">{{ user.email }}</td>
              <td class="border-app p-4 text-card align-middle">{{ user.phone }}</td>
              <td class="border-app p-4 text-center align-middle">
                <div class="flex flex-col sm:flex-row gap-2 justify-center">
                  <button 
                    @click="handleEdit(user)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow transition-colors w-full sm:w-auto"
                  >
                    Editar
                  </button>
                  <button 
                    @click="deleteUser(user)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow transition-colors w-full sm:w-auto"
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
        :user="selectedUserLocal"
        :is-edit="isEditLocal"
        @saved="handleSaved"
        @cancel="handleCancel"
      />
    </div>
  </section>
</template>
