---
theme: channing-cyan
---

> 这个是面试中老生常谈的一个话题，也是前端开发人员需要掌握的基础知识，本文将详细讲解从输入url到页面渲染的整个过程。

## 整体流程

1.  **URL解析**：浏览器首先会对输入的URL进行解析，包括协议、域名、端口、路径、查询参数等。
2.  **DNS解析**：浏览器会通过DNS解析将域名解析为IP地址。
3.  **组装HTTP请求**：浏览器会根据解析后的IP地址，组装HTTP请求
4.  **检查缓存**：~~浏览器在发送请求前会检查是否有缓存，有缓存则直接使用缓存，否则发送请求。（html一般不缓存的，这步略过）~~
5.  **建立TCP连接**：浏览器会与服务器建立TCP连接，包括三次握手。
6.  **发送HTTP请求**：浏览器会向服务器发送HTTP请求，包括请求行、请求头、请求体等。
7.  **服务器处理请求响应结果**：服务器会根据请求的路径和参数，返回相应的资源
8.  **断开TCP连接**：浏览器与服务器断开TCP连接，包括四次挥手。
9.  **解析HTML**：浏览器会解析HTML，构建DOM树。
10. **构建CSSOM树**：浏览器会解析CSS，构建CSSOM树。
11. **构建渲染树**：浏览器会根据DOM树和CSSOM树，构建渲染树。
12. **布局渲染树**：浏览器会根据渲染树，计算每个节点的位置和大小。
13. **绘制渲染树**：浏览器会根据渲染树，绘制页面。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b5b99143c2084d39844ec6ea199c0f87~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725328969&x-orig-sign=4p7pqlnB1MFEvU%2BPFASashI6PrQ%3D)

### 1. URL解析

这一步主要判断url是否有效并提取关键信息：协议、域名、端口、路径、查询参数等
我们看下面这个请求url

```js
https://www.baidu.com/s?wd=前端&tn=84053098_3_dg&ie=utf-8&src=wise#5
```

解析结果如下：

```js
{
  href: "https://www.baidu.com/s?wd=前端&tn=84053098_3_dg&ie=utf-8&src=wise#5",
  origin: "https://www.baidu.com",
  protocol: "https:", //协议
  host: "www.baidu.com", //主机
  hostname: "www.baidu.com", // 域名
  port: "", // https默认端口443， http默认端口80
  pathname: "/s", // 路径
  search: "?wd=前端&tn=84053098_3_dg&ie=utf-8&src=wise", // 查询参数
  hash: "#5", // 锚点
  hostName: "www.baidu.com",
  path: "/s?wd=前端&tn=84053098_3_dg&ie=utf-8&src=wise",
  query: {
    wd: "前端", // 查询参数
    tn: "84053098_3_dg",
    ie: "utf-8",
    src: "wise"
  }
}
```

### 2. DNS解析

DNS解析是将域名解析成IP地址的过程。这个过程主要分为两大步：

1.  缓存判断
2.  ip寻址（DNS解析）

#### 2.1 缓存判断

*   浏览器缓存：浏览器会先检查自己的缓存中是否有对应的IP地址
*   系统缓存：浏览器会检查操作系统的DNS缓存
*   路由器缓存：浏览器会检查路由器的DNS缓存
*   ISP DNS缓存：浏览器会向ISP的DNS服务器发送DNS请求

如果缓存没有找到，进行DNS查询

#### 2.2 ip寻址（DNS解析）

DNS：Domain Name System，域名系统。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。

缓存判断+DNS解析的过程如下图：
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/54c464fe801444b8a13e49c84edc4cf6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725328969&x-orig-sign=4AjkqssTwrhyqRDv%2FwfVmNDrEbk%3D)

### 3. 建立TCP连接

在DNS解析过程中就回拿到对应的服务器IP地址，然后组装http请求.

在发送请求之前浏览器会判断是否有资源的缓存（强缓存），对强缓存有疑问的小伙伴可以参考[HTTP缓存探秘：强制缓存与协商缓存的实战应用](https://juejin.cn/post/7203880677196070973)

*   没有缓存 会直接发请求
*   有缓存，判断缓存是否过期，过期也会重发请求，
*   缓存没有过期直接使用缓存code: 200 (from disk cache)

#### 3.1 TCP三次握手

TCP 是一种面向连接的协议，这意味着在数据传输之前，通信双方必须建立一个可靠的连接。

*   第一次握手：客户端发送一个 SYN（Synchronize）包到服务器，请求建立连接。这个包中包含一个初始序列号。
*   第二次握手：服务器收到 SYN 包后，返回一个 SYN-ACK（Synchronize-Acknowledge）包给客户端，确认客户端的 SYN 包，并返回一个自己的初始序列号。
*   第三次握手：客户端收到 SYN-ACK 包后，返回一个 ACK（Acknowledge）包给服务器，确认服务器的 SYN-ACK 包。至此，TCP 连接建立成功。
*

简单理解：

*   客户端：你好，你听得到么。（客户端**发送能力**）
*   服务器：你好，我听得到，你听得到么？（服务器：**接收能力、响应能力**）
*   客户端：我也听得到。（客户端**接收能力**）

TCP三次握手的过程如下图：
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bef37eb11bb64f518e45f6f66fc3257d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725328969&x-orig-sign=vYtYSC9%2Ff2a%2BaRrohqpD05tDdaI%3D)

*   SYN：同步序列编号（Synchronize Sequence Numbers）
*   ACK：确认序号（Acknowledge）
*   Seq: 序列号（Sequence Number）
*   FIN：结束（Finish）

#### 3.2 TCP四次挥手

TCP 是一种面向连接的协议，这意味着在数据传输完成后，通信双方必须关闭连接。TCP 连接的关闭过程需要四次挥手，具体步骤如下：

*   第一次挥手：客户端发送一个 FIN（Finish）包给服务器，表示客户端已经没有数据要发送了，请求关闭连接。
*   第二次挥手：服务器收到 FIN 包后，返回一个 ACK 包给客户端，确认客户端的 FIN 包。
*   第三次挥手：服务器发送一个 FIN 包给客户端，表示服务器已经没有数据要发送了，请求关闭连接。
*   第四次挥手：客户端收到 FIN 包后，返回一个 ACK 包给服务器，确认服务器的 FIN 包。至此，TCP 连接关闭成功。

简单理解：

*   客户端：我没什么要说的了，我们分手吧。（客户端没有数据发送了）
*   服务器：好的，我们分手吧。（服务器同意分手）
*   服务器：我也没什么要说的了，我们分手吧。（服务器没有数据推送了）
*   客户端：好的，我们分手吧。（客户端知道服务器没有数据了，果断分手）

TCP四次挥手的过程如下图：
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0964745c71ef4a2d908f215383bbecea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725328969&x-orig-sign=ajILNNGpfyMIAGZg%2BO3vvmkIf3s%3D)

#### 为什么TCP连接必须经历三次握手？

TCP 是一种面向**连接**的协议，它需要确保数据的完整性和顺序性。三次握手的过程可以确保**双方都具备发送和接收数据的能力**，从而建立可靠的连接。

#### 为什么TCP断开需要经历四次挥手？

TCP 是一种**全双工**协议，这意味着双方都可以同时发送和接收数据。因此，在断开连接时，双方都需要发送 FIN 包来表示自己没有数据要发送了。

确保**双方都没有数据发送**了

### 4. 服务器响应请求

建立连接后，服务器收到客户端的请求

*   请求html，一般会经过 **代理服务器**：Ng、Apache
*   服务器解析请求：中间件校验权限
*   解析请求头，判断是否有缓存（**协商缓存**）Last modify\Etag
*   有缓存并，未过期、新鲜，返回 304 （你自己用缓存）
*   没有缓存，根据请求路径、参数，找到对应资源 进行返回
*   没有找到对应资源 返回 404
*   服务器返回响应：包括状态码、响应头和响应体。

### 5. 浏览器解析响应

浏览器接收到服务器返回的数据后，会进行解析
#### 1. 解析响应头
*   解析：状态码、响应头（响应数据类型、是否需要写入cookies、是否需要将资源缓存）
    *   如果 304 缓存未过期、直接使用缓存
    *   如果是200 根据响应数据类型，进行解析
    *   404 啥的 就没有找到资源
    *   ...
#### 2. 解析html
*   解析 HTML：浏览器解析 HTML，构建 DOM 树。
    *   预加载扫描器：浏览器构建DOM树，这个过程会占用主线程
      *   预加载扫描器会解析可用的内容并请求优先级高的资源，如CSS、JavaScript、字体。不必等到解析器解析到外部资源引用时才去请求。
    *   第一步是处理 HTML 标记并构造 DOM 树。HMTL标记包括开始和结束标记、属性名和值
    *   按照从上到下、深度优先原则，解析HTML => head => body
    *   先当前节点所有子节点，再解析兄弟节点
    *   img等异步请求不会阻塞DOM的解析，js会同步下载，下载完立即执行
    *   js 带async,异步下载，下载完立即执行
    *   js 带defer,异步下载，等解析结束再执行，（DOMContentLoaded 事件触发前）
    *   css 不糊阻塞DOM解析
*   解析 CSS，构建 CSSOM 树，也叫CSS规则树
    *   浏览器将css规则转换成样式表
    *   遍历每个css规则集，根据css选择器创建父、子、兄弟关系的节点树
*   JS解析：js代码会被解析、编译和解释，解析生成抽象语法树（AST）
    *   词法分析：将代码分解成有意义的代码块，如变量、操作符、函数名等
    *   语法分析：将词法分析的结果转换成抽象语法树
    *   生成AST后，浏览器会进行静态代码分析，检查语法错误、变量声明、函数调用等
#### 3. 渲染页面
*   渲染步骤：样式、布局、绘制。创建的DOM树和CSSOM树合并为渲染树。
*   样式：display:none 的元素不会出现在渲染树中;visibility:hidden 的元素会出现在渲染树中，但不会显示。每个可见节点都应用了CSSOM规则，渲染树包含所有可见节点的内容和计算样式，将所有相关样式与DOM节点匹配，并根据CSS级联，确定每个节点的计算属性。
*   布局：计算渲染树中每个节点的位置和大小。
    *  在渲染树上运行布局以计算每个节点的几何体
    *  布局是确定呈现树中所有节点的尺寸和位置，以及确定页面上每个对象的大小和位置的过程
    *  第一次确定每个节点的大小和位置称为布局。随后对节点大小和位置的重新计算称为重排
*   绘制：将渲染树中的每个节点绘制到屏幕上。
    * 绘制可以将布局树中的元素分解为多个层

完结撒花...

## 结语：

如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾
