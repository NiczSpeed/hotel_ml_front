<template>

  <div class=" d-flex justify-content-center ">
    <form class="form" v-if="$isLogged.value" @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6 ">
          <select v-model="form.city" @change="fetchHotels" id="citySelect" class="form-select " required>
            <option disabled value="">Choose City</option>
            <option v-for="(option, index) in cities" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input type="number" v-model="form.numberOfBeds" id="numberOfBeds" name="numberOfBeds" class="form-control"
            placeholder="Email address" min="1" required>
          <label class="ps-4" for="floatingEmail">Number of guests</label>
        </div>
      </div>
      <div class="row g-3">
        <div class="form-floating mb-3 col-md-6">
          <input v-model="form.startDate" id="startDate" class="form-control" placeholder="Start date" type="date"
            required />
          <label class="ps-4" for="floatingStartDate">Start date</label>
        </div>
        <div class="form-floating mb-3 col-md-6">
          <input v-model="form.endDate" id="startDate" class="form-control" placeholder="End date" type="date"
            required />
          <label class="ps-4" for="floatingEndDate">End date</label>
        </div>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Search</button>
    </form>
  </div>


  <div class="container my-4">
    <div class="accordion">
      <div class="accordion-item" id="acordionItem" v-for="(hotel, hotelIndex) in hotels" :key="hotelIndex">
        <h2 class="accordion-header" :id="'heading-' + hotelIndex">
          <button class="accordion-button" type="button" :class="{ collapsed: !openedAcordeaon[hotelIndex] }"
            @click="toggleAkordeon(hotelIndex)">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Hotel name</th>
                  <th scope="col">Number of stars</th>
                  <th scope="col">Contact</th>
                </tr>
              </thead>
              <tbody>
                <td>{{ hotelIndex + 1 }}</td>
                <td>{{ hotel.name }}</td>
                <td>{{ hotel.numberOfStars }}</td>
                <td>{{ hotel.contact }}</td>
              </tbody>
            </table>
          </button>
        </h2>
        <div class="accordion-collapse collapse" :class="{ show: openedAcordeaon[hotelIndex] }">
          <div class="accordion-body">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Room number</th>
                  <th scope="col">Week Price</th>
                  <th scope="col">Weekend Price</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(room, roomIndex) in hotel.rooms" :key="roomIndex" :value="room">
                  <td>{{ room.number }}</td>
                  <td>{{ room.weekPrice }}</td>
                  <td>{{ room.weekendPrice }}</td>
                  <td>{{ room.description}}</td>
                  <td>
                    <button class="btn btn-success" @click="goToReservationView(hotel, room)">
                      Reserve
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import api from "../utils/axiosInterceptor";
import { fetchCities } from "../utils/fetchHotelsMethods";

export default {
  name: "SearchFreeRoomsView",
  data() {
    return {
      openedAcordeaon: [],
      cities: [],
      hotels: [],
      isLoading: true,
      form: {
        city: "",
        startDate: "",
        endDate: "",
        numberOfBeds: ""
      },
    };
  },
  async created() {
    try {
      if (this.$isLogged.value) { this.cities = await fetchCities(); }

    } catch (error) {
      console.error(
        "There was an error with fetch list of cities! Error: ",
        error
      );
      throw error;
    }
  },
  methods: {
    toggleAkordeon(index) {
      if (this.openedAcordeaon[index]) this.openedAcordeaon[index] = false;
      else this.openedAcordeaon = this.openedAcordeaon.map((_, i) => i === index);
    },
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
        const response = await api.get(
          `/hotel/free/${this.form.city}/${this.form.startDate}/${this.form.endDate}/${this.form.numberOfBeds}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.hotels = response.data.message;
        this.openedAcordeaon = this.hotels.map(() => false)
        this.isLoading = false;

        if (response.status === 201) {
          window.alert("Registered with success!");
          this.$router.push("/");
        }
      } catch (error) {
        window.alert(error);
      }
    },
  },
};
</script>

<style>
.accordion {
  max-height: 20vh;
  overflow-y: auto;
}

.accordion-body {
  max-height: 10vh;
  overflow-y: auto;
}
</style>