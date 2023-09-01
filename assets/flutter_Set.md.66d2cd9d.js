import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1456bef9.js";const i=JSON.parse('{"title":"Dart 语法","titleTemplate":"Set","description":"","frontmatter":{"title":"Dart 语法","titleTemplate":"Set"},"headers":[],"relativePath":"flutter/Set.md","lastUpdated":1691568546000}'),p={name:"flutter/Set.md"},o=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言 {#前言}&quot;">​</a></h2><ul><li>Set 是一种集合数据结构，用于存储一组唯一的元素，其中重复的元素将被自动忽略。与 List 不同，Set 中的元素没有固定的顺序</li></ul><h2 id="常用属性" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性" aria-label="Permalink to &quot;常用属性 {#常用属性}&quot;">​</a></h2><ul><li>length 长度</li><li>first 第一项</li><li>last 最后一项</li><li>isEmpty 空</li><li>isNotEmpty 不为空</li><li>runtimeType 类型</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> len </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> first </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">first</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> last </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">last</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> isEmpty </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">isEmpty</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> isNotEmpty </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">isNotEmpty</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> runtimeType </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">runtimeType</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//  _Set&lt;int&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="增删查" tabindex="-1">增删查 <a class="header-anchor" href="#增删查" aria-label="Permalink to &quot;增删查 {#增删查}&quot;">​</a></h2><ul><li>add\\addAll 新增</li><li>remove、removeAll、removeWhere 删除</li><li>elementAt(index) 查</li><li>clear() 清空</li><li>Set 本身是不会重复的所以一般不存在改，要么新增 要么删除</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 新增</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3, 4}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3, 4, 5, 6}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">remove</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3, 4, 5}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {3, 4, 5}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeWhere</span><span style="color:#A6ACCD;">((item) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> item </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {4, 5}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">elementAt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 4</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">clear</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {}</span></span>
<span class="line"></span></code></pre></div><h2 id="常用循环" tabindex="-1">常用循环 <a class="header-anchor" href="#常用循环" aria-label="Permalink to &quot;常用循环 {#常用循环}&quot;">​</a></h2><ul><li>map 返回新对象</li><li>every 是否每一项都满足条件 返回 bool</li><li>any 任意一项满足条件 返回 bool</li><li>fold(initval, (pre.cur)=&gt; pre+xur) 带初始值做累加累乘等</li><li>reduce( (pre.cur)=&gt; pre+xur) 做累加累乘等</li><li>for 循环 set.elementAt(index)</li><li>for in 循环</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#A6ACCD;">(print)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1 2 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">((e) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> e </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toSet</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {2, 4, 6}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> b1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">every</span><span style="color:#A6ACCD;">((element) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> element </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> b2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">any</span><span style="color:#A6ACCD;">((element) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> element </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> b3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fold</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> (pre</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> cur) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> pre </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> cur)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 106</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> b4 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#A6ACCD;">((pre</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> cur) </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> pre </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> cur)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">elementAt</span><span style="color:#A6ACCD;">(i))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// // 1 2 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> item </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> s1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(item)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1 2 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="contains、containsAll" tabindex="-1">contains、containsAll <a class="header-anchor" href="#contains、containsAll" aria-label="Permalink to &quot;contains、containsAll {#contains、containsAll}&quot;">​</a></h2><ul><li>contains(item) 是否包含某个元素 返回 bool</li><li>containsAll({1,2,3}) 是否包含所有元素 返回bool</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> b1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">contains</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> b2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">contains</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> b3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">containsAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> b4 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">containsAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="difference" tabindex="-1">difference <a class="header-anchor" href="#difference" aria-label="Permalink to &quot;difference {#difference}&quot;">​</a></h2><ul><li>difference({})找出和另一个set对象不同的元素</li><li>(自己有，别的没有)</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> d1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">difference</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 3}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> d2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">difference</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {3}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> d3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">difference</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> d4 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">difference</span><span style="color:#A6ACCD;">({})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3}</span></span>
<span class="line"></span></code></pre></div><h2 id="elementAt" tabindex="-1">elementAt <a class="header-anchor" href="#elementAt" aria-label="Permalink to &quot;elementAt {#elementAt}&quot;">​</a></h2><ul><li>elementAt(index) 通过索引访问元素</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> item1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">elementAt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> item2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">elementAt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//RangeError (index): Index out of range: index should be less than 3: 3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// final item3 = s1.elementAt(3); // 索引越界 报错</span></span>
<span class="line"></span></code></pre></div><h2 id="intersection" tabindex="-1">intersection <a class="header-anchor" href="#intersection" aria-label="Permalink to &quot;intersection {#intersection}&quot;">​</a></h2><ul><li>s1.intersection(s2)</li><li>创建一个 set1 和 set2 共同元素组成的新set对象</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">intersection</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> s3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">intersection</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> s4 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">intersection</span><span style="color:#A6ACCD;">({})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {}</span></span>
<span class="line"></span></code></pre></div><h2 id="retainAll" tabindex="-1">retainAll <a class="header-anchor" href="#retainAll" aria-label="Permalink to &quot;retainAll {#retainAll}&quot;">​</a></h2><ul><li>s1.retainAll(s2)</li><li>s1中只保留与s2共有的元素</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retainAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// s1: {1, 2, 3}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retainAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// s1: {1, 2}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retainAll</span><span style="color:#A6ACCD;">({</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// s1: {1}</span></span>
<span class="line"><span style="color:#A6ACCD;">  s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retainAll</span><span style="color:#A6ACCD;">({})</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// s1: {}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="join" tabindex="-1">join <a class="header-anchor" href="#join" aria-label="Permalink to &quot;join {#join}&quot;">​</a></h2><ul><li>s1.join(&#39;xx&#39;)</li><li>s1 通过 &#39;xx&#39; 拼接成新的字符串</li><li>不影响 原数据</li></ul><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Set</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;">&gt; s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> {</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">}</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;-&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;1-2-3&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> str1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;*&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;1*2*3&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(s1)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// {1, 2, 3}</span></span>
<span class="line"></span></code></pre></div>`,29),e=[o];function t(c,r,C,y,A,D){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};