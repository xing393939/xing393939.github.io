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
      let self = this;
      self.item = "<p>loading...</p>";
      axios
        .get(self.$router.currentRoute.value.fullPath + ".html")
        .then((response) => {
          self.item = response.data;
          self.$nextTick(() => {
            document
              .getElementById("toc-container")
              .html("")
              .append(self.$refs["toc-container"]);
          });
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
};
</script>
