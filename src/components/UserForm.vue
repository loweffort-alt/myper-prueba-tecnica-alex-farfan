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
    emit('saved', 'edit');
  } else {
    userStore.createUser(form.value);
    emit('saved', 'create');
  }
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
    <div class="bg-modal p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 sm:mx-0 border border-app relative animate-fadeIn z-10">
      <button @click="$emit('cancel')" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl font-bold focus:outline-none">&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-card tracking-wide text-center">{{ isEdit ? 'Editar' : 'Crear' }} Usuario</h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-card mb-2 font-semibold">Nombre</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="w-full border border-app rounded-lg px-4 py-2 bg-transparent text-card focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder-gray-400"
            :class="{ 'border-red-500': v$.name.$error }"
            placeholder="Nombre completo"
          />
          <p v-if="v$.name.$error" class="text-red-500 text-xs mt-1">Nombre es obligatorio</p>
        </div>
        <div>
          <label class="block text-card mb-2 font-semibold">Username</label>
          <input 
            v-model="form.username" 
            type="text" 
            class="w-full border border-app rounded-lg px-4 py-2 bg-transparent text-card focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder-gray-400"
            :class="{ 'border-red-500': v$.username.$error }"
            placeholder="Usuario único"
          />
          <p v-if="v$.username.$error" class="text-red-500 text-xs mt-1">Username es obligatorio</p>
        </div>
        <div>
          <label class="block text-card mb-2 font-semibold">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            class="w-full border border-app rounded-lg px-4 py-2 bg-transparent text-card focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder-gray-400"
            :class="{ 'border-red-500': v$.email.$error }"
            placeholder="correo@ejemplo.com"
          />
          <p v-if="v$.email.$error" class="text-red-500 text-xs mt-1">Email válido es obligatorio</p>
        </div>
        <div>
          <label class="block text-card mb-2 font-semibold">Teléfono</label>
          <input 
            v-model="form.phone" 
            type="text" 
            class="w-full border border-app rounded-lg px-4 py-2 bg-transparent text-card focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder-gray-400"
            :class="{ 'border-red-500': v$.phone.$error }"
            placeholder="Ej: 555-1234"
          />
          <p v-if="v$.phone.$error" class="text-red-500 text-xs mt-1">Teléfono es obligatorio</p>
        </div>
        <div class="flex gap-3 pt-2">
          <button 
            type="submit" 
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {{ isEdit ? 'Actualizar' : 'Crear' }}
          </button>
          <button 
            type="button" 
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow transition-colors focus:outline-none"
            @click="$emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease;
}
</style>
