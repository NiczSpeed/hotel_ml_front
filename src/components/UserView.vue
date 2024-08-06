<template>
  <h1>Witaj testuje tokeny JWT dla Usera</h1>
  <h1>{{ data }}</h1>
  <div id = "userDetails">
    <button @click="getMyDetails"  style="height: 60px; width:120px; color: brown;">Show my data</button>
    <p>hej</p>
    <p>{{ userData}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserView",
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
      try{
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/user/info", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      this.data = response.data;
      }catch (error) {
        window.alert(error.response.data.message);
      }
    },
        async getMyDetails(){
        try{
            const token = sessionStorage.getItem("token");
            const response = await axios.get("http://localhost:8081/user/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userData = response.data;
        }catch (error) {
            this.userData = "Something went wrong!"
        }
    }
  },
};
</script>

<style>
</style>