<template>
  <div class="d-flex justify-content-center ">
    <form class="form" @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="number" class="form-control w-100" id="floatingNumber" placeholder="Number" required
            v-model="form.number" />
          <label class="ps-4" for="floatingNumber">Number</label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="number" class="form-control w-100" id="floatingNumberOfBeds" placeholder="Number of beds"
            v-model="form.numberOfBeds" required min="1" max="3" />
          <label class="ps-4" for="floatingNumberOfBeds">Number of beds</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <select class="form-control w-100"  v-model="form.status" id="status" name="status" required>
            <option disabled value="">Status</option>
            <option value="OK" selected>OK</option>
            <option value="TEMPORARILY_UNAVAILABLE">TEMPORARILY_UNAVAILABLE</option>
          </select>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="text" class="form-control w-100" id="floatingNumber" placeholder="Number" required v-model="form.description"/>
          <label class="ps-4" for="floatingDescription"> Description</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input type="number" step="0.01" class="form-control w-100" id="floatingWeekPrice" placeholder="Number" required v-model="form.weekPrice" min="0.01"/>
          <label class="ps-4" for="floatingWeekPrice"> Week Price </label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="number" step="0.01" class="form-control w-100" id="floatingWeekendPrice" placeholder="Number" required v-model="form.weekendPrice" min="0.01"/>
          <label class="ps-4" for="floatingWeekendPrice"> Weekend Price </label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <select class="form-control w-100" v-model="selectedCity" @change="fetchHotels" required>
            <option disabled value="">Choose City</option>
            <option v-for="(option, index) in cities" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <select class="form-control w-100" v-model="form.hotel" id="hotel" name="hotel" required>
            <option disabled value="">Choose Hotel</option>
            <option v-for="(option, index) in hotels" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Create room</button>
    </form>
  </div>

</template>

<script>
import api from "../utils/axiosInterceptor";
import { fetchCities } from '../utils/fetchHotelsMethods'

export default {
  name: "RegisterView",
  data() {
    return {
      selectedCity: "",
      cities: [],
      hotels: [],
      form: {
        number: "",
        numberOfBeds: "",
        status: "",
        weekPrice: "",
        weekendPrice: "",
        description: "",
        hotel: ""
      },
    };
  },
  async created() {
    try {
      this.cities = await fetchCities();
    } catch (error) {
      console.error("There was an error with fetch list of cities! Error: ", error);
      throw error;
    }

  },
  methods: {
    async submitForm() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.post(
          `/room/create`,
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
        window.alert(error);
      }
    },
    async fetchHotels() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get(
          `/hotel/all/${this.selectedCity}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.hotels = response.data.message;
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
  },
};
</script>

<style></style>