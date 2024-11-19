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
    <div v-if="userDataIsShowed && !isLoading" class="userDetails">
      <h2>Name: {{ userData.firstName }}</h2>
      <h2>Lastname: {{ userData.lastName }}</h2>
      <h2>Email: {{ userData.email }}</h2>
      <h2>Date of account creation: {{ userData.creationDate }}</h2>
    </div>
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
    <div v-if="reservationDataIsShowed && !isLoading" class="reservations">
      <div
        v-for="(reservation, index) in userReservationData"
        :key="index"
        :value="reservation"
      >
        <h2>Reservation number: {{ index + 1 }}</h2>
        <h3>Hotel city: {{ reservation.hotelCity }}</h3>
        <h3>Hotel name: {{ reservation.hotelName }}</h3>
        <h3>Room number: {{ reservation.roomNumber }}</h3>
        <h3>Start date: {{ reservation.startDate }}</h3>
        <h3>End date: {{ reservation.endDate }}</h3>
        <h3>Price: {{ reservation.amountPayable }}</h3>
        <button
          @click="deleteReservation(reservation.uuid)"
          id="hide"
          style="height: 60px; width: 120px; color: brown"
        >
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../utils/axiosInterceptor";

export default {
  name: "UserView",
  data() {
    return {
      isLoading: true,
      reservationDataIsShowed: false,
      userDataIsShowed: false,
      data: null,
      userData: [],
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
        const response = await api.get("/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.data = response.data.message;
      } catch (error) {
        window.alert(error);
      }
    },
    async getMyDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/user/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userData = response.data.message;
        this.userDataIsShowed = true;
        this.isLoading = false;
      } catch (error) {
        window.alert(error);
      }
    },
    async getAllReservations() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/reservation/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("headerek w ciele: " + response.config.headers);
        this.userReservationData = response.data.message;
        this.reservationDataIsShowed = true;
        this.isLoading = false;
      } catch (error) {
        window.alert(error);
      }
    },
    async deleteReservation(uuid) {
      try {
        const confirmed = window.confirm(
          "Are you sure u want to delete this reservation?"
        );
        if (confirmed) {
          const token = sessionStorage.getItem("token");
          const response = await api.delete(
            `/reservation/delete/${uuid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            window.alert(response.data.message);
            this.hideReservationInfo();
          }
        } else {
          alert("Deletion cancelled!");
        }
      } catch (error) {
        window.alert(error);
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