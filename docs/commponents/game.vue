<template>
    <div class="game-wrapper">
      <div class="score">历史最高: {{ highScore }} ---- 当前得分: {{ score }}</div>
      <div class="game-container" tabindex="0">
        <div class="snake" v-for="(segment, index) in snake" :key="index" :style="getSegmentStyle(segment)">
        </div>
        <div class="food" :style="getFoodStyle()"></div>
      </div>
      <div class="controls-wrapper">
        <button class="control-button up" @click="changeDirection('up')">上</button>
        <button class="control-button left" @click="changeDirection('left')">左</button>
        <div class="start-pause-wrapper">
          <button class="control-button pause-start" @click="toggleGame">
            {{ isRunning ? '暂停' : '开始' }}
          </button>
        </div>
        <button class="control-button right" @click="changeDirection('right')">右</button>
        <button class="control-button down" @click="changeDirection('down')">下</button>
      </div>
      <div class="game-actions">
        <button class="reset-button" @click="resetGame">重置游戏</button>
        <div class="speed-slider">
          <label for="speed">速度调节: </label>
          <input
            type="range"
            id="speed"
            v-model="speed"
            min="100"
            max="500"
            step="100"
            @input="adjustSpeed"
          />
          {{ speed }}
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .game-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .game-container {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #000;
  }
  
  .snake,
  .food {
    position: absolute;
    width: 20px;
    height: 20px;
  }
  
  .snake {
    background-color: green;
  }
  .snake:first-of-type {
    background-color: rgb(50, 124, 155);
    border-radius: 50%;
  }
  .food {
    background-color: red;
  }
  
  .controls-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
    position: relative;
  }
  
  .control-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    position: absolute;
  }
  
  .up {
    top: -20px;
  }
  
  .left {
    left: -20px;
  }
  
  .start-pause-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pause-start {
    width: 50px;
  }
  
  .right {
    right: -20px;
  }
  
  .down {
    bottom: -20px;
  }
  
  .score {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  
  .game-actions {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .reset-button {
    margin-right: 10px;
  }
  
  .speed-slider {
    display: flex;
    align-items: center;
  }
  
  .speed-slider label {
    margin-right: 5px;
  }
  
  .speed-slider input {
    width: 150px;
  }
  .snake-head {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid green;
    }
    @media only screen and (max-width: 600px){
    .game-container {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #000;
    }
    .controls-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 220px;
    height: 220px;
    position: relative;
  }
  
  .control-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    position: absolute;
  }
  }
  </style>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'SnakeGame',
    data() {
      return {
        gameContainer: null,
        snake: [{ x: 100, y: 100 }],
        food: { x: 0, y: 0 },
        direction: 'right',
        timer: null,
        score: 0,
        highScore: 0,
        isRunning: true,
        speed: 200
      };
    },
    mounted() {
      this.gameContainer = document.querySelector('.game-container');
      this.startGame();
      if (localStorage.getItem('highScore')) {
            this.highScore = parseInt(localStorage.getItem('highScore'));
        }
    },
    unmounted() {
      clearInterval(this.timer);
    },
    methods: {
      startGame() {
        this.score = 0;
        this.generateFood();
        this.timer = setInterval(() => {
          if (this.isRunning) {
            this.updateSnake();
            this.checkCollision();
          }
        }, 500 - this.speed);
      },
      generateFood() {
        const maxWidth = this.gameContainer.offsetWidth / 20;
        const maxHeight = this.gameContainer.offsetHeight / 20;
        const x = Math.floor(Math.random() * maxWidth) * 20;
        const y = Math.floor(Math.random() * maxHeight) * 20;
        this.food = { x, y };
      },
      updateSnake() {
        const head = { ...this.snake[0] };
        switch (this.direction) {
          case 'up':
            head.y -= 20;
            break;
          case 'down':
            head.y += 20;
            break;
          case 'left':
            head.x -= 20;
            break;
          case 'right':
            head.x += 20;
            break;
        }
        this.snake.unshift(head);
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.generateFood();
        } else {
          this.snake.pop();
        }
      },
      checkCollision() {
        const head = this.snake[0];
        if (
          head.x < 0 ||
          head.x >= this.gameContainer.offsetWidth ||
          head.y < 0 ||
          head.y >= this.gameContainer.offsetHeight ||
          this.snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.score.toString());
          }
          clearInterval(this.timer);
          this.isRunning = false;
          alert('游戏结束');
        }
      },
      getSegmentStyle(segment) {
        return {
          left: `${segment.x}px`,
          top: `${segment.y}px`
        };
      },
      getFoodStyle() {
        return {
          left: `${this.food.x}px`,
          top: `${this.food.y}px`
        };
      },
      changeDirection(newDirection) {
        if ((this.direction === 'right' && newDirection === 'left') ||
            (this.direction === 'left' && newDirection === 'right')) {
            return;
        }
        this.direction = newDirection;
      },
      toggleGame() {
        this.isRunning = !this.isRunning;
      },
      resetGame() {
        clearInterval(this.timer);
        this.snake = [{ x: 100, y: 100 }];
        this.food = { x: 0, y: 0 };
        this.direction = 'right';
        this.score = 0;
        this.isRunning = true;
        this.startGame();
      },
      adjustSpeed() {
        clearInterval(this.timer);
        this.startGame();
      }
    }
  };
  </script>
  