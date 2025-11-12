import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/ones',
            name: 'ones',
            meta: { title: 'ones工作总结' },
            component: () => import('@/views/ones/index.vue'),
        },
    ],
})

export default router
