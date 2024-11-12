import axios from 'axios';

export async function fetchCities() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:8081/hotel/cities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }
