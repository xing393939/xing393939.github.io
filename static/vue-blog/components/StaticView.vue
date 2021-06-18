<template>
  <div class="cnt" v-html="item"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "StaticView",
  data() {
    return {
      item: "",
      pollOptions: null,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      console.log(this.$router)
      this.item = "<p>loading...</p>";
      axios
        .get(this.$router.currentRoute.value.fullPath + ".html")
        .then((response) => {
          this.item = response.data;
          document.getElementById('toc-container').append(this.$refs['toc-container'])
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
};
</script>
