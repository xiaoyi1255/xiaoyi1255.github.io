import{_ as s,c as n,o as a,N as e}from"./chunks/framework.0799945b.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{"theme":"channing-cyan"},"headers":[],"relativePath":"guide/intercept.md","lastUpdated":1688370682000}'),l={name:"guide/intercept.md"},p=e(`<h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p><strong>主题</strong>：本文将接上一篇<a href="https://juejin.cn/post/7205171975647445052" target="_blank" rel="noreferrer">文章</a>，我们接着对 <a href="https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts" target="_blank" rel="noreferrer">Vue3.2.47</a> 拦截工具函数源码的解读。<br><strong>内容</strong>：本文分为三个部分：首先介绍Proxy、Reflect，其次对<strong>get</strong> <strong>set</strong> <strong>deleteProperty</strong> <strong>has</strong> <strong>ownKeys</strong> 等5个拦截函数解读，最后总结及注意事项<br><strong>目的</strong>：手模手深入学习<strong>拦截器</strong>实现原理</p><hr><p><strong>为什么使用Proxy代理使用Reflect进行最终属性的访问和设置？</strong></p><p><strong>为什么结构响应式对象有时会失活有时不会？</strong></p><p><strong>为什么Proxy可以代理整个对象？</strong></p><p>听说带着问题，会使我们阅读源码更轻松？让我们一起在源码中寻找答案！！！</p><hr><h3 id="一、proxy和reflect" tabindex="-1">一、Proxy和Reflect <a class="header-anchor" href="#一、proxy和reflect" aria-label="Permalink to &quot;一、Proxy和Reflect&quot;">​</a></h3><p>如果对ES6的Proxy和Reflect有了解，直接移步源码模块😎</p><p><strong>Proxy</strong> 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）共13个拦截方法，Vue3正是使用它代替了Object.defineProperty，下面简述了其中的几种。</p><p><strong>Reflect</strong> 提供了一系列与对象操作相关的方法，这些方法与 <strong>Object</strong> 上的方法功能类似，但有一些差别,简单来说就是可以通过<strong>Object</strong>和<strong>实例</strong>来操作、获取属性的方法，<strong>Reflect</strong> 都可以实现，优势就是使用它<strong>不会报错</strong>，<strong>不会报错,不会报错,</strong> 会返回 <strong>布尔值</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const obj = {</span></span>
<span class="line"><span style="color:#A6ACCD;">	name: &#39;小易&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">	age: 20</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">const proxyObj = new Proxy(obj, {</span></span>
<span class="line"><span style="color:#A6ACCD;">	get(target, key, receiver) {</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(\`getting \${key} value is \${target[key]}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">		return target[key];</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">	set(target, key, value, receiver) {</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(\`setting \${key} value is \${value}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">		target[key] = value;</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">	deleteProperty(target, key) {</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(target, key);</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(\`deleteProperty key is \${key}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">	ownKeys(target){</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(\`ownKeys target \${target}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">		return Reflect.ownKeys(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">	has(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(\`for in target \${target} key \${key}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">		return Reflect.has(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">proxyObj.name; // getting name value is 小易</span></span>
<span class="line"><span style="color:#A6ACCD;">proxyObj.name = &#39;xiaoyi&#39;; // getting name value is 小易</span></span>
<span class="line"><span style="color:#A6ACCD;">delete proxyObj.age; // deleteProperty key is age</span></span>
<span class="line"><span style="color:#A6ACCD;">Object.keys(proxyObj) // ownKeys target  [object Object] ==&gt; { name: &#39;xiaoyi&#39;, age: 20 }</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;name&#39; in proxyObj // for in target [object Object] key name</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Reflect.get(obj, &#39;age&#39;) // 20  等价于 obj.age</span></span>
<span class="line"><span style="color:#A6ACCD;">Reflect.set(obj, &#39;age&#39;, &#39;19&#39;) // true 等价于 obj.age = &#39;19&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>对于Proxy 和 Reflect 有了一定认识，接下来上主菜😁</p><h3 id="二、源码" tabindex="-1">二、源码 <a class="header-anchor" href="#二、源码" aria-label="Permalink to &quot;二、源码&quot;">​</a></h3><p>我们上一篇讲到，Reactive 代理对象代传了两个 handlers 分别是</p><p><strong>mutableHandlers</strong> 和 <strong>mutableCollectionHandlers</strong></p><h4 id="_1、mutablehandlers" tabindex="-1">1、mutableHandlers <a class="header-anchor" href="#_1、mutablehandlers" aria-label="Permalink to &quot;1、mutableHandlers&quot;">​</a></h4><p><strong>mutableHandlers</strong> 是针对Object 和 Array 对象的拦截工具</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L225-L231</span></span>
<span class="line"><span style="color:#A6ACCD;">const get = /*#__PURE__*/ createGetter()</span></span>
<span class="line"><span style="color:#A6ACCD;">const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()</span></span>
<span class="line"><span style="color:#A6ACCD;">export const mutableHandlers: ProxyHandler&lt;object&gt; = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  get, // 属性获取拦截</span></span>
<span class="line"><span style="color:#A6ACCD;">  set, // 属性是设置拦截</span></span>
<span class="line"><span style="color:#A6ACCD;">  deleteProperty, // 属性删除拦截</span></span>
<span class="line"><span style="color:#A6ACCD;">  has, // in 操作拦截</span></span>
<span class="line"><span style="color:#A6ACCD;">  ownKeys </span></span>
<span class="line"><span style="color:#A6ACCD;">  // 拦截 Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.keys() </span></span>
<span class="line"><span style="color:#A6ACCD;">  // 和 for...in 循环中的 Object.keys() 操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="_1-creategetter" tabindex="-1">1. createGetter <a class="header-anchor" href="#_1-creategetter" aria-label="Permalink to &quot;1. createGetter&quot;">​</a></h5><p><strong>createGetter</strong>是用于创建能够获取响应式对象的<strong>getter</strong>拦截器函数，实现了在<strong>获取响应式数据</strong>时，对该值进行<strong>依赖追踪</strong>功能，以便数据变化时进行视图更新。下面我们来看一下它具体怎么实现的吧😎</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L94-L156</span></span>
<span class="line"><span style="color:#A6ACCD;">// ReactiveFlags：</span></span>
<span class="line"><span style="color:#A6ACCD;">// ● SKIP：该常量表示一个属性是否应该被跳过，不进行响应式处理。</span></span>
<span class="line"><span style="color:#A6ACCD;">// ● IS_REACTIVE：该常量表示一个对象是否已经被转换为响应式对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">// ● IS_READONLY：该常量表示一个对象是否已经被转换为只读的响应式对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">// ● IS_SHALLOW：该常量表示一个对象是否已经被转换为浅层响应式对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">// ● RAW：该常量表示一个响应式对象的原始对象（即未被代理的对象）。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * createGetter 函数</span></span>
<span class="line"><span style="color:#A6ACCD;"> * </span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param {Boolean} isReadonly 是否为只读对象</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param {Boolean} shallow 是否浅层观察对象</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @returns {Function} getter 函数</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">function createGetter(isReadonly = false, shallow = false) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return function get(target: Target, key: string | symbol, receiver: object) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (key === ReactiveFlags.IS_REACTIVE) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      /* 表示一个对象是否已经被转换为响应式对象*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      return !isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (key === ReactiveFlags.IS_READONLY) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      /*表示一个对象是否已经被转换为只读的响应式对象*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      return isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (key === ReactiveFlags.IS_SHALLOW) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      /*表示一个对象是否已经被转换为浅层响应式对象*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      return shallow</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (</span></span>
<span class="line"><span style="color:#A6ACCD;">      key === ReactiveFlags.RAW &amp;&amp; /*表示一个响应式对象的原始对象（即未被代理的对象）*/</span></span>
<span class="line"><span style="color:#A6ACCD;">      receiver ===  /* 从响应式对象缓存中获取对应的源对象*/</span></span>
<span class="line"><span style="color:#A6ACCD;">        (isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">          ? shallow</span></span>
<span class="line"><span style="color:#A6ACCD;">            ? shallowReadonlyMap</span></span>
<span class="line"><span style="color:#A6ACCD;">            : readonlyMap</span></span>
<span class="line"><span style="color:#A6ACCD;">          : shallow</span></span>
<span class="line"><span style="color:#A6ACCD;">          ? shallowReactiveMap</span></span>
<span class="line"><span style="color:#A6ACCD;">          : reactiveMap</span></span>
<span class="line"><span style="color:#A6ACCD;">        ).get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">    ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // shallowReadonlyMap readonlyMap shallowReactiveMap reactiveMap</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 上面这个四个对象是转为响应式用来存（target, proxy）的</span></span>
<span class="line"><span style="color:#A6ACCD;">      // key 是一个对象 并且能在四个 WeakMap 对象中找到，说明target已是响应式，直接返回target</span></span>
<span class="line"><span style="color:#A6ACCD;">      return target</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 判断原对象是否是 数组</span></span>
<span class="line"><span style="color:#A6ACCD;">    const targetIsArray = isArray(target)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!isReadonly) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 数组的特殊处理 判断 key 是否是 arrayInstrumentations 的属性或方法</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (targetIsArray &amp;&amp; hasOwn(arrayInstrumentations, key)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 返回数组中 对应的方法 </span></span>
<span class="line"><span style="color:#A6ACCD;">        // arrayInstrumentations =》 createArrayInstrumentations()</span></span>
<span class="line"><span style="color:#A6ACCD;">        // createArrayInstrumentations函数 返回 instrumentations:{key: Function }</span></span>
<span class="line"><span style="color:#A6ACCD;">        // key: [&#39;includes&#39;, &#39;indexOf&#39;, &#39;lastIndexOf&#39;,&#39;push&#39;, &#39;pop&#39;, &#39;shift&#39;, &#39;unshift&#39;, &#39;splice&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Reflect.get(arrayInstrumentations, key, receiver)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      // hasOwnProperty 特殊处理</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (key === &#39;hasOwnProperty&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return hasOwnProperty</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  	// 通过 Reflect.get 获取对应的 key</span></span>
<span class="line"><span style="color:#A6ACCD;">    const res = Reflect.get(target, key, receiver)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  	// 判断key是否为Symbol，是否在 builtInSymbols 集合中，是否为一些不需要追踪的键</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 不需要追踪的属性 __proto__,__v_isRef,__isVue</span></span>
<span class="line"><span style="color:#A6ACCD;">      return res</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">		// 如果不是只读对象，则进行依赖收集</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!isReadonly) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      track(target, TrackOpTypes.GET, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  	// 如果是浅层响应对象 直接返回属性值</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (shallow) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return res</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  	// 如果是 ref 响应式对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isRef(res)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // ref unwrapping - skip unwrap for Array + integer key.</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 对象是数组类型 并且 key 是整数 索引 返回 本身 否则 返回.value</span></span>
<span class="line"><span style="color:#A6ACCD;">      return targetIsArray &amp;&amp; isIntegerKey(key) ? res : res.value</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isObject(res)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // Convert returned value into a proxy as well. we do the isObject check</span></span>
<span class="line"><span style="color:#A6ACCD;">      // here to avoid invalid value warning. Also need to lazy access readonly</span></span>
<span class="line"><span style="color:#A6ACCD;">      // and reactive here to avoid circular dependency.</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 是对象，并且参数是只读，则创建一个 只读响应式reactive</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 否则 正常创建一个 reactive 响应式对象</span></span>
<span class="line"><span style="color:#A6ACCD;">      return isReadonly ? readonly(res) : reactive(res)</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 其实这里就是递归，把可以是对象的递归创建响应式对象，</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 也就是 结果的key 是对象结构 不会失去响应式的原因</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return res</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L53-L86</span></span>
<span class="line"><span style="color:#A6ACCD;">// 数组处理  __PURE__ 纯净的</span></span>
<span class="line"><span style="color:#A6ACCD;">const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()</span></span>
<span class="line"><span style="color:#A6ACCD;">function createArrayInstrumentations() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const instrumentations: Record&lt;string, Function&gt; = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  // instrument identity-sensitive Array methods to account for possible reactive</span></span>
<span class="line"><span style="color:#A6ACCD;">  // values</span></span>
<span class="line"><span style="color:#A6ACCD;">  ;([&#39;includes&#39;, &#39;indexOf&#39;, &#39;lastIndexOf&#39;] as const).forEach(key =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      const arr = toRaw(this) as any</span></span>
<span class="line"><span style="color:#A6ACCD;">      for (let i = 0, l = this.length; i &lt; l; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        track(arr, TrackOpTypes.GET, i + &#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      // we run the method using the original args first (which may be reactive)</span></span>
<span class="line"><span style="color:#A6ACCD;">      const res = arr[key](...args)</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (res === -1 || res === false) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // if that didn&#39;t work, run it again using raw values.</span></span>
<span class="line"><span style="color:#A6ACCD;">        return arr[key](...args.map(toRaw))</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return res</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  // instrument length-altering mutation methods to avoid length being tracked</span></span>
<span class="line"><span style="color:#A6ACCD;">  // which leads to infinite loops in some cases (#2137)</span></span>
<span class="line"><span style="color:#A6ACCD;">  ;([&#39;push&#39;, &#39;pop&#39;, &#39;shift&#39;, &#39;unshift&#39;, &#39;splice&#39;] as const).forEach(key =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pauseTracking()</span></span>
<span class="line"><span style="color:#A6ACCD;">      const res = (toRaw(this) as any)[key].apply(this, args)</span></span>
<span class="line"><span style="color:#A6ACCD;">      resetTracking()</span></span>
<span class="line"><span style="color:#A6ACCD;">      return res</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  return instrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L37-L46</span></span>
<span class="line"><span style="color:#A6ACCD;">const builtInSymbols = new Set(</span></span>
<span class="line"><span style="color:#A6ACCD;">  /*#__PURE__*/</span></span>
<span class="line"><span style="color:#A6ACCD;">  Object.getOwnPropertyNames(Symbol)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate &#39;arguments&#39; and &#39;caller&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    // but accessing them on Symbol leads to TypeError because Symbol is a strict mode</span></span>
<span class="line"><span style="color:#A6ACCD;">    // function</span></span>
<span class="line"><span style="color:#A6ACCD;">    .filter(key =&gt; key !== &#39;arguments&#39; &amp;&amp; key !== &#39;caller&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    .map(key =&gt; (Symbol as any)[key])</span></span>
<span class="line"><span style="color:#A6ACCD;">    .filter(isSymbol)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="总结-getter函数执行步骤" tabindex="-1">总结 getter函数执行步骤 <a class="header-anchor" href="#总结-getter函数执行步骤" aria-label="Permalink to &quot;总结 getter函数执行步骤&quot;">​</a></h6><p><strong>createGetter(isReadonly = false, shallow = false)</strong></p><ol><li>判断 <strong>key</strong> 是否 属于以下几种情况 <ol><li>已是响应式对象 <strong>返回 !isReadonly</strong></li><li>已是只读响应式对象<strong>返回 isReadonly</strong></li><li>已是浅层响应式对象key是响应式对象的原始对象 <strong>返回 shallow</strong></li><li>并且可以在全局WeakMap响应式对象存储中找到 <strong>返回 target</strong></li></ol></li><li>判断target是否是数组 <ol><li>不是只读 arrayInstrumentations存在key <strong>返回对应的值</strong></li><li>key等于hasOwnProperty     <strong>返回改造后的hasOwnProperty</strong></li></ol></li><li>通过Reflect.get 获取对应value</li><li>key 是Symbol 并 在Symbol集合中或者 是忽略追踪的key 返回 value<br> 忽略的<strong>key</strong>有: <strong>proto,v_isRef,isVue</strong></li><li>不是只读 进行get类型 依赖收集</li><li>是浅层                                             返回value</li><li>value 是一个对象 则进行递归调用reactive</li><li><ol><li>这里很巧妙，依赖是要 进行访问才会收集 如<strong>模板渲染</strong></li><li>换句话说：只有进行了get 操作才会进行依赖收集</li><li>比如你用reactive 声明了一个<strong>嵌套</strong>了<strong>100层</strong>的对象，你实际只使用了2层，那么第三层往后就不会进行依赖收集的</li></ol></li><li>最后返回 <strong>value</strong></li></ol><h5 id="_2-createsetter" tabindex="-1">2.createSetter <a class="header-anchor" href="#_2-createsetter" aria-label="Permalink to &quot;2.createSetter&quot;">​</a></h5><p><strong>createSetter</strong>函数是一个用于创建能够拦截响应式对象修改属性的<strong>setter</strong>拦截器函数，能在修改响应式数据时，拦截这个操作并响应式更新。下面我们一起来瞅瞅它是如何实现的</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L161-L200</span></span>
<span class="line"><span style="color:#A6ACCD;">function createSetter(shallow = false) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return function set(</span></span>
<span class="line"><span style="color:#A6ACCD;">    target: object,</span></span>
<span class="line"><span style="color:#A6ACCD;">    key: string | symbol,</span></span>
<span class="line"><span style="color:#A6ACCD;">    value: unknown,</span></span>
<span class="line"><span style="color:#A6ACCD;">    receiver: object</span></span>
<span class="line"><span style="color:#A6ACCD;">  ): boolean {</span></span>
<span class="line"><span style="color:#A6ACCD;">    let oldValue = (target as any)[key] /*通过key 获取旧值*/</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isReadonly(oldValue) &amp;&amp; isRef(oldValue) &amp;&amp; !isRef(value)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 旧值是 只读 并且是 ref 并且设置的 新值 不是ref 不允许修改</span></span>
<span class="line"><span style="color:#A6ACCD;">      return false</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!shallow) { // 不是浅层响应式</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!isShallow(value) &amp;&amp; !isReadonly(value)) { // 新值不是浅响应式和只读</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldValue = toRaw(oldValue) // 旧值 通过toRaw 转为原始值</span></span>
<span class="line"><span style="color:#A6ACCD;">        value = toRaw(value) // 新值通过 toRaw 转为原始值</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!isArray(target) &amp;&amp; isRef(oldValue) &amp;&amp; !isRef(value)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 对象不是数组、旧值是ref、新值不是ref </span></span>
<span class="line"><span style="color:#A6ACCD;">        // ===&gt;说明它原来是ref 直接像修改ref 值的方式进行设置 并返回设置成功</span></span>
<span class="line"><span style="color:#A6ACCD;">        oldValue.value = value</span></span>
<span class="line"><span style="color:#A6ACCD;">        return true</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // in shallow mode, objects are set as-is regardless of reactive or not</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // hadKey 数组判断设置的是否下标越界 对象判断对象是否原来存在该属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    const hadKey =</span></span>
<span class="line"><span style="color:#A6ACCD;">      isArray(target) &amp;&amp; isIntegerKey(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">        ? Number(key) &lt; target.length</span></span>
<span class="line"><span style="color:#A6ACCD;">        : hasOwn(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 通过 Reflect.set 设置新的值</span></span>
<span class="line"><span style="color:#A6ACCD;">    const result = Reflect.set(target, key, value, receiver)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // don&#39;t trigger if target is something up in the prototype chain of original</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (target === toRaw(receiver)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    	// 目标对象 和 设置的对象的原对象 是同一个对象 才进行更新依赖</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!hadKey) { </span></span>
<span class="line"><span style="color:#A6ACCD;">        // 新添加的 key 调add</span></span>
<span class="line"><span style="color:#A6ACCD;">        trigger(target, TriggerOpTypes.ADD, key, value)</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else if (hasChanged(value, oldValue)) { </span></span>
<span class="line"><span style="color:#A6ACCD;">        // 修改key 调 set</span></span>
<span class="line"><span style="color:#A6ACCD;">        trigger(target, TriggerOpTypes.SET, key, value, oldValue)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 最后返回设置的结果</span></span>
<span class="line"><span style="color:#A6ACCD;">    return result</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="总结setter函数执行步骤" tabindex="-1">总结setter函数执行步骤 <a class="header-anchor" href="#总结setter函数执行步骤" aria-label="Permalink to &quot;总结setter函数执行步骤&quot;">​</a></h6><ol><li>先通过key拿到旧值</li><li>如果旧值是只读的ref 新值不是ref <strong>不允许修改</strong></li><li><ol><li>首先ref 类型的值本身是只读的，只能通过修改它的value来修改，不然会破坏其响应式</li><li>如果旧值是只读的 ref 类型，而新值不是 ref 类型，那么说明新值不能通过修改 value 属性来实现更新，这样就可能破坏 ref 的只读特性，因此不允许修改。</li></ol></li><li>不是浅层响应式</li><li><ol><li>新值不是只读的浅响应式 =》 新值和旧值 分包通过toRaw 转为原始值</li><li>目标对象不是数组、旧值不是ref, 新值不是ref 直接替换旧值 <strong>修改成功</strong></li></ol></li><li>判断目标对象是否有该属性：数组通过下标 对象通过hasOwn</li><li>通过 Reflect.set 设置新的值</li><li>判断目标对象和设置对象的原对象 是否是同一个对象，是才通知更新</li><li><ol><li>对象没有key 调 add 进行添加及通知跟新</li><li>对象原来有key调 set 进行通知更新</li></ol></li><li>最后返回是设置结果</li></ol><h5 id="_3-deleteproperty" tabindex="-1">3.deleteProperty <a class="header-anchor" href="#_3-deleteproperty" aria-label="Permalink to &quot;3.deleteProperty&quot;">​</a></h5><p><strong>deleteProperty</strong> 函数用于创建拦截响应式对象删除属性时，进行响应式更新</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L202-L210</span></span>
<span class="line"><span style="color:#A6ACCD;">function deleteProperty(target: object, key: string | symbol): boolean {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const hadKey = hasOwn(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  const oldValue = (target as any)[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">  const result = Reflect.deleteProperty(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (result &amp;&amp; hadKey) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return result</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="总结deleteproperty函数执行步骤" tabindex="-1">总结deleteProperty函数执行步骤： <a class="header-anchor" href="#总结deleteproperty函数执行步骤" aria-label="Permalink to &quot;总结deleteProperty函数执行步骤：&quot;">​</a></h6><ol><li>先判断对象是否存在该key</li><li>通过key 拿到即将删除的 旧值</li><li>调 Refkect进行属性的删除</li><li>删除成功 并且存在key 就通知更新</li><li>最后返回删除结果</li></ol><h5 id="_4-has-和-ownkeys" tabindex="-1">4.<strong>has</strong> 和 <strong>ownKeys</strong> <a class="header-anchor" href="#_4-has-和-ownkeys" aria-label="Permalink to &quot;4.**has** 和 **ownKeys**&quot;">​</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L212-L218</span></span>
<span class="line"><span style="color:#A6ACCD;">function has(target: object, key: string | symbol): boolean {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const result = Reflect.has(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!isSymbol(key) || !builtInSymbols.has(key)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    track(target, TrackOpTypes.HAS, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return result</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function ownKeys(target: object): (string | symbol)[] {</span></span>
<span class="line"><span style="color:#A6ACCD;">  track(target, TrackOpTypes.ITERATE, isArray(target) ? &#39;length&#39; : ITERATE_KEY)</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Reflect.ownKeys(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>has</strong> 和 <strong>ownKeys</strong> 都是用来拦截对响应式对象<strong>键</strong>的判断和获取的。<br><strong>has</strong> 是在 in 操作符或者 Reflect.has时被调用，用来判断对象是否包含某个属性。 <strong>ownKeys</strong>是在<strong>Object.getOwnPropertyNames</strong>、<strong>Object.getOwnPropertySymbols</strong>、<strong>Object.keys</strong> 或者 <strong>Reflect.ownKeys</strong> 方法时被调用，用来获取目标对象自身所有属性的键值。</p><h4 id="_2、mutablecollectionhandlers" tabindex="-1">2、mutableCollectionHandlers <a class="header-anchor" href="#_2、mutablecollectionhandlers" aria-label="Permalink to &quot;2、mutableCollectionHandlers&quot;">​</a></h4><p>是针对 WeakMap、WeakSet、Set、Map 集合对象的拦截工具</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/collectionHandlers.ts#L366-L368</span></span>
<span class="line"><span style="color:#A6ACCD;">export const mutableCollectionHandlers: ProxyHandler&lt;CollectionTypes&gt; = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  get: /*#__PURE__*/ createInstrumentationGetter(false, false)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function createInstrumentationGetter(isReadonly: boolean, shallow: boolean) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 根据参数选择一个instrumentations对象 报错在闭包中</span></span>
<span class="line"><span style="color:#A6ACCD;">  const instrumentations = shallow</span></span>
<span class="line"><span style="color:#A6ACCD;">    ? isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">      ? shallowReadonlyInstrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;">      : shallowInstrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;">    : isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">    ? readonlyInstrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;">    : mutableInstrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  return (</span></span>
<span class="line"><span style="color:#A6ACCD;">    target: CollectionTypes,</span></span>
<span class="line"><span style="color:#A6ACCD;">    key: string | symbol,</span></span>
<span class="line"><span style="color:#A6ACCD;">    receiver: CollectionTypes</span></span>
<span class="line"><span style="color:#A6ACCD;">  ) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (key === ReactiveFlags.IS_REACTIVE) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 表示一个对象是否已经被转换为响应式对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">      return !isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (key === ReactiveFlags.IS_READONLY) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 表示一个对象是否已经被转换为只读的响应式对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">      return isReadonly</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else if (key === ReactiveFlags.RAW) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 一个响应式对象的原始对象（即未被代理的对象）。</span></span>
<span class="line"><span style="color:#A6ACCD;">      return target</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  	// 调用 Reflect.get 进行属性获取， 也间接调用了createGetter 进行依赖收集</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Reflect.get(</span></span>
<span class="line"><span style="color:#A6ACCD;">      // instrumentations 对象存在key 并且 key 也在 target 中</span></span>
<span class="line"><span style="color:#A6ACCD;">      hasOwn(instrumentations, key) &amp;&amp; key in target</span></span>
<span class="line"><span style="color:#A6ACCD;">        ? instrumentations</span></span>
<span class="line"><span style="color:#A6ACCD;">        : target,</span></span>
<span class="line"><span style="color:#A6ACCD;">      key,</span></span>
<span class="line"><span style="color:#A6ACCD;">      receiver</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>createInstrumentationGetter</strong> 函数是用于创建针对响应式对象的getter拦截器，我们会发现，它的函数体中没有看到依赖收集的相关操作。它是根据传入的参数相应的选择拦截方式和操作，它并直接进行依赖的收集，而是通过get才触发依赖的收集。它的拦截方式其实也挺多的像：has、 add、 set delete clear forEach 、get size 等等，感兴趣的小伙伴可以下来研究一下哦</p><h4 id="辅助函数" tabindex="-1">辅助函数 <a class="header-anchor" href="#辅助函数" aria-label="Permalink to &quot;辅助函数&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// https://github1s.com/vuejs/core/blob/v3.2.47/packages/shared/src/index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">export const isArray = Array.isArray</span></span>
<span class="line"><span style="color:#A6ACCD;">export const isSymbol = (val: unknown): val is symbol =&gt; typeof val === &#39;symbol&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const hasOwnProperty = Object.prototype.hasOwnProperty</span></span>
<span class="line"><span style="color:#A6ACCD;">export const hasOwn = (</span></span>
<span class="line"><span style="color:#A6ACCD;">  val: object,</span></span>
<span class="line"><span style="color:#A6ACCD;">  key: string | symbol</span></span>
<span class="line"><span style="color:#A6ACCD;">): key is keyof typeof val =&gt; hasOwnProperty.call(val, key)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export const isIntegerKey = (key: unknown) =&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  isString(key) &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">  key !== &#39;NaN&#39; &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">  key[0] !== &#39;-&#39; &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &#39;&#39; + parseInt(key, 10) === key</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function hasOwnProperty(this: object, key: string) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const obj = toRaw(this)</span></span>
<span class="line"><span style="color:#A6ACCD;">  track(obj, TrackOpTypes.HAS, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  return obj.hasOwnProperty(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><ol><li>getter: 实现响应式数据的自动依赖收集</li><li>setter：属性被修改通知依赖进行响应式跟新</li><li>deleteProperty: 属性被删除时，通知依赖进行更新</li><li>has: 在检查对象是否存在某个key时进行拦截</li><li>ownKeys: 可以获取对象自身的所有属性</li></ol><h4 id="注意事项" tabindex="-1">注意事项： <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项：&quot;">​</a></h4><ul><li>对于使用到了的 嵌套深层的对象，会递归收集依赖，注意性能问题</li><li>不能直接在getter中设置属性的值，会死循环，间接修改可以（那样没有意义）</li><li>不能修改、删除一个只读对象的属性，会抛出错误</li><li>不要给响应式对象赋值一些原型上的属性和<strong>proto,v_isRef,isVue</strong></li><li>结构一个响应式对象的时候 进来使用 官方toRefs ,否则容易失活</li></ul>`,51),t=[p];function o(r,c,i,A,C,y){return a(),n("div",null,t)}const u=s(l,[["render",o]]);export{D as __pageData,u as default};
