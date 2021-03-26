import { createWebHistory, createRouter } from 'vue-router'
// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/view1.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/vue2.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
