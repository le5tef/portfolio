import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/PCDisplay.vue')
    },
    {
        path: '/shoes',
        name: 'Shoes',
        component: () => import('../views/Shoes.vue')
    },
    {
        path: '/sandwich',
        name: 'Sandwich',
        component: () => import('../views/Sandwich')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    mode: 'history',
    routes
})

export default router
