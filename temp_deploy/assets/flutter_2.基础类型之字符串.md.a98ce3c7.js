import{_ as n,o as l,c as t,x as s,a,Q as o}from"./chunks/framework.634f3122.js";const f=JSON.parse('{"title":"Dart 语法","titleTemplate":"基础数据类型","description":"","frontmatter":{"title":"Dart 语法","titleTemplate":"基础数据类型"},"headers":[],"relativePath":"flutter/2.基础类型之字符串.md","lastUpdated":1691148616000}'),p={name:"flutter/2.基础类型之字符串.md"},e=s("h2",{id:"前言",tabindex:"-1"},[a("前言 "),s("a",{class:"header-anchor",href:"#前言","aria-label":'Permalink to "前言 {#前言}"'},"​")],-1),r=s("h2",{id:"Dart",基础类型之字符串:"",tabindex:"-1"},[a("Dart 基础类型之字符串 "),s("a",{class:"header-anchor",href:"#Dart","aria-label":'Permalink to "Dart 基础类型之字符串 {#Dart 基础类型之字符串}"'},"​")],-1),c=o(`<h2 id="常用属性" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性" aria-label="Permalink to &quot;常用属性 {#常用属性}&quot;">​</a></h2><table><thead><tr><th>属性</th><th>返回值</th></tr></thead><tbody><tr><td>hashCode</td><td>hashCode</td></tr><tr><td>isEmpty</td><td>是否为空字符串</td></tr><tr><td>isNotEmpty</td><td>是否不为空</td></tr><tr><td>length</td><td>长度</td></tr><tr><td>runtimeType</td><td>类型</td></tr><tr><td>codeUnits</td><td>unicode 码</td></tr></tbody></table><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">str_prop</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 属性</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">str_prop</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39; xiaoyi小易 &#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;str is $</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;hashCode: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">hashCode</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 243523189</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;isEmpty: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isEmpty</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false 是否为空字符串</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;isNotEmpty: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">isNotEmpty</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true 是否不为空</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;length: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">length</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 10 长度</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;runtimeType: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">runtimeType</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// String 类型</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#C3E88D;">&#39;codeUnits: \${</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;font-style:italic;">codeUnits</span><span style="color:#C3E88D;">}&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// [32, 120, 105, 97, 111, 121, 105, 23567, 26131, 32] unicode码</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="常用方法" tabindex="-1">常用方法 <a class="header-anchor" href="#常用方法" aria-label="Permalink to &quot;常用方法 {#常用方法}&quot;">​</a></h2><table><thead><tr><th>方法</th><th>返回值</th></tr></thead><tbody><tr><td>trim</td><td>去掉两边空格</td></tr><tr><td>trimLeft</td><td>去掉左边空格</td></tr><tr><td>trimRight</td><td>去掉右边空格</td></tr><tr><td>runes.toList</td><td>转成数组的unicode</td></tr><tr><td>allMatches</td><td>根据正则匹配子串</td></tr><tr><td>toUpperCase</td><td>将字符串转换为大写</td></tr><tr><td>toLowerCase</td><td>将字符串转换为小写</td></tr><tr><td>substring(start, end)</td><td>根据开始和结束索引（结束索引不包含在内）</td></tr><tr><td>split</td><td>将字符串拆分为子字符串列表，根据指定的分隔符</td></tr><tr><td>compareTo()</td><td>比较两个字符串，返回一个整数来指示它们在字典中的顺序关系</td></tr><tr><td>contains</td><td>是否包含指定的子字符串</td></tr><tr><td>endsWith</td><td>检查字符串是否以指定的后缀结尾，返回布尔值</td></tr><tr><td>startsWith</td><td>检查字符串是否以指定的前缀缀开头，返回布尔值</td></tr><tr><td>indexOf</td><td>指定子串首次出现的索引，没有返回-1</td></tr><tr><td>lastIndexOf</td><td>指定子串最后出现的索引，没有返回-1</td></tr><tr><td>padLeft(length, &#39;xx&#39;)</td><td>字符串左边填充指定 字符串，以达指定长度</td></tr><tr><td>padRight</td><td>字符串右边边填充指定 字符串，以达指定长度</td></tr></tbody></table><h3 id="_1-去掉空格-【trim-trimleft-trimright】" tabindex="-1">1. 去掉空格 【trim\\trimLeft\\trimRight】 <a class="header-anchor" href="#_1-去掉空格-【trim-trimleft-trimright】" aria-label="Permalink to &quot;1.  去掉空格 【trim\\trimLeft\\trimRight】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39; xiaoyi小易 &#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trim</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &#39;xiaoyi小易&#39; 去掉两边空格</span></span>
<span class="line"><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trimLeft</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &#39;xiaoyi小易 &#39; 去掉左边空格</span></span>
<span class="line"><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trimRight</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &#39; xiaoyi小易&#39; 去掉右边空格</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-正则匹配子串-【allmatches】" tabindex="-1">2. 正则匹配子串 【allMatches】 <a class="header-anchor" href="#_2-正则匹配子串-【allmatches】" aria-label="Permalink to &quot;2. 正则匹配子串 【allMatches】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39;apple banana apple orange apple pear&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 创建正则表达式对象</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">RegExp</span><span style="color:#A6ACCD;"> regex </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RegExp</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">r&#39;apple&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 使用 allMatches 方法查找所有匹配项</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Iterable</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">Match</span><span style="color:#A6ACCD;">&gt; matches </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> regex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">allMatches</span><span style="color:#A6ACCD;">(text)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 遍历匹配项并打印结果</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">Match</span><span style="color:#A6ACCD;"> match </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> matches) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> start </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> match</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">start</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 匹配项在原始字符串中的起始索引</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> end </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> match</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">end</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 匹配项在原始字符串中的结束索引（不包含）</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> matchedString </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> match</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">group</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">??</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39;&#39;</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 匹配的子字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&#39;Matched String: $</span><span style="color:#A6ACCD;font-style:italic;">matchedString</span><span style="color:#C3E88D;">, Start: $</span><span style="color:#A6ACCD;font-style:italic;">start</span><span style="color:#C3E88D;">, End: $</span><span style="color:#A6ACCD;font-style:italic;">end</span><span style="color:#C3E88D;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-转大小写-【touppercase-tolowercase】" tabindex="-1">3. 转大小写 【toUpperCase\\toLowerCase】 <a class="header-anchor" href="#_3-转大小写-【touppercase-tolowercase】" aria-label="Permalink to &quot;3. 转大小写 【toUpperCase\\toLowerCase】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Dart Programming&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> uppercaseText </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUpperCase</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;DART PROGRAMMING&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> lowercaseText </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toLowerCase</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;dart programming&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-提取子字符串-根据开始和结束索引-【substring】" tabindex="-1">4. 提取子字符串，根据开始和结束索引 【substring】 <a class="header-anchor" href="#_4-提取子字符串-根据开始和结束索引-【substring】" aria-label="Permalink to &quot;4.  提取子字符串，根据开始和结束索引 【substring】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Dart Programming&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> substring1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substring</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;Programming&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> substring2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substring</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;Prog&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_5-将字符串拆分为子字符串列表-根据指定的分隔符-【split】" tabindex="-1">5. 将字符串拆分为子字符串列表，根据指定的分隔符 【split】 <a class="header-anchor" href="#_5-将字符串拆分为子字符串列表-根据指定的分隔符-【split】" aria-label="Permalink to &quot;5.  将字符串拆分为子字符串列表，根据指定的分隔符 【split】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> fruits </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;apple,banana,orange&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">List</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;">&gt; fruitList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fruits</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;,&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// [&quot;apple&quot;, &quot;banana&quot;, &quot;orange&quot;]</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_6-比较两个字符串-返回一个整数来指示它们在字典中的顺序关系-【compareto】" tabindex="-1">6. 比较两个字符串，返回一个整数来指示它们在字典中的顺序关系 【compareTo】 <a class="header-anchor" href="#_6-比较两个字符串-返回一个整数来指示它们在字典中的顺序关系-【compareto】" aria-label="Permalink to &quot;6. 比较两个字符串，返回一个整数来指示它们在字典中的顺序关系 【compareTo】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> str1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;apple&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> str2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;banana&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> str1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#A6ACCD;">(str2)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -1，因为 &quot;apple&quot; 在 &quot;banana&quot; 之前</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> str2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#A6ACCD;">(str1)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1，因为 &quot;apple&quot; 在 &quot;banana&quot; 之后</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> str2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">compareTo</span><span style="color:#A6ACCD;">(str2)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 0</span></span>
<span class="line"></span></code></pre></div><h3 id="_7-是否包含指定的子字符串-【contains】" tabindex="-1">7. 是否包含指定的子字符串 【contains】 <a class="header-anchor" href="#_7-是否包含指定的子字符串-【contains】" aria-label="Permalink to &quot;7. 是否包含指定的子字符串 【contains】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Hello, World!&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> containsHello </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">contains</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Hello&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> containsDart </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">contains</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Dart&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_8-检查字符串是否以指定的后缀结尾-前缀开头-【endswith-startswith】" tabindex="-1">8. 检查字符串是否以指定的后缀结尾|前缀开头 【endsWith\\startsWith】 <a class="header-anchor" href="#_8-检查字符串是否以指定的后缀结尾-前缀开头-【endswith-startswith】" aria-label="Permalink to &quot;8. 检查字符串是否以指定的后缀结尾|前缀开头 【endsWith\\startsWith】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Hello, Dart!&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> startsWithHello </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">startsWith</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Hello&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> startsWithHey </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">startsWith</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Hey&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_9-字符串中第一次-最后一次出现指定子字符串的索引位置-没有返回-1-【indexof-lastindexof】" tabindex="-1">9. 字符串中第一次|最后一次出现指定子字符串的索引位置，没有返回-1 【indexOf\\lastIndexOf】 <a class="header-anchor" href="#_9-字符串中第一次-最后一次出现指定子字符串的索引位置-没有返回-1-【indexof-lastindexof】" aria-label="Permalink to &quot;9. 字符串中第一次|最后一次出现指定子字符串的索引位置，没有返回-1 【indexOf\\lastIndexOf】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Dart is fun, Dart is cool!&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> indexOfDart </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Dart&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 0</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> indexOfIs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;is&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 5</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> indexOfFlutter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Flutter&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -1，因为找不到该子字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> lastIndexOfDart </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">lastIndexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Dart&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 15</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> lastIndexOfIs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">lastIndexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;is&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 17</span></span>
<span class="line"><span style="color:#FFCB6B;">int</span><span style="color:#A6ACCD;"> lastIndexOfFlutter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">lastIndexOf</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Flutter&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// -1，因为找不到该子字符串</span></span>
<span class="line"></span></code></pre></div><h3 id="_10-在字符串的左侧-或右侧-填充指定字符-使字符串达到指定的长度-【padleft-padright】" tabindex="-1">10. 在字符串的左侧（或右侧）填充指定字符，使字符串达到指定的长度 【padLeft / padRight】 <a class="header-anchor" href="#_10-在字符串的左侧-或右侧-填充指定字符-使字符串达到指定的长度-【padleft-padright】" aria-label="Permalink to &quot;10. 在字符串的左侧（或右侧）填充指定字符，使字符串达到指定的长度 【padLeft / padRight】&quot;">​</a></h3><div class="language-dart"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;Dart&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> paddedLeft </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">padLeft</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;-&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;------Dart&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> paddedRight </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">padRight</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;.&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &quot;Dart......&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,25),y=[e,r,c];function C(D,A,i,F,d,h){return l(),t("div",null,y)}const g=n(p,[["render",C]]);export{f as __pageData,g as default};
