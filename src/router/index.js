import Vue from 'vue'
import VueRouter from 'vue-router'
import Bulletinboard from '@/components/Bulletinboard/Bulletinboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Bulletinboard',
    component: Bulletinboard,
  },
  {
    path: '/manage',
    name: 'Manage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/Management/Management.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
