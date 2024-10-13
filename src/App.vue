<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <!-- <strong>Current route path:</strong> {{ $route.fullPath }} -->
  <div v-if="!$isLogged.value">
    <button
      @click="goToLoginView"
      style="height: 60px; width: 120px; color: brown"
    >
      Login
    </button>
    <button
      @click="goToRegisterView"
      style="height: 60px; width: 120px; color: brown"
    >
      Register
    </button>
  </div>

  <div v-if="$isAdmin.value">
    <button
      @click="goToAdminView"
      style="height: 60px; width: 120px; color: brown"
    >
      Admin
    </button>
    <button
      @click="gotToCreateHotelView"
      style="height: 60px; width: 120px; color: brown"
    >
      Hotel
    </button>
  </div>

  <div v-if="$isLogged.value">
    <button
      @click="goToUserView"
      style="height: 60px; width: 120px; color: brown"
    >
      User
    </button>
    <button @click="logout" style="height: 60px; width: 120px; color: brown">
      Logout
    </button>
  </div>

  <router-view></router-view>
</template>

<script>
import axios from "axios";
import { isAdmin } from "./utils/authMethods";
export default {
  name: "App",
  mounted() {
    if (sessionStorage.getItem("token") != null) {
      this.$isLogged.value = true;
      this.$isAdmin.value = isAdmin();
    }
  },
  methods: {
    goToLoginView() {
      this.$router.push("/login");
      // this.$router.back();
      this.$router.forward();
    },
    goToRegisterView() {
      this.$router.push("/register");
      this.$router.forward();
    },
    goToUserView() {
      this.$router.push("/user");
      this.$router.forward();
    },
    goToAdminView() {
      this.$router.push("/admin");
      this.$router.forward();
    },
    gotToCreateHotelView() {
      this.$router.push("/hotel/create");
      this.$router.forward();
    },
    async logout() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        sessionStorage.removeItem("token");
        this.data = response.data;
        window.alert("U were logout out!");
        this.$router.push("/");
        this.$isLogged.value = false;
        this.$isAdmin.value = false;
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
