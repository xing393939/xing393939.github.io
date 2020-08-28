import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/list/:page', component: () => import('@/components/ListView.vue')},
		{ path: '/static/:slug', component: () => import('@/components/StaticView.vue')},
		{ path: '*', redirect: '/list/1' }
	]
});