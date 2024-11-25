<template>
  <div class="body d-flex justify-content-center align-items-center vh-100 vw-100">
    <div class="main-box d-flex flex-column shadow h-75 w-50">
      <div class="headers flex-grow-2 d-flex align-items-center justify-content-center">
        <header v-if="$isAdmin.value" class="admin-header py-3">
          <ul class="nav nav-pills d-flex align-items-center justify-content-center">
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); goBackToHome()" aria-current="page">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); goToAdminView()">Admin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); goToUserView()">User</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); gotToCreateHotelView()">Hotel</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); gotToCreateRoomView()">Room</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Logout</a>
            </li>
          </ul>
        </header>
        <header v-if="$isLogged.value && !$isAdmin.value" class="user-header d-flex justify-content-center align-items-center py-3 w-75">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); goBackToHome()" aria-current="page">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setActiveNav($event); goToUserView()">User</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Logout</a>
            </li>
          </ul>
        </header>
      </div>
      <div class="container flex-grow-5">
        <h1 class="main-text text-center">Hotel ML</h1>
        <p v-if="!$isLogged.value" class="welcome-text text-center">Welcome in our application</p>
        <div v-if="!$isLogged.value" class=" buttons d-flex gap-3 justify-content-center align-items-center">
          <button type="button" @click="goToLoginView" class="login-button btn btn-secondary col-2">Sing In</button>
          <button type="button" @click="goToRegisterView" class="register-button btn btn-secondary col-2">Sign
            Up</button>
        </div>
      </div>
      <router-view class="routerView"></router-view>
    </div>
  </div>

</template>

<script>
import api from "./utils/axiosInterceptor";

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
    goBackToHome() {
      this.$router.push("/");
      this.$router.forward();
    },
    goToLoginView() {
      this.$router.push("/login");
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
    gotToCreateRoomView() {
      this.$router.push("/room/create");
      this.$router.forward();
    },
    goToSearchFreeRoomsView() {
      this.$router.push("/hotel/free");
      this.$router.forward();
    },
    setActiveNav(event) {
      const element = event.target;
      document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active') });
      element.classList.add('active');
    },
    async logout() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/user/logout", {
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
.body {
  background: linear-gradient(60deg, #232526, #414345);
}

.main-text {
  color: #232526;
  margin-top: 3%;
  font-size: 8rem;
  font-family: 'Roboto';
  font-style: italic;
  font-weight: bold;
  text-shadow: 1px 1.5px 2px rgba(0, 0, 0, 0.3);
}

.welcome-text {
  color: #232526;
  font-size: 4rem;
  font-family: 'Roboto';
  font-weight: bold;
  font-style: italic;
}

.main-box {
  background-color: #339751;
  border-radius: 60px;

}

.buttons {
  margin-top: 5%;
  margin-bottom: 2rem;
}



.admin-header {
  border-bottom: 1px solid #0f0f0f;
  width: 75vh;
  
}

.user-header {
  border-bottom: 1px solid #0f0f0f;
  width: 75vh;
}

.nav-link {
  font-size: 1.5rem;
  color: black;
}

.nav-link.active {
  background-color: #F5F5F5 !important;
  color: black !important;
  border-radius: 5px;
  font-style: italic;
}

.nav-link:hover {
  color: rgb(215, 210, 218);
}

.routerView {
  height: 30%;
}
</style>