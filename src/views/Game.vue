<template>
  <div class="game">
    <div class="board">
      <div class="rows" v-for="i in boradSize.height" :key="i">
        <div class="grid" v-for="j in boradSize.width" :key="j" :ref="boradSetting(i-1, j-1)">
          <div></div>
        </div>
      </div>

      <div class="words lt">
        SNAA
      </div>
      <div class="words tl">
        AAAAKE
      </div>
      <div class="words rb">
        SNAA
      </div>
      <div class="words br">
        AAAAKE
      </div>
      <div class="best">
        best
        <span class="point"> {{bestScore}} </span>
      </div>
      <div class="score">
        score
        <span class="point"> {{score}} </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useWindowSize } from '@vueuse/core'
import { useStore } from "@/store";

const router = useRouter()
const { width: clientWidth } = useWindowSize()
const { score, bestScore } = storeToRefs(useStore())

const board = ref<HTMLElement[][]>([])
const boradSize = reactive<{width: number, height: number, speed: number}>({
  width: 28,
  height: 16,
  speed: 400
})
const media = ref('pc')
const alive = ref(true)
const snakeRecord = ref<{x:number, y:number}[]>([{x: Math.round(boradSize.width/2), y: Math.round(boradSize.height/2)}])
const pointPos = ref({x:0, y:0})
const direction = ref([0,0])
let interval = 0
const boradSetting = (i:number, j:number) => (el: any) => {
  if (!board.value[i]) {
    board.value[i] = [];
  }
  board.value[i][j] = el;
};
const randomPosition = ():{x:number, y:number} => {
  let repeat = []
  let rand:{x:number, y:number} = {x:0, y:0}
  do {
    rand = {
      x: Math.floor(Math.random() * boradSize.width),
      y: Math.floor(Math.random() * boradSize.height)
    }
    repeat = snakeRecord.value.filter(item => rand.x === item.x && rand.y === item.y)
  } while(repeat.length>0) 
  return rand
}
const food = {
  create() {
    pointPos.value = randomPosition()
    const {x,y} = pointPos.value
    board.value[y][x].classList.add('food-img')
    this.shadow()
  },
  shadow() {
    const {x,y} = pointPos.value
    for (let i = 1; i < 8; i++) {
      let opacityValue = (1 - i / 8) * 0.2
      if (x-i >= 0) {
        board.value[y][x-i].style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`
      }
      if (x+i <= (boradSize.width-1)) {
        board.value[y][x+i].style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`
      }
      if (y-i >= 0) {
        board.value[y-i][x].style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`
      }
      if (y + i <= (boradSize.height-1)) {
        board.value[y+i][x].style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`
      }
    }
  },
  remove() {
    const {x,y} = pointPos.value
    for (let i = 1; i < 8; i++) {
      if (x-i >= 0) {
        board.value[y][x-i].style.backgroundColor = ''
      }
      if (x+i <= (boradSize.width-1)) {
        board.value[y][x+i].style.backgroundColor = ''
      }
      if (y-i >= 0) {
        board.value[y-i][x].style.backgroundColor = ''
      }
      if (y + i <= (boradSize.height-1)) {
        board.value[y+i][x].style.backgroundColor = ''
      }
    }
    board.value[y][x].classList.remove('food-img')
  }
}
const snake = {
  draw() {
    if(alive.value) {
      let snakeLength = snakeRecord.value.length
      let headPos = snakeRecord.value[snakeLength-1]
      for (let i = 0; i < snakeLength; i++) {
        let target = board.value[snakeRecord.value[i].y][snakeRecord.value[i].x]
        
        target.style.backgroundColor= '#00FFE2';
        target.style.opacity = `${(i+1)/snakeLength}`
        target.style.boxShadow = 'none'
        target.style.boxShadow = '0 0 30px 6px #fff'
      }
      // 碰撞檢查
      for (let i = 0; i < snakeLength - 1; i++) {
        //Game Over
        if (headPos.x == snakeRecord.value[i].x && headPos.y == snakeRecord.value[i].y) {
          board.value[headPos.y][headPos.x].style.backgroundColor = '#ff7600'
          alive.value = false
          window.removeEventListener('keydown', keycodeControl)
          setTimeout(() => {
            router.push({ name: 'GameOver' })
          }, 1500);
        }
      }
    } else {
      clearInterval(interval);
    }
  },
  move() {
    let snakeLength = snakeRecord.value.length
    let headPos = snakeRecord.value[snakeLength-1]
    let footPos = snakeRecord.value[0]
    let newPosition = {
      x: (headPos.x + direction.value[0] + boradSize.width) % boradSize.width,
      y: (headPos.y + direction.value[1] + boradSize.height) % boradSize.height
    }
    snakeRecord.value.push(newPosition)

    board.value[footPos.y][footPos.x].style.backgroundColor = ''
    board.value[footPos.y][footPos.x].style.opacity = ''
    board.value[footPos.y][footPos.x].style.boxShadow = ''
    food.shadow()

    if (newPosition.x === pointPos.value.x && newPosition.y === pointPos.value.y) { //得分
      score.value ++
      if (score.value > bestScore.value) {
        bestScore.value = score.value
        localStorage.setItem('best', String(bestScore.value))
      }
      food.remove()
      food.create()
    } else { //未得分去掉後面
      snakeRecord.value.splice(0, 1)
    }
    this.draw()
  },
  directionControl(side: [number,number]) {
    clearInterval(interval) //清除先前的前進方向
    direction.value = side
    this.move()
    interval = setInterval(() => {
      this.move()
    }, boradSize.speed);
  }
}
const keycodeControl = (event: KeyboardEvent) => {
  let snakeLength = snakeRecord.value.length
  switch (event.code) {
    case 'KeyA':
    case 'ArrowLeft': //向左
      direction.value[0] !== 1 || snakeLength === 1 ? snake.directionControl([-1,0]) : false
    break
    case 'KeyW':
    case 'ArrowUp': //向上
      direction.value[1] !== 1 ||snakeLength === 1 ? snake.directionControl([0,-1]) : false
    break
    case 'KeyD':
    case 'ArrowRight': //向右
      direction.value[0] !== -1 || snakeLength === 1 ? snake.directionControl([1,0]) : false
    break
    case 'KeyS':
    case 'ArrowDown': //向下
      direction.value[1] !== -1 || snakeLength === 1 ? snake.directionControl([0,1]) : false
    break
  }
}
watch(() => score.value, (value) => {
  if (value >= 60) {
    boradSize.speed = 50
  } else if (value >= 40) {
    boradSize.speed = 100
  } else if (value >= 20) {
    boradSize.speed = 150
  } else if (value >= 10) {
    boradSize.speed = 200
  } else if (value >= 5) {
    boradSize.speed = 300
  }
})
watch(() => clientWidth.value, (value) => {
  if (value > 992) {
    boradSize.width = 28
    boradSize.height = 16
    media.value = 'pc'
  } else if (value > 768) {
    boradSize.width = 20
    boradSize.height = 14
    media.value = 'pc'
  } else if (value > 576) {
    boradSize.width = 16
    boradSize.height = 16
    media.value = 'pc'
  } else {
    boradSize.width = 12
    boradSize.height = 16
    media.value = 'mobile'
  }
}, { deep: true, immediate: true })
onMounted(() => {
  food.create()
  snake.draw()
  document.addEventListener('keydown', keycodeControl)
  score.value = 0
  if (localStorage.getItem('best') != null) {
    bestScore.value = Number(localStorage.getItem('best'))
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', keycodeControl)
})

</script>