import { defineStore } from 'pinia'
export const useStore = defineStore('score', {
  state: () => ({ 
    score: 0,
    bestScore: 0,
  }),
})