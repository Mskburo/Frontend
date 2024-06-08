import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
	},
	{
		path: '/payment-success',
		name: 'PaymentSuccess',
		component: () => import('../views/PaymentSuccess.vue'),
	},
	{
		path: '/promo/:id',
		name: 'Promo',
		component: () => import('../views/Promo.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
