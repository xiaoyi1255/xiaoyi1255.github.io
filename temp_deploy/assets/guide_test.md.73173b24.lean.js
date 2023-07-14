import{_ as m,o as r,c as l,x as s,t as a,F as p,M as f,Y as h,a3 as _,a4 as x,a as g,N as S,O as k,C as y}from"./chunks/framework.634f3122.js";const b={name:"SnakeGame",data(){return{gameContainer:null,snake:[{x:100,y:100}],food:{x:0,y:0},direction:"right",timer:null,score:0,highScore:0,isRunning:!0,speed:200}},mounted(){this.gameContainer=document.querySelector(".game-container"),this.startGame(),localStorage.getItem("highScore")&&(this.highScore=parseInt(localStorage.getItem("highScore")))},unmounted(){clearInterval(this.timer)},methods:{startGame(){this.score=0,this.generateFood(),this.timer=setInterval(()=>{this.isRunning&&(this.updateSnake(),this.checkCollision())},500-this.speed)},generateFood(){const e=this.gameContainer.offsetWidth/20,t=this.gameContainer.offsetHeight/20,d=Math.floor(Math.random()*e)*20,c=Math.floor(Math.random()*t)*20;this.food={x:d,y:c}},updateSnake(){const e={...this.snake[0]};switch(this.direction){case"up":e.y-=20;break;case"down":e.y+=20;break;case"left":e.x-=20;break;case"right":e.x+=20;break}this.snake.unshift(e),e.x===this.food.x&&e.y===this.food.y?(this.score++,this.generateFood()):this.snake.pop()},checkCollision(){const e=this.snake[0];(e.x<0||e.x>=this.gameContainer.offsetWidth||e.y<0||e.y>=this.gameContainer.offsetHeight||this.snake.slice(1).some(t=>t.x===e.x&&t.y===e.y))&&(this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("highScore",this.score.toString())),clearInterval(this.timer),this.isRunning=!1,alert("游戏结束"))},getSegmentStyle(e){return{left:`${e.x}px`,top:`${e.y}px`}},getFoodStyle(){return{left:`${this.food.x}px`,top:`${this.food.y}px`}},changeDirection(e){this.direction==="right"&&e==="left"||this.direction==="left"&&e==="right"||(this.direction=e)},toggleGame(){this.isRunning=!this.isRunning},resetGame(){clearInterval(this.timer),this.snake=[{x:100,y:100}],this.food={x:0,y:0},this.direction="right",this.score=0,this.isRunning=!0,this.startGame()},adjustSpeed(){clearInterval(this.timer),this.startGame()}}},v=e=>(S("data-v-5bd70bde"),e=e(),k(),e),C={class:"game-wrapper"},I={class:"score"},G={class:"score"},w={class:"game-container",tabindex:"0"},F={class:"controls-wrapper"},R={class:"start-pause-wrapper"},D={class:"game-actions"},M={class:"speed-slider"},N=v(()=>s("label",{for:"speed"},"速度调节: ",-1));function j(e,t,d,c,n,o){return r(),l("div",C,[s("div",I,"历史最高: "+a(n.highScore),1),s("div",G,"当前得分: "+a(n.score),1),s("div",w,[(r(!0),l(p,null,f(n.snake,(i,u)=>(r(),l("div",{class:"snake",key:u,style:h(o.getSegmentStyle(i))},null,4))),128)),s("div",{class:"food",style:h(o.getFoodStyle())},null,4)]),s("div",F,[s("button",{class:"control-button up",onClick:t[0]||(t[0]=i=>o.changeDirection("up"))},"上"),s("button",{class:"control-button left",onClick:t[1]||(t[1]=i=>o.changeDirection("left"))},"左"),s("div",R,[s("button",{class:"control-button pause-start",onClick:t[2]||(t[2]=(...i)=>o.toggleGame&&o.toggleGame(...i))},a(n.isRunning?"暂停":"开始"),1)]),s("button",{class:"control-button right",onClick:t[3]||(t[3]=i=>o.changeDirection("right"))},"右"),s("button",{class:"control-button down",onClick:t[4]||(t[4]=i=>o.changeDirection("down"))},"下")]),s("div",D,[s("button",{class:"reset-button",onClick:t[5]||(t[5]=(...i)=>o.resetGame&&o.resetGame(...i))},"重置游戏"),s("div",M,[N,_(s("input",{type:"range",id:"speed","onUpdate:modelValue":t[6]||(t[6]=i=>n.speed=i),min:"100",max:"500",step:"100",onInput:t[7]||(t[7]=(...i)=>o.adjustSpeed&&o.adjustSpeed(...i))},null,544),[[x,n.speed]]),g(" "+a(n.speed),1)])])])}const T=m(b,[["render",j],["__scopeId","data-v-5bd70bde"]]),V=s("h2",{id:"test",tabindex:"-1"},[g("test "),s("a",{class:"header-anchor",href:"#test","aria-label":'Permalink to "test"'},"​")],-1),O=JSON.parse('{"title":"小易","titleTemplate":"点滴纪录","description":"","frontmatter":{"title":"小易","titleTemplate":"点滴纪录"},"headers":[],"relativePath":"guide/test.md","lastUpdated":1689343821000}'),B={name:"guide/test.md"},W=Object.assign(B,{setup(e){return(t,d)=>(r(),l("div",null,[V,y(T)]))}});export{O as __pageData,W as default};
