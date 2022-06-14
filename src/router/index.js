import Vue from 'vue'
import VueRouter from 'vue-router'

import login from "@/views/login";
import Home from "@/views/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: Home

  }
]

const router = new VueRouter({
  routes
})

export default router
