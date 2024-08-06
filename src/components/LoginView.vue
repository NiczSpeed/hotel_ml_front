<template>
  <h1>Strona logowania do aplikacji</h1>
  <h2>Zaloguj się</h2>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="form.email" id="email" name="email" required />
    <label for="password">Password</label>
    <input
      type="password"
      v-model="form.password"
      id="password"
      name="password"
      required
    />
    <button type="submit">Zaloguj się</button>
  </form>
  <router-link to="/">Home</router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:8081/user/login",
          this.form
        );
        if (response.status === 201) {
          const token = response.data.message
          sessionStorage.setItem('token', token)
          this.$isLogged = true;
          this.$router.push('/')

          // window.alert(response.data.message);
          
        }
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
  },
};
</script>

<style>
</style>