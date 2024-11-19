<template>
  <h2>Create Hotel</h2>
  <form @submit.prevent="submitForm">
    <label>name</label>
    <input type="text" v-model="form.name" id="name" name="name" required />
    <label>address</label>
    <input
      type="text"
      v-model="form.address"
      id="address"
      name="address"
      required
    />
    <label>city</label>
    <input type="text" v-model="form.city" id="city" name="city" required />
    <label> State </label>
    <input type="text" v-model="form.state" id="state" name="state" required />
    <label> number of Stars </label>
    <input
      type="number"
      v-model="form.numberOfStars"
      id="numberOfStars"
      name="numberOfStars"
      required
      min="1"
      max="5"
    />
    <label> contact number </label>
    <input
      type="tel"
      v-model="form.contact"
      id="contact"
      name="contact"
      placeholder="123456789"
      pattern="[0-9]{9}"
      required
    />
    <button type="submit">Create New Hotel</button>
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
        name: "",
        address: "",
        city: "",
        state: "",
        numberOfStars: "",
        contact: "",
      },
    };
  },

  methods: {
    async submitForm() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.post(
          "/hotel/create",
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.data = response.data;

        if (response.status === 201) {
          window.alert("Registered with success!");
          this.$router.push("/");
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