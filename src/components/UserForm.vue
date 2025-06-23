<script setup>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '../store/user';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: '',
      username: '',
      email: '',
      phone: '',
    }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['saved', 'cancel']);

const form = ref({ ...props.user });

const rules = computed(() => ({
  name: { required },
  username: { required },
  email: { required, email },
  phone: { required },
}));

const v$ = useVuelidate(rules, form);

watch(() => props.user, (newUser) => {
  form.value = { ...newUser };
});

const userStore = useUserStore();

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  if (props.isEdit) {
    userStore.updateUser(form.value);
  } else {
    userStore.createUser(form.value);
  }
  
  emit('saved');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-backdrop z-50">
    <div class="bg-card p-6 rounded-lg w-full max-w-md mx-4 sm:mx-0 modal-content shadow-lg">
      <h2 class="text-xl mb-4 text-card">
        {{ isEdit ? 'Editar' : 'Crear' }} Usuario
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-card mb-1">Nombre</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="w-full border p-2 rounded bg-card text-card border-app focus:ring-2 focus:ring-emerald-500"
            :class="{ 'border-red-500': v$.name.$error }"
          />
          <p v-if="v$.name.$error" class="text-red-500 text-sm mt-1">Nombre es obligatorio</p>
        </div>

        <div>
          <label class="block text-card mb-1">Username</label>
          <input 
            v-model="form.username" 
            type="text" 
            class="w-full border p-2 rounded bg-card text-card border-app focus:ring-2 focus:ring-emerald-500"
            :class="{ 'border-red-500': v$.username.$error }"
          />
          <p v-if="v$.username.$error" class="text-red-500 text-sm mt-1">Username es obligatorio</p>
        </div>

        <div>
          <label class="block text-card mb-1">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            class="w-full border p-2 rounded bg-card text-card border-app focus:ring-2 focus:ring-emerald-500"
            :class="{ 'border-red-500': v$.email.$error }"
          />
          <p v-if="v$.email.$error" class="text-red-500 text-sm mt-1">Email válido es obligatorio</p>
        </div>

        <div>
          <label class="block text-card mb-1">Teléfono</label>
          <input 
            v-model="form.phone" 
            type="text" 
            class="w-full border p-2 rounded bg-card text-card border-app focus:ring-2 focus:ring-emerald-500"
            :class="{ 'border-red-500': v$.phone.$error }"
          />
          <p v-if="v$.phone.$error" class="text-red-500 text-sm mt-1">Teléfono es obligatorio</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto"
          >
            {{ isEdit ? 'Actualizar' : 'Crear' }}
          </button>
          <button 
            type="button" 
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto" 
            @click="$emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
