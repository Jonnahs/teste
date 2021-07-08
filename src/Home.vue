<template>
  <button type="button" @click="logout" style="margin-bottom: 10px;">
    Deslogar <i class="fas fa-sign-out-alt"></i>
  </button>
  
  <form @submit.prevent="update">
    <fieldset>
      <label>Email:</label>
      <input type="text" :value="email" readonly />
    </fieldset>
    
    <fieldset>
      <label>Nome:</label>
      <input v-model="name" type="text" />
    </fieldset>
    
    <fieldset>
      <label>Telefone:</label>
      <input v-model="phone" type="text" />
    </fieldset>

    <fieldset>
      <label>Senha:</label>
      <input :value="password" type="text" />
    </fieldset>
    
    <button class="btn_save">
      {{ loading ? 'Carregando...' : 'Salvar' }}
    </button>
    
    <p v-if="success">
      Dados atualizados!
    </p>
  </form>
</template>

<script>
import * as api from './api.js';
import { store } from './store.js';

export default {
  data: () => ({
    name: '',
    phone: '',
    password: '',
    success: false,
    loading: false,
    error: undefined
  }),
  computed: {
    email() {
      return store.user.email;
    },
    password() {
      return btoa(store.user.password);
    },
  },
  methods: {
    async update() {
      this.loading = true;
      this.success = false;
   
      const data = { name: this.name, phone: this.phone }
      
      try {
        await api.update(data, store.token);
        this.success = true;
     
        store.user = {
          ...store.user,
          ...data
        }
      } catch (e) {
        this.error = e.message;
      }
      
      this.loading = false;
    },
    async logout() {
      await api.logout();
      store.user = undefined;
      store.token = undefined;
      // this.$emits('logout')
    }
  }
}
</script>