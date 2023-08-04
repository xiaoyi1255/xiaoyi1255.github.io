import{_ as a,o as l,c as o,x as s,a as n,Q as p}from"./chunks/framework.634f3122.js";const h=JSON.parse('{"title":"Dart 语法","titleTemplate":"基础数据类型","description":"","frontmatter":{"title":"Dart 语法","titleTemplate":"基础数据类型"},"headers":[],"relativePath":"flutter/1.基础类型之数值.md","lastUpdated":1691148616000}'),t={name:"flutter/1.基础类型之数值.md"},e=s("h2",{id:"前言",tabindex:"-1"},[n("前言 "),s("a",{class:"header-anchor",href:"#前言","aria-label":'Permalink to "前言 {#前言}"'},"​")],-1),c=s("h2",{id:"Dart",基础类型之数字:"",tabindex:"-1"},[n("Dart 基础类型之数字 "),s("a",{class:"header-anchor",href:"#Dart","aria-label":'Permalink to "Dart 基础类型之数字 {#Dart 基础类型之数字}"'},"​")],-1),r=p(`<ul><li>int: 整数</li><li>double: 浮点数</li><li>num: 可以表示整数和浮点数</li></ul><h2 id="常用属性" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性" aria-label="Permalink to &quot;常用属性 {#常用属性}&quot;">​</a></h2><table><thead><tr><th>属性</th><th>返回值</th></tr></thead><tbody><tr><td>isFinite</td><td>数值是否是有限的</td></tr><tr><td>isInfinite</td><td>数值是否是无限的</td></tr><tr><td>isNaN</td><td>是否是NAN</td></tr><tr><td>isNegative</td><td>是否是负数</td></tr><tr><td>hashCode</td><td>hashCode</td></tr><tr><td>runtimeType</td><td>类型</td></tr><tr><td>sign</td><td>0 返回 0; &gt;=1 返回 1; &lt;= 0 返回 -1</td></tr></tbody></table><h2 id="常用方法" tabindex="-1">常用方法 <a class="header-anchor" href="#常用方法" aria-label="Permalink to &quot;常用方法 {#常用方法}&quot;">​</a></h2><table><thead><tr><th>方法</th><th>返回值</th></tr></thead><tbody><tr><td>abs</td><td>绝对值</td></tr><tr><td>ceil</td><td>向上取整</td></tr><tr><td>floor</td><td>向下取整</td></tr><tr><td>toInt</td><td>转成int</td></tr><tr><td>toDouble</td><td>转浮点数</td></tr><tr><td>toString</td><td>转成字符串</td></tr><tr><td>clamp(start,end)</td><td>取范围最大值 [最小, 最大] 值</td></tr><tr><td>toStringAsFixed(num)</td><td>保留小数位数</td></tr><tr><td>truncate</td><td>舍弃小数部分</td></tr><tr><td>compareTo()</td><td>比较大小，大：1；小：-1；一样大0</td></tr><tr><td>round</td><td>四舍五入</td></tr></tbody></table><h2 id="代码展示" tabindex="-1">代码展示 <a class="header-anchor" href="#代码展示" aria-label="Permalink to &quot;代码展示 {#代码展示}&quot;">​</a></h2><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* Dart 基础类型之数字</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* int: 整数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* double: 浮点数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* num: 可以表示整数和浮点数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">num_Properties</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">num_methods</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">num_Properties</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">num</span><span style="color:#A6ACCD;"> n1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">num</span><span style="color:#A6ACCD;"> n2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> n3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">double</span><span style="color:#A6ACCD;"> n4 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3.9</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">double</span><span style="color:#A6ACCD;"> n5 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">3.9</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; n2 is : \${</span><span style="color:#A6ACCD;font-style:italic;">n2</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isFinite</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true 数值是否是有限的</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; n3 is : \${</span><span style="color:#A6ACCD;font-style:italic;">n3</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isInfinite</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false 数值是否是无限的</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; n4 is : \${</span><span style="color:#A6ACCD;font-style:italic;">n4</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isNaN</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false 是否是NAN</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; n1 is : \${</span><span style="color:#A6ACCD;font-style:italic;">n5</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isNegative</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true 是否是负数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; hashCode is : \${</span><span style="color:#A6ACCD;font-style:italic;">n1</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">hashCode</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 0 返回hashCode</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; runtimeType is : \${</span><span style="color:#A6ACCD;font-style:italic;">n1</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">runtimeType</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// int 类型是 int</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; sign is : \${</span><span style="color:#A6ACCD;font-style:italic;">n1</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">sign</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 0 , 0 返回 0; &gt;=1 返回 1; &lt;= 0 返回 -1</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; sign is : \${</span><span style="color:#A6ACCD;font-style:italic;">n2</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">sign</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1 类型是 int</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; sign is : \${</span><span style="color:#A6ACCD;font-style:italic;">n3</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">sign</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -1 类型是 int</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">num_methods</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">num</span><span style="color:#A6ACCD;"> n2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> n3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">double</span><span style="color:#A6ACCD;"> n5 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">3.9</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">double</span><span style="color:#A6ACCD;"> n6 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123456.78910</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; abs is : \${</span><span style="color:#A6ACCD;font-style:italic;">n3</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">abs</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 2 绝对值</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; ceil is : \${</span><span style="color:#A6ACCD;font-style:italic;">n5</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">ceil</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -3 向上取整</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; floor is : \${</span><span style="color:#A6ACCD;font-style:italic;">n5</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">floor</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -4 向下取整</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; toInt is : \${</span><span style="color:#A6ACCD;font-style:italic;">n5</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">toInt</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -3 转成int</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; toDouble is : \${</span><span style="color:#A6ACCD;font-style:italic;">n2</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">toDouble</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1.0 转浮点数</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; toString is : \${</span><span style="color:#A6ACCD;font-style:italic;">n5</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;-3.9&quot; 转成字符串</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; clamp is : \${</span><span style="color:#A6ACCD;font-style:italic;">n6</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">clamp</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">, </span><span style="color:#F78C6C;">123457</span><span style="color:#C3E88D;">)}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 123456.7891 取范围最大值 [最小, 最大] 值</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; round is : \${</span><span style="color:#A6ACCD;font-style:italic;">n6</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">round</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 123457 四舍五入</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; toStringAsFixed is : \${</span><span style="color:#A6ACCD;font-style:italic;">n6</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">toStringAsFixed</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">)}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 123456.8 保留小数位数</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; truncate is : \${</span><span style="color:#A6ACCD;font-style:italic;">n6</span><span style="color:#C3E88D;">.</span><span style="color:#82AAFF;">truncate</span><span style="color:#C3E88D;">()}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 123456 舍弃小数部分</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; compareTo is : \${</span><span style="color:#F78C6C;">0.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">0</span><span style="color:#C3E88D;">)}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 0 比较大小：一样大</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; compareTo is : \${</span><span style="color:#F78C6C;">1.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">0</span><span style="color:#C3E88D;">)}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1 比较大小： 大于</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39; compareTo is : \${</span><span style="color:#F78C6C;">1.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">2</span><span style="color:#C3E88D;">)}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -1 比较大小： 小于</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,7),C=[e,c,r];function y(A,D,i,F,d,E){return l(),o("div",null,C)}const u=a(t,[["render",y]]);export{h as __pageData,u as default};
