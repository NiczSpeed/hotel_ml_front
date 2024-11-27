<template>
  <div class="d-flex justify-content-center ">
    <form class="form" @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingEmail" placeholder="Name" required
            v-model="form.name" />
          <label class="ps-4" for="floatingEmail">Name</label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingAddress" placeholder="Name" required
            v-model="form.address" />
          <label class="ps-4" for="floatingAddress">Address</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingCity" placeholder="City" required
            v-model="form.city" />
          <label class="ps-4" for="floatingCity">city</label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingState" placeholder="State" required
            v-model="form.state" />
          <label class="ps-4" for="floatingState">State</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="number" class="form-control w-100" id="floatingState" placeholder="State" required
            v-model="form.numberOfStars" min="1" max="5" />
          <label lass="ps-4" for="floatingNumberOfStars"> Number of stars </label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="tel" class="form-control w-100" id="floatingState" placeholder="123456789" required
            v-model="form.contact" pattern="[0-9]{9}" />
          <label lass="ps-4" for="floatingContact"> Contact number </label>

        </div>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Create Hotel</button>
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
          this.$root.$refs.infoModal.showModal("Success", "Hotel was created successfully.");
          this.$router.push("/");
        }
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error);
      }
    },
  },
};
</script>

<style></style>