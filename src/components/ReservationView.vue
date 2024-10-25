<template>
  <h1>Your reservation data</h1>
  <h2>Hotel City: {{ this.form.hotelCity }}</h2>
  <h2>Hotel Name: {{ this.form.hotelName }}</h2>
  <h2>Start Date: {{ this.form.startDate }}</h2>
  <h2>End Date: {{ this.form.endDate }}</h2>
  <h2>----------------------</h2>
  <h2>Room Number: {{ this.form.roomNumber }}</h2>
  <button
    @click="confirmReservation()"
    style="height: 60px; width: 120px; color: brown"
  >
    Confirm Reservation
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationView",
  data() {
    return {
      form: {
        hotelCity: "",
        hotelName: "",
        roomNumber: "",
        startDate: "",
        endDate: "",
      },
    };
  },
  async created() {
    const hotelData = localStorage.getItem("hotel");
    const roomData = localStorage.getItem("room");
    const formData = localStorage.getItem("form");
    this.form.roomNumber = roomData ? JSON.parse(roomData).number : null;
    this.form.hotelName = hotelData ? JSON.parse(hotelData).name : null;
    this.form.hotelCity = formData ? JSON.parse(formData).city : null;
    this.form.startDate = formData ? JSON.parse(formData).startDate : null;
    this.form.endDate = formData ? JSON.parse(formData).endDate : null;
    localStorage.clear;
  },
  methods: {
    async confirmReservation() {
      try {
        console.log(this.form);
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8081/reservation/create",
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