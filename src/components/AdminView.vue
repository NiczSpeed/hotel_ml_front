<template>
  <h1>{{ data }}</h1>

  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Grant admin role</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="submitForm" @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Grantee Email</label>
              <input type="email" class="form-control" id="granteeEmail" aria-describedby="emailHelp"
                v-model="form.granteeEmail">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-outline-success" form="submitForm" data-bs-dismiss="modal">Save changes</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import api from "../utils/axiosInterceptor";

export default {
  name: "AdminView",
  data() {
    return {
      showModal: false,
      data: null,
      form: {
        granteeEmail: ""
      }
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/admin/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.data = response.data;
      } catch (error) {
        window.alert(error);
      }
    },
    async submitForm() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.patch(
          "/admin/grant", this.form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          window.alert("Admin grantet correctly!");
          this.$router.push("/");
        }
      } catch (error) {
        window.alert(error);
      }
    },
  },
};
</script>

<style></style>