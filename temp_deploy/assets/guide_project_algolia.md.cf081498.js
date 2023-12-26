import{_ as a,c as l,o as e,Q as s}from"./chunks/framework.7addaa9c.js";const o="/assets/全局搜索.a4d69564.gif",t="/assets/form1.e53b4b45.png",n="/assets/img1.b475bfac.png",i="/assets/申请成功.ec81cd7c.png",x=JSON.parse('{"title":"项目","titleTemplate":"Algolia","description":"","frontmatter":{"title":"项目","titleTemplate":"Algolia"},"headers":[],"relativePath":"guide/project/algolia.md","lastUpdated":1691161495000}'),r={name:"guide/project/algolia.md"},p=s('<h2 id="效果图" tabindex="-1">效果图 <a class="header-anchor" href="#效果图" aria-label="Permalink to &quot;效果图 {#效果图}&quot;">​</a></h2><p><img src="'+o+'" alt="全局搜索.gif"></p><h2 id="Algolia" tabindex="-1">Algolia <a class="header-anchor" href="#Algolia" aria-label="Permalink to &quot;Algolia {#Algolia}&quot;">​</a></h2><p>Algolia是一家提供搜索和实时数据索引服务的平台，它主要提供了网站内：</p><ul><li>搜索功能</li><li>排序和过滤</li><li>拼写纠正</li><li>模糊匹配</li></ul><h2 id="Algolia接入" tabindex="-1">Algolia接入 <a class="header-anchor" href="#Algolia接入" aria-label="Permalink to &quot;Algolia接入 {#Algolia接入}&quot;">​</a></h2><h2 id="申请" tabindex="-1">申请 <a class="header-anchor" href="#申请" aria-label="Permalink to &quot;申请 {#申请}&quot;">​</a></h2><h4 id="_1-填写申请" tabindex="-1">1.填写申请 <a class="header-anchor" href="#_1-填写申请" aria-label="Permalink to &quot;1.填写申请&quot;">​</a></h4><p><a href="https://docsearch.algolia.com/apply" target="_blank" rel="noreferrer">申请地址</a> 填好申请表，那三个选项都需要勾选一下 <img src="'+t+'" alt="image.png"></p><h4 id="_2-会收到一条邮件" tabindex="-1">2.会收到一条邮件 <a class="header-anchor" href="#_2-会收到一条邮件" aria-label="Permalink to &quot;2.会收到一条邮件&quot;">​</a></h4><p><img src="'+n+'" alt="image1.png"></p><h4 id="_3-静候1-3天会收到申请结果邮件" tabindex="-1">3.静候1-3天会收到申请结果邮件 <a class="header-anchor" href="#_3-静候1-3天会收到申请结果邮件" aria-label="Permalink to &quot;3.静候1-3天会收到申请结果邮件&quot;">​</a></h4><p><img src="'+i+`" alt="image2.png"></p><h4 id="_4-点击同意后填写账号密码什么的" tabindex="-1">4.点击同意后填写账号密码什么的 <a class="header-anchor" href="#_4-点击同意后填写账号密码什么的" aria-label="Permalink to &quot;4.点击同意后填写账号密码什么的&quot;">​</a></h4><p>进去之后还会有一个accept同意的按钮是接受application的，点accept就行了，这里忘记截图了。</p><h4 id="_5-项目开启全局搜索" tabindex="-1">5.项目开启全局搜索 <a class="header-anchor" href="#_5-项目开启全局搜索" aria-label="Permalink to &quot;5.项目开启全局搜索&quot;">​</a></h4><p>这里因为VitePress原先就支持algolia所以直接配置就可以使用了</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">algolia: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    appId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> &#39;xxx&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    apiKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> &#39;xxxx&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    indexName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> &#39;xxxx&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>接下来就开启全局搜索之路了，赶紧试试去吧！</p>`,19),c=[p];function h(d,_,g,m,u,A){return e(),l("div",null,c)}const D=a(r,[["render",h]]);export{x as __pageData,D as default};
