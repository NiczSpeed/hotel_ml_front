<template>
  <div class="user-container d-flex flex-column align-items-center justify-content-start w-100">
    <div class="card w-50 mb-3 pt-3" v-if="userDataIsShowed && !isLoading">
      <div class="card-body">
        <p class="card-text"><strong>Name: </strong> {{ userData.firstName }}</p>
        <p class="card-text"><strong>Lastname: </strong>{{ userData.lastName }}</p>
        <p class="card-text"><strong>Email: </strong>{{ userData.email }}</p>
        <p class="card-text"><strong>Date of account creation: </strong>{{ userData.creationDate }}</p>
        <div class="text-center mt-3">
          <button class="btn btn-outline-success" data-bs-toggle="modal" @click=" transportUserData()"
            data-bs-target="#userUpdateModal">
            <i class="bi bi-pencil"></i> Update Data
          </button>
        </div>
      </div>
    </div>
    <div class="table-container mb-3 pt-3 w-50 overflow-auto">
      <table v-if="reservationDataIsShowed && !isLoading" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hotel city</th>
            <th scope="col">Hotel name</th>
            <th scope="col">Room number</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Price</th>
            <th scope="col">Update</th>
            <th scope="col">Remove</th>
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
              <button type="button" class="btn btn-outline-success" data-bs-toggle="modal"
                data-bs-target="#reservationUpdateModal"
                @click="transportReservationData(reservation.startDate, reservation.endDate); setReservationUuid(reservation.uuid)">
                Update
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                data-bs-target="#confirmRemoveReservationModal" @click="setReservationUuid(reservation.uuid)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <footer class="user-footer py-3 w-75 d-flex align-items-center justify-content-center mx-auto">
    <ul class="nav nav-pills d-flex align-items-center justify-content-center">
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); getMyDetails()" aria-current="page">Get account details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); getAllReservations()">Reservations</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActiveNav($event); hideReservationInfo(); hideUserInfo()">Hide info</a>
      </li>
    </ul>
  </footer>

  <div class="modal fade" id="userUpdateModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="userUpdateModalLabel">Update your details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="submitForm" @submit.prevent="updateUser">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="userUpdateform.email">
              <div class="form-text">Changing your email will result in logging out.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="userUpdateform.password">
              <div class="form-text">We'll never share your password with anyone else.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" id="firstName" v-model="userUpdateform.firstName">
            </div>
            <div class="mb-3">
              <label class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" v-model="userUpdateform.lastName">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-outline-success" @click="updateUser()" data-bs-dismiss="modal">Confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="reservationUpdateModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="reservationUpdateModalLabel">Choose new reservation date</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="submitForm" @submit.prevent="updateReservation">
            <div class="mb-3">
              <label class="form-label">Start date</label>
              <input type="date" class="form-control" id="startDate" v-model="reservationUpdateForm.startDate">
            </div>
            <div class="mb-3">
              <label class="form-label">End date</label>
              <input type="date" class="form-control" id="endDate" v-model="reservationUpdateForm.endDate">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-outline-success" @click="updateReservation()" data-bs-dismiss="modal">Confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="confirmRemoveReservationModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmRemoveReservationModalLabel">Are you sure you want to delete this
            reservation?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="No"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">No</button>
          <button class="btn btn-outline-success" @click="deleteReservation()" data-bs-dismiss="modal">Yes
          </button>
        </div>
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
      userUpdateform: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      reservationUpdateForm: {
        uuid: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  created() {
    this.getDetails();
  },

  methods: {
    setReservationUuid(uuid) {
      this.reservationUpdateForm.uuid = uuid;
    },
    setActiveNav(event) {
      const element = event.target;
      document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active') });
      element.classList.add('active');
    },
    transportUserData() {
      this.userUpdateform.email = this.userData.email;
      this.userUpdateform.firstName = this.userData.firstName;
      this.userUpdateform.lastName = this.userData.lastName;
    },
    transportReservationData(startDate, endDate) {
      this.reservationUpdateForm.startDate = startDate;
      this.reservationUpdateForm.endDate = endDate;
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
        this.$root.$refs.infoModal.showModal("Error", error);
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
        if (this.reservationDataIsShowed) {
          this.reservationDataIsShowed = false;
        }
        this.userData = response.data.message;
        this.userDataIsShowed = true;
        this.isLoading = false;
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error);
      }
    },
    async updateUser() {
      try {
        const token = sessionStorage.getItem("token");
        const currentEmail = this.userData.email;
        console.log(this.userUpdateform.firstName);
        if (!this.userUpdateform.firstName.trim() || !this.userUpdateform.lastName.trim()) {
          this.$root.$refs.infoModal.showModal("Error", "You have blank fields in the form (except for the password).")
        }
        else {
          if (!this.userUpdateform.password) { delete this.userUpdateform.password; }
          await api.patch("/user/update", this.userUpdateform, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (this.userUpdateform.email !== currentEmail) {
            await api.get("/user/logout", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            sessionStorage.removeItem("token");
            this.$eventBus.emit('logout');
            this.$root.$refs.infoModal.showModal("Success", "You have been successfully logged out.");
            this.$router.push("/");
            this.$isLogged.value = false;
            this.$isAdmin.value = false;
          }

          this.hideUserInfo();
          this.$root.$refs.infoModal.showModal("Success", "Data has been updated successfully.");
        }

      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error)
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
        if (this.userDataIsShowed) {
          this.userDataIsShowed = false;
        }
        this.userReservationData = response.data.message;
        this.reservationDataIsShowed = true;
        this.isLoading = false;
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error)
      }
    },
    async updateReservation() {
      try {
        const token = sessionStorage.getItem("token");
        await api.patch("/reservation/update", this.reservationUpdateForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.hideReservationInfo();
        this.$root.$refs.infoModal.showModal("Success", "Data has been updated successfully.");
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error)
      }
    },
    async deleteReservation() {
      try {
        const uuid = this.reservationUpdateForm.uuid;
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
          this.$root.$refs.infoModal.showModal("Success", "Reservation was successfully deleted.");
          this.hideReservationInfo();
        }
      } catch (error) {
        this.$root.$refs.infoModal.showModal("Error", error);
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
  height: 45vh;
}

.user-footer {
  border-top: 1px solid #0f0f0f;
}

.table-container {
  max-height: 40vh;
}
</style>