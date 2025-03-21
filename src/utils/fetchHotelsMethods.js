import api from "./axiosInterceptor";

export async function fetchCities() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/hotel/cities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      this.$root.$refs.infoModal.showModal("Error", "There was an error with fetch list of cities!");
    }
  }
