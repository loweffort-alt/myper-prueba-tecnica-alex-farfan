import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch users';
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },

    createUser(user) {
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      const newUser = { ...user, id: newId };
      this.users.push(newUser);
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },

    deleteUser(userId) {
      this.users = this.users.filter(user => user.id !== userId);
    },
  },
})
