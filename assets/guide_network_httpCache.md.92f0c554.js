import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.634f3122.js";const C=JSON.parse('{"title":"网络","titleTemplate":"前端缓存","description":"","frontmatter":{"title":"网络","titleTemplate":"前端缓存"},"headers":[],"relativePath":"guide/network/httpCache.md","lastUpdated":1691161495000}'),o={name:"guide/network/httpCache.md"},e=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言 {#前言}&quot;">​</a></h2><p>大家好！我是程序员小易！这是我的第一篇文章，一些的不足或描述不清晰是地方，欢迎大家评论区指正。一起学习、一起进步！</p><hr><p><strong>本文：</strong> 介绍了什么是http缓存、优先级、优缺点及代码实现</p><p><strong>资源</strong>：可以是访问过的静态资源（css、js、图片、页面、时效不高的接口）</p><p><strong>分类</strong>：服务器缓存、CDN缓存、http缓存</p><h3 id="我们为什么需要http缓存" tabindex="-1">我们为什么需要http缓存？ <a class="header-anchor" href="#我们为什么需要http缓存" aria-label="Permalink to &quot;我们为什么需要http缓存？&quot;">​</a></h3><pre><code>因为缓存可以节省网络资源、提高网页性能、降低服务器压力
</code></pre><h3 id="什么是http缓存" tabindex="-1">什么是http缓存 <a class="header-anchor" href="#什么是http缓存" aria-label="Permalink to &quot;什么是http缓存&quot;">​</a></h3><p>HTTP缓存是指在客户端（如浏览器）或者代理服务器（如CDN）中存储之前获取的Web资源的副本，当客户端或代理服务器再次请求该资源时，直接从本地缓存中获取，避免了重复的网络请求和服务器响应。常见的HTTP缓存包括强制缓存和协商缓存。 先上思维导图</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6d722cb3ebc4f66978255108deb2453~tplv-k3u1fbpfcp-watermark.image?" alt="http缓存思路导图.jpg"></p><p>http缓存也称浏览器缓存，就是：服务器通过header头告诉浏览器是否使用缓存，使用什么样的缓存规则？我们先认识一下缓存的优先级和请求头。</p><table><thead><tr><th>优先级</th><th>pragma&gt;Cache-Control&gt;Expire 强缓存&gt;协商缓存（也称弱缓存）</th></tr></thead><tbody><tr><td>pragma</td><td>no-cache，用于请求头，效果和 Cache-control:no-cache 一致</td></tr><tr><td>Last-Modified/if-modified-since</td><td>表示服务器上资源的最后修改时间, 格林尼治时间 前者为响应头、后者为请求头</td></tr><tr><td>ETag/If-None-Match</td><td>表示资源的唯一标识，可以根据文件的内容自定义生成hash;前者为响应头、后者为请求头</td></tr><tr><td></td><td>1、private：私有缓存：指令表明响应只能存储在私有缓存中（例如浏览器中的本地缓存）</td></tr><tr><td></td><td>2、public：共享缓存：客户端和服务器、代理服务器都可以缓存；表示响应可以存储在共享缓存中。带有标头字段的请求的响应Authorization不能存储在共享缓存中；但是，该public指令将导致此类响应存储在共享缓存中</td></tr><tr><td></td><td>3、max-age=seconds:相对时间：响应指令指示响应在生成响应后N秒之前保持新</td></tr><tr><td></td><td>4、s-maxage: 指令还指示响应的新鲜时间（类似于max-age） - 但它特定于共享缓存，max-age当它存在时它们将被忽略</td></tr><tr><td>Cache-Control</td><td>5no-cache: 响应可以存储在缓存中，但响应必须在每次重用之前与源服务器进行验证，即使缓存与源服务器断开连接也是如此</td></tr><tr><td></td><td>6、no-store: 所以内容都不会被缓存，强制缓存和协商缓存也不会触发</td></tr><tr><td></td><td>7、no-transform: 代理不可更改媒体类型</td></tr><tr><td></td><td>8、must-revalidate</td></tr><tr><td></td><td>9、proxy-revalidate</td></tr><tr><td></td><td>10、min-fresh</td></tr><tr><td></td><td>11、max-stale</td></tr></tbody></table><h2 id="http缓存流程" tabindex="-1">http缓存流程 <a class="header-anchor" href="#http缓存流程" aria-label="Permalink to &quot;http缓存流程 {#http缓存流程}&quot;">​</a></h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc17bf22cba149a6b019c735ad16f6f7~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="怎样实现http缓存" tabindex="-1">怎样实现http缓存 <a class="header-anchor" href="#怎样实现http缓存" aria-label="Permalink to &quot;怎样实现http缓存 {#怎样实现http缓存}&quot;">​</a></h2><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>这里使用 node 简单地搭建了个服务器，使用了node的fs模块和crypto模块</p><h4 id="crypto" tabindex="-1">crypto <a class="header-anchor" href="#crypto" aria-label="Permalink to &quot;crypto&quot;">​</a></h4><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> crypto </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">crypto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> hash </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> crypto</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createHash</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md5</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &#39;md5&#39; | &#39;sha1&#39; | &#39;sha256&#39; | &#39;ha512&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">hash</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">update</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 传入我们要生成hash 的内容</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> hash</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">digest</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hex</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &#39;bin&#39; | &#39;base64&#39; 按照指定的格式进行加密</span></span>
<span class="line"></span></code></pre></div><p><code>fs</code></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 引入fs模块</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> stats </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">statSync</span><span style="color:#A6ACCD;">(path)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 通过传入路径，同步读取系统文件信息[修改时间、文件大小]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// fs.stat(path, callback); // 异步读取，回调形式处理，读取结果</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1.stats.isFile(): 如果是文件则返回true,否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.stats.isDirectiory(): 如果是目录则返回true,否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3.stats.isBlockDevice(): 如果是块设备则返回true，否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4.stats.isCharacterDevice(): 如果是字符设备返回true,否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5.stats.isSymbolicLink(): 如果是软链接返回true,否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 6.stats.isFIFO(): 如果是FIFO,则返回true,否则返回false.FIFO是UNIX中的一种特殊类型的命令管道</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 7.stats.isSocket(): 如果是Socket则返回true,否则返回false;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 8.stats.size(): 文件的大小（以字节为单位）。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(path)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 同步读取 文件</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// fs.readFile(path,callback); // 异步读取文件</span></span>
<span class="line"></span></code></pre></div><p><code>服务器</code></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c93eb6eaaa143b8ae3357b73132c4ab~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><code>读取资源：</code></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01e61807a3554f548addc57873b3a00f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="强制缓存" tabindex="-1">强制缓存 <a class="header-anchor" href="#强制缓存" aria-label="Permalink to &quot;强制缓存 {#强制缓存}&quot;">​</a></h2><p>强缓存主要使用<code>Expires</code>、<code>Cache-Control</code> 两个头字段，两者同时存在<code>Cache-Control</code>优先级更高。当命中强缓存的时候，客户端不会再求，直接从缓存中读取内容，并返回HTTP状态码<code>200</code>。这里就是无论 服务端的资源有没有发生改变，没有过期之前，都不会重新发送请求。</p><h4 id="expires" tabindex="-1">Expires <a class="header-anchor" href="#expires" aria-label="Permalink to &quot;Expires&quot;">​</a></h4><p>Expires：绝对时间，表明直到这个时间为止，都不需要找我。注意避坑：时间格式为：格林尼治时间：GMT。这是http1.0的产物，存在问题，所以在1.1版本推出了Cache-Control。<br> 先来看代码的实现：在请求<code>index.css</code>的时候给设置了<code>Expires</code>请求头。下面是第一请求<code>index.css</code>和第一次请求的浏览器截图。第一次请求图片，返回的状态码是200。表示改资源是从服务器读取的。</p><p><code>设置Expires</code></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Expires</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">(now </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dca2310b83c1422a9ecaa053228da26f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>我们再看看第二次请求和第三次请求，状态码也是为200，但是服务器实际上没有接收到请求。读的是磁盘里面的缓存。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c5f7d57898d497aabc3656f02c60516~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h4 id="expires的不足" tabindex="-1">Expires的不足 <a class="header-anchor" href="#expires的不足" aria-label="Permalink to &quot;Expires的不足&quot;">​</a></h4><p>看到这，是不是觉得<code>Expires</code>太好用了，为什么还要在http1.1中新增<code>Cache-Control</code>?你可能想问：那如果资源设置了一个很长的过期时间，比如1年，但是期间，该资源被改变了，而前端是无感知的，前端还在用着旧版本。解决方案？请求资源拼上 版本号、时间戳等手段，就可以了。最致命的问题是：过期时间设置的是一个绝对时间，它没有发请求，在本地判断是否过期，用的客户端的时间和响应的<code>Expires</code>做判断。那么问题就来了：假如客户端的时间被修改了、就算时间没有被修改，也存在跨时区问题，不就乱套了么？所以<code>Cache-Control</code>还是很有必要滴。</p><h4 id="cache-control" tabindex="-1">Cache-Control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-Control&quot;">​</a></h4><p>：相对时间, 响应后N秒，资源保持新鲜，如1分钟之内，都不要找我，max-age=&quot;60&quot;,单位为秒、我们通过<code>max-age</code>设置的强制缓存,<code>header</code>头代码如下</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">max-age=120</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> )</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5976280e4eaf46b5ad8419512568bab6~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d7aa19c24194272b9b9def4a90de073~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 由上图可知：设置了max-age 在没有到期之前，服务器也是没有接收到请求 的，直接在前端拿的缓存，并且返回的是<code>200</code>，接下来，去看看协商缓存。</p><h2 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存 {#协商缓存}&quot;">​</a></h2><p>协商缓存：顾名思义，它没有强制缓存那么硬气，需要去和服务端协商，到底用缓存？还是重新访问资源？协商缓存是希望通过对比文件的最后一次修改时间、文件内容hash来判断。这里涉及的两组header头：</p><h4 id="last-modified-if-modify-since" tabindex="-1">Last-Modified / If-Modify-Since <a class="header-anchor" href="#last-modified-if-modify-since" aria-label="Permalink to &quot;Last-Modified / If-Modify-Since&quot;">​</a></h4><p>表示：服务器对资源文件的最后一次修改时间</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fileModifyTime </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">statSync</span><span style="color:#A6ACCD;">(url)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ctime</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 拿到系统文件修改时间</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no-cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">last-modified</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> fileModifyTime)</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c17e897b250d4841a33117a5c19c007f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d35c5b95d2fc468ba975cfcd1eb786e8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 第二次请求的时候，请求头携带了<code>if-modified-since</code>，就是第一次请求响应头的<code>last-modified</code>,服务器通过重新获取文件的最后一次修改时间，来对比。对比结果：文件未被修改，所以我们可以发现状态码为<code>304</code>，服务器也接收到了请求，这时候可能就有疑问了，协商缓存都又请求了一次，还不是浪费了网络资源，答案是：是！但是又不全是，因为，服务器是接收到请求了，也做了判断，但是结果是，可以继续使用缓存，所以服务器的响应体，并没有把资源返回给前端，<strong>资源还是从前端的缓存中读取的</strong></p><h4 id="last-modified的不足" tabindex="-1">Last-Modified的不足 <a class="header-anchor" href="#last-modified的不足" aria-label="Permalink to &quot;Last-Modified的不足&quot;">​</a></h4><p>前面的<code>Expires</code>遗留的，客户端时间可能被修改的问题，那么加上<code>Last-Modified</code>在服务器判断该文件的最后修改时间，这下应该没有啥问题了吧？还是会存在两个问题：<br> 1、<code>Last-Modified</code>颗粒度是秒级的，操作该文件资源的时间如果是毫秒、甚至纳秒，那不是也完犊子了么？<br> 2、我就是不改文件内容，我只把文件的最后修改时间改了，欸，干得漂亮！！！所以这时候我们就不得不引出另一组<code>header</code>头了。</p><h4 id="etag" tabindex="-1">ETag <a class="header-anchor" href="#etag" aria-label="Permalink to &quot;ETag&quot;">​</a></h4><p>强<code>ETag</code>生成hash字符串 需要大量的算法计算,根据文件的内容生成，如果文件几个G，那就。。。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e82674dd384eaf94f87dc852aa11cb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> <br> 弱<code>ETag</code>表现形式就是<code>W/ +hash</code>, W的大小写敏感，弱<code>Etag</code>一般：文件最后修改时间+时间戳+部分内容生成<code>hash</code>\\</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8374519bc7b648d795d7ceada56ea5a0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br><strong>ETag是可以根据场景自定义</strong><br><code>ETag</code>\uFEFF =》<code>If-None-Match</code>表示资源内容是否被更改，一般为<code>hash</code>值<br><code>设置ETag头</code>\\</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no-cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">etag</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> etag)</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11fff46309904082a806280e3913d11d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br> 这里我们发现，第一次请求，响应头里面有了<code>etag</code>,是个<code>hash</code>值, 状态码为<code>200</code></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddcd35676c654105b6caf945bfd7ff03~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br> 我们第二次请求时，服务器接收到了请求，通过请求头携带的<code>if-modified-since </code>也就是第一次请求的响应头<code>etag</code>,对比结果为一致，表明，该资源未发生变化，所以可以继续使用缓存。这时候，小伙伴们可能又问了：<code>etag</code>是怎么生成的<code>hash</code>值，怎么确保这个<code>hash</code>值，没有改变，内容就一定没有发生改变呀？我们先放放，先来看看缓存优先级的问题。</p><h3 id="缓存优先级的校验" tabindex="-1">缓存优先级的校验 <a class="header-anchor" href="#缓存优先级的校验" aria-label="Permalink to &quot;缓存优先级的校验&quot;">​</a></h3><h4 id="_1、expires-和etag" tabindex="-1">1、Expires 和ETag <a class="header-anchor" href="#_1、expires-和etag" aria-label="Permalink to &quot;1、Expires 和ETag&quot;">​</a></h4><p><code>Expires 和ETag</code>\\</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> hash </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> crypto</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createHash</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md5</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> etag </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> hash</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">update</span><span style="color:#A6ACCD;">(fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(url))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">digest</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hex</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (headers</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-none-match</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">] ) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">headers</span><span style="color:#89DDFF;">?.</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-none-match</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">etag</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">statusCode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">304</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Expires</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">(now </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">etag</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> etag)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ffa9108ff6a4c4489c0e3c21ce84f2f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br> 上图为请求<code>img3</code>图片的结果图，响应头同时设置了<code>Etag</code>和<code>Expires</code>，第一次请求走到了服务器，第二次就取的缓存了。<code>Expires</code>强制缓存优先级 大于<code>Etag</code>协商缓存。当然<code>Expires</code>和<code>last-modified</code>也是一样的结果，我这里就不做演示了。</p><h4 id="_2、expires-和-cache-control" tabindex="-1">2、Expires 和 Cache-Control <a class="header-anchor" href="#_2、expires-和-cache-control" aria-label="Permalink to &quot;2、Expires 和 Cache-Control&quot;">​</a></h4><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Expires</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">(now </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no-cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7902e43094644cd483619f1686032a65~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br> 从代码来看，我同时设置了<code>Expires</code>和<code>Cache-Control</code>，强制缓存给的 5分钟后过期，<code>Cache-Control:&#39;no-cache&#39;</code>给的是每次使用缓存都去服务端校验，请求了两次，后端接收到了两次请求，说明，<code>Cache-Control</code>优先级是比<code>Expires</code>高的。</p><h4 id="_3、max-age-和-etag" tabindex="-1">3、max-age 和 etag <a class="header-anchor" href="#_3、max-age-和-etag" aria-label="Permalink to &quot;3、max-age 和 etag&quot;">​</a></h4><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> hash </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> crypto</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createHash</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md5</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> etag </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> hash</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">update</span><span style="color:#A6ACCD;">(fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(url))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">digest</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hex</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (headers</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-none-match</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">] ) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">headers</span><span style="color:#89DDFF;">?.</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-none-match</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">etag</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">statusCode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">304</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">max-age=120</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">etag</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> etag)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a4c1a92b48417cbde50660c5d7d83c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"><br> 同时设的<code>max-age=120</code>，也就是强制缓存2分钟，然后又设置了<code>Etag</code>，每次请求的状态码都为<code>200</code>。并且服务器只在第一次接收到了请求，后续的多次都是从缓存中取的，这里验证了：强制缓存优先级高于协商缓存。</p><h2 id="源码地址" tabindex="-1">源码地址 <a class="header-anchor" href="#源码地址" aria-label="Permalink to &quot;源码地址 {#源码地址}&quot;">​</a></h2><p><a href="https://github.com/xiaoyi1255/cache" target="_blank" rel="noreferrer">xiaoyi1255/cache</a></p><h2 id="结论" tabindex="-1">结论 <a class="header-anchor" href="#结论" aria-label="Permalink to &quot;结论 {#结论}&quot;">​</a></h2><ol><li>强制缓存 &gt; 协商缓存</li><li>Cache-Control &gt; Expires</li></ol><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考 {#思考}&quot;">​</a></h2><ol><li>缓存是存在浏览器端的，那具体是存在什么位置的呢？</li><li>缓存在<code>memory cache</code>和<code>disk cache</code>有什么区别，什么场景使用那种？</li><li>serviceWorker 又是什么？</li></ol>`,74),l=[e];function t(c,r,i,y,D,F){return a(),n("div",null,l)}const A=s(o,[["render",t]]);export{C as __pageData,A as default};
