<template>
  <h1>Strona rejestracji do aplikacji</h1>
  <h2>Stwórz konto</h2>
  <form @submit.prevent="submitForm">
    <label for="emaile">Email</label>
    <input type="text" v-model="form.email" id="email" name="email" required />
    <label for="password">Password</label>
    <input
      type="password"
      v-model="form.password"
      id="password"
      name="password"
      required
    />
    <label for="emaile">Name</label>
    <input
      type="text"
      v-model="form.firstName"
      id="firstName"
      name="firstName"
      required
    />
    <label for="emaile">Last Name</label>
    <input
      type="text"
      v-model="form.lastName"
      id="lastName"
      name="lastName"
      required
    />
    <button type="submit">Zarejestruj się</button>
  </form>
  <router-link to="/">Home</router-link>
</template>

<script>
import api from "../utils/axiosInterceptor";

export default {
  name: "RegisterView",
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
    };
  },

  methods: {
    async submitForm() {
      try {
        const response = await api.post(
          "/user/register",
          this.form
        );
        if (response.status === 201) {
          window.alert("Registered with success!");
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