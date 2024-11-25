<template>
  <div class="user-container d-flex align-items-center justify-content-center w-100 h-100">
    <div class="card w-75 mb-3" v-if="userDataIsShowed && !isLoading">
      <div class="card-body">
        <h5 class="card-title">User details</h5>
        <p class="card-text"><strong>Name: </strong> {{ userData.firstName }}</p>
        <p class="card-text"><strong>Lastname: </strong>{{ userData.lastName }}</p>
        <p class="card-text"><strong>Email: </strong>{{ userData.email }}</p>
        <p class="card-text"><strong>Date of account creation: </strong>{{ userData.creationDate }}</p>
        <div class="text-center mt-3">
          <button class="btn btn-outline-success">
            <i class="bi bi-pencil"></i> Update Data
          </button>
        </div>
      </div>
    </div>
    <div class="table-container w-75 overflow-auto">
    <table v-if="reservationDataIsShowed && !isLoading" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Hotel city</th>
          <th scope="col">Week Price</th>
          <th scope="col">Hotel name</th>
          <th scope="col">Room number</th>
          <th scope="col">Start date</th>
          <th scope="col">End date</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reservation, index) in userReservationData" :key="index" :value="reservation">
          <td>{{ index + 1 }}</td>
          <td>{{ reservation.hotelCity }}</td>
          <td>{{ reservation.hotelName }}</td>
          <td>{{ reservation.roomNumber }}</td>
          <td>{{ reservation.startDate }}</td>
          <td>{{ reservation.endDate }}</td>
          <td>{{ reservation.amountPayable }}</td>
          <td>
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
              @click="deleteReservation(reservation.uuid)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>



  <!-- <div class="user-container d-flex align-items-center justify-content-center w-100 h-100 "> -->
  <footer class="user-footer py-3 w-75 d-flex align-items-center justify-content-center mx-auto">
    <ul class="nav nav-pills d-flex align-items-center justify-content-center">
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); getMyDetails()" aria-current="page">Get account details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); hideUserInfo()">Hide details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); getAllReservations()">Reservations</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); hideReservationInfo()">Hide reservations</a>
      </li>
    </ul>
  </footer>
  <!-- </div> -->

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
    setActiveNav(event) {
      const element = event.target;
      document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active') });
      element.classList.add('active');
    },
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
.user-container {
  height: 10%;
}

.user-footer {
  border-top: 1px solid #0f0f0f;
}

.card {
  width: 120%;
}
</style>