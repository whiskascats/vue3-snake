import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: () => import('@/views/Start.vue'),
    meta: { title: '開始畫面' }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue'),
    meta: { title: '遊戲畫面' }
  },
  {
    path: '/game-over',
    name: 'GameOver',
    component: () => import('@/views/GameOver.vue'),
    meta: { title: '你已經死了!' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title as string
  next();
});

export default router