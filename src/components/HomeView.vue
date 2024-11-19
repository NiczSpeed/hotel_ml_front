<!-- <template>
  <h1>Witaj</h1>
  <h1>{{ data }}</h1>
</template>

<script>
import axios from 'axios';

export default {
  name: "HomeView",
  data() {
    return {
      data: "",
    };
  },
  methods: {
    async getDetails() {
      const response = await axios.get("/user/info");
      this.data = response.data;

      if (response.status === 201) {
        this.data = response.data;
      }
    },
  },
  // mounted() {
  //   this.getDetails();
  // },
};
</script>

<style>
</style> -->