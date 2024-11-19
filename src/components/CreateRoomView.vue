<template>
  <h2>Create Room</h2>
  <form @submit.prevent="submitForm">
    <label>number</label>
    <input
      type="number"
      v-model="form.number"
      id="number"
      name="number"
      required
    />
    <label>number of beds</label>
    <input
      type="number"
      v-model="form.numberOfBeds"
      id="numberOfBeds"
      name="numberOfBeds"
      required
      min="1"
      max="3"
    />
    <label> status </label>
    <select v-model="form.status" id="status" name="status" required>
      <option value="OK" selected>OK</option>
      <option value="TEMPORARILY_UNAVAILABLE">TEMPORARILY_UNAVAILABLE</option>
    </select>
    <label> Week Price </label>
    <input
      type="number"
      step="0.01"
      v-model="form.weekPrice"
      id="weekPrice"
      name="weekPrice"
      required
    />
    <label> Weekend Price </label>
    <input
      type="number"
      step="0.01"
      v-model="form.weekendPrice"
      id="weekendPrice"
      name="weekendPrice"
      required
    />
    <label> Description</label>
    <input
      type="text"
      v-model="form.description"
      id="description"
      name="description"
      required
    />
    <select v-model="selectedCity" @change="fetchHotels" required>
      <option disabled value="">Choose City</option>
      <option v-for="(option, index) in cities" :key="index" :value="option">
        {{ option }}
      </option>
    </select>

    <label>Choose hotel</label>
    <select v-model="form.hotel" id="hotel" name="hotel" required>
      <option disabled value="">Choose Hotel</option>
       <option v-for="(option, index) in hotels" :key="index" :value="option">
        {{ option }}
      </option>
    </select>

    <button type="submit">Create New Hotel</button>
  </form>
  <router-link to="/">Home</router-link>
</template>

<script>
import api from "../utils/axiosInterceptor";
import {fetchCities} from '../utils/fetchHotelsMethods'

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
        status:"",
        weekPrice: "",
        weekendPrice: "",
        description: "",
        hotel: ""
      },
    };
  },
  async created() {
    try{
      this.cities = await fetchCities();
    }catch (error){
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
        window.alert(error.response.data.message);
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

<style>
</style>