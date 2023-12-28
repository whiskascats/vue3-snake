import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: () => import('@/views/Start.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue')
  },
  {
    path: '/game-over',
    name: 'GameOver',
    component: () => import('@/views/GameOver.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  next();
});

export default router