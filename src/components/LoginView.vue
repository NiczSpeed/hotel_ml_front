<template>
  <div class="d-flex justify-content-center align-items-center  ">
    <form class="form" @submit.prevent="submitForm">
      <div class="form-floating mb-3">
        <input v-model="form.email" type="email" class="form-control " id="floatingEmail" placeholder="Email address"
          required>
        <label for="floatingEmail">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password"
          required>
        <label for="floatingEmail">Password</label>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Submit</button>
    </form>
  </div>

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
          sessionStorage.setItem("token", token);
          this.$isAdmin.value = isAdmin();
          this.$isLogged.value = true;
          this.$router.push("/");
        }
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error);
      }
    },
  },
};
</script>

<style>
.form {
  width: 34.4%;
}

.form-control {
  background-color: #ececec;
  border-color: #ced4da;
}

.form-control:focus {
  background-color: #f1f1f1;
  border-color: #80bdff;
}
</style>