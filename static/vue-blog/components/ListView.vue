<template>
  <div>
    <div id="main">
      <ul class="posts">
        <li v-for="(item, k) in items" :key="k">
          <span class="category">{{item.category}}</span>
          <p class="date">{{item.date}}</p>
          <router-link :to="item.id">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <!-- navigation -->
    <div style="overflow:auto;">
      <router-link style="float:left;" v-if="page > 1" :to="'/list/' + (page - 1)">上一页</router-link>
      <router-link
        style="float:right;"
        v-if="page == $route.params.page"
        :to="'/list/' + (page + 1)"
      >下一页</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListView",
  data() {
    return {
      page: 1,
      items: [],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData: function () {
      const page = +this.$route.params.page;
      axios
        .get("/static/" + (page > 1 ? page + "/" : ""))
        .then((response) => {
          this.items = response.data;
          this.page = page;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
};
</script>
