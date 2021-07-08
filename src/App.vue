<template>
  <form v-if="!isLoggedIn" @submit.prevent="login">
    <fieldset>
      <label>Email:</label>
      <input v-model="email" type="email" required />
    </fieldset>
    
    <fieldset>
      <label>Senha:</label>
      <input v-model="password" type="password" required />
    </fieldset>
    
    <button class="btn">
      {{ loading ? 'Carregando...' : 'Logar' }}
    </button>
    
    <p v-if="error">
       ERROR: {{ error }}
    </p>
  </form>
  
  <div v-else>
    <Home />
  </div>
</template>

<script>
import * as api from './api.js';
import Home from './Home.vue';
import { store } from './store.js';
import './css/stylesheet.css';
 
export default {
  components: {
    Home
  },
  data: () => ({
    email: '',
    password: '',
    error: undefined,
    loading: false
  }),
  computed: {
    isLoggedIn() {
      return store.user !== undefined;
    }
  },
  methods: {
    async login () {
      this.loading = true;
      
      const credentials = { email: this.email, password: this.password };
      
      try {
        const token = await api.login(credentials);
        store.token = token;
      	store.user = { email: this.email }
      } catch (e) {
        this.error = e.message;
      }
      
      this.loading = false;
    }
  }
}
</script>

<style scoped>

label,
input {
    width: 50px;
    margin: 3px 0;
}

input {
    width: 200px;
}
</style>