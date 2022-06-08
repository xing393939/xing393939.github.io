<template>
    <div class="cnt" v-html="item"></div>
    <giscus-widget
            v-if="!itemUrl.includes('/static/')"
            repo="xing393939/xing393939.github.io"
            repoid="MDEwOlJlcG9zaXRvcnkyOTA5NDAzMTI="
            category="Announcements"
            categoryid="DIC_kwDOEVdlmM4CPiJB"
            mapping="specific"
            :term="itemUrl"
            reactionsenabled="0"
            emitmetadata="0"
            inputposition="top"
            theme="light"
            lang="en"
            loading="lazy"
    ></giscus-widget>
</template>

<script>
    import axios from "axios";
    import 'giscus';

    export default {
        name: "StaticView",
        data() {
            return {
                item: "",
                itemUrl: "",
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
                this.itemUrl = this.$router.currentRoute.value.fullPath;
                let self = this;
                if (self.$route.params.page) {
                    return;
                }
                self.item = "<p>loading...</p>";
                axios
                    .get(self.$router.currentRoute.value.fullPath + ".html")
                    .then((response) => {
                        self.item = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
        },
    };
</script>
