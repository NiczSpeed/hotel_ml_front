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
import api from "../utils/axiosInterceptor";
import { isAdmin } from '../utils/authMethods'

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
        const response = await api.post(
          "/user/login",
          this.form
        );
        if (response.status === 200) {
          const token = response.data.message;
          console.log(response.data.message);
          sessionStorage.setItem("token", token);

          this.$isAdmin.value = isAdmin();
          this.$isLogged.value = true;
          this.$router.push("/");
        }
      } catch (error) {
        window.alert(error);
      }
    },
  },
};
</script>

<style>
</style>