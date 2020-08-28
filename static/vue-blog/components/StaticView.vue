<template>
    <div class="cnt" v-html="item">
    </div>
</template>

<script>
    export default {
        name: 'StaticView',
        data() {
            return {
                item: "",
                pollOptions: null
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.item = '<p>loading...</p>';
                this.$axios.get(this.$router.currentRoute.path + '.html')
                    .then((response) => {
                        this.item = response.data;
                    })
                    .catch(function (response) {
                        console.log(response)
                    })
            },
        }
    }
</script>
