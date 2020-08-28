<template>
    <div>
        <div id="main" v-show="!isHide">
            <ul class="posts">
                <li v-for="item in items">
                    <p class="date" cate="tech">{{item.date}}</p>
                    <router-link :to="'/list/' + page + item.id">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
        <router-view :title=title></router-view>
        <!-- navigation -->
        <div style="overflow:auto;" v-show="!isHide">
            <router-link style="float:left;" v-if="page > 1" :to="'/list/' + (page - 1)">上一页</router-link>
            <router-link style="float:right;" v-if="page == $route.params.page" :to="'/list/' + (page + 1)">下一页
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListView',
        data() {
            return {
                isHide: false,
                title: '',
                page: 1,
                items: []
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function () {
                const page = +this.$route.params.page
                this.isHide = this.$route.params.id

                this.$http.get('/static/' + page + '/')
                    .then((response) => {
                        this.items = response.data
                        this.page = page

                        if (this.isHide) {
                            this.setChildTitle()
                        }
                    })
                    .catch(function (response) {
                        console.log(response)
                    })
            },
            setChildTitle(params) {
                const id = '/' + [this.$route.params.category, this.$route.params.id].join('/')

                let _self = this;
                this.items.forEach(function (row) {
                    if (row.id == id) {
                        _self.title = row.title
                    }
                })
            }
        },
        filters: {
            formatItemIndex(index) {
                return (this.page - 1) * 30 + index + 1
            }
        }
    }
</script>
