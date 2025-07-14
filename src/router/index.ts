import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    name: 'zzfLogin',
    path: '/zzfLogin',
    component: () => import('/@/views/zzfLogin/ZzfLogin.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('/@/views/home/Home.vue'),
  },
  {
    name: 'logindemo',
    path: '/logindemo',
    component: () => import('/@/views/logindemo/Logindemo.vue'),
  },
  {
    name: 'demo',
    path: '/demo',
    component: () => import('/@/views/demo/demoLogin.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
