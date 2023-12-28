<template>
  <div class="game-over">
    <div class="text-center">
      <h1>GAME OVER</h1>
      <div class="d-flex align-items-center my-3" style="justify-content: space-between;">
        <div>
          score
          <p class="score"> {{ score }} </p>
        </div>
        <div class="score">
          /
        </div>
        <div>
          best
          <p class="score"> {{ bestScore }} </p>
        </div>
      </div>
      <span class="restart">RESTART?</span>
      <div class="continue">
        <router-link to="/game">
          YES[Y]
        </router-link>
        <router-link to="/">
          NO[N]
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {  onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useStore } from "@/store";

const router = useRouter()
const { score, bestScore } = storeToRefs(useStore())

const keycodeControl = (event: KeyboardEvent) => {
  switch(event.code) {
    case 'Space':
    case 'Backspace':
    case 'KeyY':
      router.push({ name: 'Game' })
    break;
    case 'Escape':
    case 'KeyN':
      router.push({ name: 'Start' })
    break;
  }
}
onMounted(() => {
  document.addEventListener('keydown', keycodeControl)
  if (localStorage.getItem('best') != null) {
    bestScore.value = Number(localStorage.getItem('best'))
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', keycodeControl)
})
</script>