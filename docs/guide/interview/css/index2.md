---
theme: channing-cyan
---
## 前端高频面试之CSS篇
### 1. CSS垂直水平居中

 flex

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

 position + transform

```css
.container {
  position: relative;
}
.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
position + margin

```css
.container {
	position: relative;
}
.item {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
```
 grid

```css
.container {
  display: grid;
  place-items: center;
}
```

 table-cell

```css
.container {
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}
.item {
	display: inline-block;
	vertical-align: middle;
}
```