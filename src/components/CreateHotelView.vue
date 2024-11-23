<template>
  <div class="d-flex justify-content-center ">
    <form class="form" @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingEmail" placeholder="Name" required
            v-model="form.name" />
          <label class="ps-4" for="floatingEmail">name</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingEmail" placeholder="Name" required v-model="form.address"/>
          <label class="ps-4" for="floatingEmail">address</label>
        </div>
      </div>
      <label>city</label>
      <input type="text" v-model="form.city" id="city" name="city" required />
      <label> State </label>
      <input type="text" v-model="form.state" id="state" name="state" required />
      <label> number of Stars </label>
      <input type="number" v-model="form.numberOfStars" id="numberOfStars" name="numberOfStars" required min="1"
        max="5" />
      <label> contact number </label>
      <input type="tel" v-model="form.contact" id="contact" name="contact" placeholder="123456789" pattern="[0-9]{9}"
        required />
      <button type="submit">Create New Hotel</button>
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

<style></style>