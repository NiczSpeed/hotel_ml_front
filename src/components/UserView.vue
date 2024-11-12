<template>
  <h1>Witaj testuje tokeny JWT dla Usera</h1>
  <h1>{{ data }}</h1>
  <div id="userDetails">
    <button
      @click="getMyDetails()"
      style="height: 60px; width: 120px; color: brown"
    >
      Show my data
    </button>
    <button
      @click="hideUserInfo()"
      id="hide"
      style="height: 60px; width: 120px; color: brown"
    >
      Hide data
    </button>
    <p v-if="userDataIsShowed">{{ userData }}</p>
  </div>
  <div id="userReservationData">
    <button
      @click="getAllReservations()"
      style="height: 60px; width: 120px; color: brown"
    >
      My Reservations
    </button>

    <button
      @click="hideReservationInfo()"
      id="hide"
      style="height: 60px; width: 120px; color: brown"
    >
      Hide resevations
    </button>
    <p v-if="reservationDataIsShowed">{{ userReservationData }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserView",
  data() {
    return {
      reservationDataIsShowed: false,
      userDataIsShowed: false,
      data: null,
      userData: null,
      userReservationData: [],
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.data = response.data.message;
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
    async getMyDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/user/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userData = response.data.message;
        this.userDataIsShowed = true;
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
    async getAllReservations() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8081/reservation/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.userReservationData = response.data.message;
        this.reservationDataIsShowed = true;
      } catch (error) {
        window.alert(error.response.data.message);
      }
    },
    hideReservationInfo() {
      this.reservationDataIsShowed = false;
    },
    hideUserInfo() {
      this.userDataIsShowed = false;
    },
  },
};
</script>

<style>
</style>