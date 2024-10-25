<template>
  <h2>Search Free Rooms</h2>
  <form @submit.prevent="submitForm">
    <select v-model="form.city" @change="fetchHotels" required>
      <option disabled value="">Choose City</option>
      <option v-for="(option, index) in cities" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
    <label>Start Date</label>
    <input
      type="date"
      v-model="form.startDate"
      id="startDate"
      name="startDate"
      required
    />
    <label>End Date</label>
    <input
      type="date"
      v-model="form.endDate"
      id="endDate"
      name="endDate"
      required
    />
    <button type="submit">Search</button>
  </form>
  <div v-if="!isLoading" calss="hotels">
    <div v-for="(hotel, index) in hotels" :key="index" :value="hotel">
      <h2>Hotel name : {{ hotel.name }}</h2>
      <h2>Number of stars : {{ hotel.numberOfStars }}</h2>
      <h2>Contact : {{ hotel.contact }}</h2>
      <div class="rooms">
        <div
          v-for="(room, roomIndex) in hotel.rooms"
          :key="roomIndex"
          :value="room"
        >
          <h3>Room number: {{ room.number }}</h3>
          <h3>Number of Beds: {{ room.numberOfBeds }}</h3>
          <h3>Week price : {{ room.weekPrice }}</h3>
          <h3>Weekend price : {{ room.weekendPrice }}</h3>
          <button
            @click="goToReservationView(hotel, room)"
            style="height: 60px; width: 120px; color: brown"
          >
            Create reservation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fetchCities } from "../utils/fetchHotelsMethods";

export default {
  name: "SearchFreeRoomsView",
  data() {
    return {
      cities: [],
      hotels: [],
      isLoading: true,
      form: {
        city: "",
        startDate: "",
        endDate: "",
      },
    };
  },
  async mounted() {
    try {
      this.cities = await fetchCities();
    } catch (error) {
      console.error(
        "There was an error with fetch list of cities! Error: ",
        error
      );
      throw error;
    }
  },
  methods: {
    goToReservationView(hotel, room) {
      localStorage.setItem("hotel", JSON.stringify(hotel));
      localStorage.setItem("room", JSON.stringify(room));
      localStorage.setItem("form", JSON.stringify(this.form));
      this.$router.push({ name: "Reservation" });
      this.$router.forward();
    },
    async submitForm() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8081/hotel/free/${this.form.city}/${this.form.startDate}/${this.form.endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.hotels = response.data.message;
        this.isLoading = false;

        if (response.status === 201) {
          window.alert("Registered with success!");
          this.$router.push("/");
        }
      } catch (error) {
        window.alert(error.response.data);
      }
    },
  },
};
</script>

<style>
</style>