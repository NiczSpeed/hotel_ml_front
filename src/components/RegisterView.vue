<template>
  <!-- <form @submit.prevent="submitForm">
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
  </form> -->

  <div class="d-flex justify-content-center ">
    <form class="form" @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input v-model="form.email" type="email" class="form-control w-100" id="floatingEmail"
            placeholder="Email address" required>
          <label class="ps-4" for="floatingEmail">Email address</label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input v-model="form.password" type="password" class="form-control w-100" id="floatingPassword"
            placeholder="Password" required>
          <label class="ps-4" for="floatingPassword">Password</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="form.name" type="text" class="form-control w-100" id="floatingName" placeholder="Name" required>
        <label class="ps-3" for="floatingEmail">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="form.lastName" type="text" class="form-control w-100" id="floatingLastName"
          placeholder="Last name" required>
        <label class="ps-3" for="floatingLastName">Last name</label>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Submit</button>
    </form>
  </div>

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

<style></style>