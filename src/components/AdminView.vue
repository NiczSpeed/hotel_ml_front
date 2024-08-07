<template>
  <h1>Witaj testuje tokeny JWT dla Admina</h1>
  <h1>{{ data }}</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminView",
  data() {
    return {
      data: null,
      userData: null,
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/admin/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.data = response.data;
      } catch (error) {
        this.data = "U have no access to be here -,-"
        console.log("Test")
      }
    },
  },
};
</script>

<style>
</style>