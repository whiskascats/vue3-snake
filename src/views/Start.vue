<template>
  <div class="start">
    <div class="text-center">
      <h1>SNAAAAAAKE</h1>
      <p>PRESS [<router-link to="/game"><span>Space</span></router-link>] TO START</p>
      <!-- <p v-if="media=='mobile'">PRESS [<span class="bang" @click="start(32)">HERE</span>] TO START</p> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const start = (event: KeyboardEvent) => {
  if(event.code === 'Space') {
    router.push({ name: 'Game' })
  }
}
onMounted(() => {
  document.addEventListener('keydown', start)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', start)
})
</script>