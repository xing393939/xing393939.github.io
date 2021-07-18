import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{ path: '/list/:page', component: () => import('../components/ListView.vue') },
	{ path: '/static/:slug+', component: () => import('../components/StaticView.vue') },
	{ path: '/post/:slug+', component: () => import('../components/StaticView.vue') },
	{
		path: '/:catchAll(toc-.*)', beforeEnter: (to, from) => {
			let anchorElement = document.getElementById(to.params.catchAll);
			if (anchorElement) anchorElement.scrollIntoView();
			return false
		},
	},
	{ path: '/:catchAll(.*)', redirect: '/list/1' }
]

export default createRouter({
	history: createWebHashHistory(),
	routes,
})