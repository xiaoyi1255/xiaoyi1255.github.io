import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.793cb3e4.js";const u=JSON.parse('{"title":"bug","titleTemplate":"message","description":"","frontmatter":{"title":"bug","titleTemplate":"message"},"headers":[],"relativePath":"guide/bug/message.md","lastUpdated":1722740948000}'),p={name:"guide/bug/message.md"},e=l(`<h1 id="ant-design-vue的message直接不展示了" tabindex="-1">ant-design-vue的Message直接不展示了？ <a class="header-anchor" href="#ant-design-vue的message直接不展示了" aria-label="Permalink to &quot;ant-design-vue的Message直接不展示了？&quot;">​</a></h1><p><a href="https://github.com/vueComponent/ant-design-vue/issues/6877" target="_blank" rel="noreferrer">官方有issuses:</a></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c1edad9b4a34da0a5d2b8fa996241aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=555&amp;h=339&amp;e=png&amp;b=282c34" alt="image.png"></p><h2 id="环境" tabindex="-1">环境: <a class="header-anchor" href="#环境" aria-label="Permalink to &quot;环境:&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">node:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">16.14.1</span></span>
<span class="line"><span style="color:#FFCB6B;">vue:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">3.2.47</span></span>
<span class="line"><span style="color:#FFCB6B;">nuxt:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">3.2.2</span></span>
<span class="line"><span style="color:#FFCB6B;">ant-design-vue:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">4.0.0</span></span>
<span class="line"><span style="color:#FFCB6B;">pm2:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">5.3.0</span></span>
<span class="line"></span></code></pre></div><h2 id="本地复现" tabindex="-1">本地复现 <a class="header-anchor" href="#本地复现" aria-label="Permalink to &quot;本地复现&quot;">​</a></h2><h3 id="message正常使用" tabindex="-1">message正常使用 <a class="header-anchor" href="#message正常使用" aria-label="Permalink to &quot;message正常使用&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Button</span><span style="color:#89DDFF;"> @click=&quot;openMessage&quot;&gt;打开全局提示&lt;/Button&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;script </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Button </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> from &quot;ant-design-vue&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const openMessage = () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">success</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">什么？老板说杀个程序员去祭天？</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="本地-npm-run-dev-页面展示-正常" tabindex="-1">本地 npm run dev =&gt; 页面展示：正常 <a class="header-anchor" href="#本地-npm-run-dev-页面展示-正常" aria-label="Permalink to &quot;本地 npm run dev =&gt; 页面展示：正常&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7b69fb09b614f21952c06a58b46b41e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1602&amp;h=538&amp;e=gif&amp;f=30&amp;b=fdfcfc" alt="dev.gif"></p><h3 id="使用pm2跑-页面展示不正常" tabindex="-1">使用pm2跑 =&gt; 页面展示不正常 <a class="header-anchor" href="#使用pm2跑-页面展示不正常" aria-label="Permalink to &quot;使用pm2跑 =&gt; 页面展示不正常&quot;">​</a></h3><ul><li>pm2模拟线上环境：出问题了 =&gt; 一看 DOM 生成了<strong>样式错乱</strong></li><li>但是线上是直接不展示 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be6dcf0c04b4b54b4eb5bb1e493aa72~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1901&amp;h=690&amp;e=gif&amp;f=79&amp;b=fefefe" alt="build.gif"></li></ul><h2 id="解决方案1-样式穿透-不靠谱" tabindex="-1">解决方案1：样式穿透(不靠谱) <a class="header-anchor" href="#解决方案1-样式穿透-不靠谱" aria-label="Permalink to &quot;解决方案1：样式穿透(不靠谱)&quot;">​</a></h2><ul><li>这种方式不太靠谱 （因为昨天线上，直接不展示了，而不是漏半个头）</li></ul><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">:where(</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">css-eq3tly</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ant-message</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="终极解决方案" tabindex="-1">终极解决方案 <a class="header-anchor" href="#终极解决方案" aria-label="Permalink to &quot;终极解决方案&quot;">​</a></h2><p>可以在app.vue 加上前置class</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">message</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ant-design-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">config</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">duration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">maxCount</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">rtl</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">prefixCls</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">_message_</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">_message_</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#B2CCD6;">left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ae3dff8424b47fc87ba84bb97982387~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1497&amp;h=690&amp;e=gif&amp;f=81&amp;b=fdfdfd" alt="build2.gif"></p><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>像这类似问题可以网上查：</p><ul><li>自己先本地尝试复现、解决；解决不了再百度</li><li>我这里其实踩了两次坑： <ul><li>第一次就是现在复现的（一半展示在屏幕外）</li><li>第二次线上直接不展示了</li></ul></li><li>git 翻issues(也许其他人也遇到了，，如果没有人提，也可以自己提)</li><li>chatgpt (很多时候不靠谱)</li><li>百度、csdn、stackoverflow</li></ul><p>什么？线上的ant-design-vue的Message坏了？有的只展示了一半，还有完全不展示的！！</p>`,23),o=[e];function t(c,r,i,D,F,y){return a(),n("div",null,o)}const g=s(p,[["render",t]]);export{u as __pageData,g as default};
