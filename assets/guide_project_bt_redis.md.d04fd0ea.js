import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.793cb3e4.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/project/bt/redis.md","lastUpdated":1722740948000}'),e={name:"guide/project/bt/redis.md"},t=l(`<p>mysql:5.7 jenkins/jenkins:lts</p><h2 id="潘多拉项目" tabindex="-1">潘多拉项目 <a class="header-anchor" href="#潘多拉项目" aria-label="Permalink to &quot;潘多拉项目&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pengzhile/pandora</span></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">-e</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PANDORA_CLOUD=cloud</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-e</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PANDORA_SERVER=0.0.0.0:</span><span style="color:#F78C6C;">8899</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8899</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">8899</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pengzhile/pandora</span></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 获取 token</span></span>
<span class="line"><span style="color:#FFCB6B;">http://chat.openai.com/api/auth/session</span></span>
<span class="line"></span></code></pre></div><h2 id="redis" tabindex="-1">redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;redis&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/docker/redis/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/docker/redis</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">touch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6379</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">6379</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/data/redis/redis.conf:/etc/redis/redis.conf</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/data/redis/data:/data</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis-server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/redis/redis.conf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--appendonly</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span></code></pre></div><p>redis.conf</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Redis configuration file example.</span></span>
<span class="line"><span style="color:#FFCB6B;">requirepass</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xiaoyi</span></span>
<span class="line"><span style="color:#FFCB6B;">maxclients</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10000</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that in order to read the configuration file, Redis must be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># started with the file path as first argument:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ./redis-server /path/to/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note on units: when memory size is needed, it is possible to specify</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># it in the usual form of 1k 5GB 4M and so forth:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1k =&gt; 1000 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1kb =&gt; 1024 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1m =&gt; 1000000 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1mb =&gt; 1024*1024 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1g =&gt; 1000000000 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1gb =&gt; 1024*1024*1024 bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># units are case insensitive so 1GB 1Gb 1gB are all the same.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################## INCLUDES ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Include one or more other config files here.  This is useful if you</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># have a standard template that goes to all Redis servers but also need</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to customize a few per-server settings.  Include files can include</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># other files, so use this wisely.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Notice option &quot;include&quot; won&#39;t be rewritten by command &quot;CONFIG REWRITE&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># from admin or Redis Sentinel. Since Redis always uses the last processed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># line as value of a configuration directive, you&#39;d better put includes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># at the beginning of this file to avoid overwriting config change at runtime.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If instead you are interested in using includes to override configuration</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># options, it is better to use include as the last line.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># include /path/to/local.conf</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># include /path/to/other.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################## MODULES #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Load modules at startup. If the server is not able to load modules</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># it will abort. It is possible to use multiple loadmodule directives.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># loadmodule /path/to/my_module.so</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># loadmodule /path/to/other_module.so</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################## NETWORK #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default, if no &quot;bind&quot; configuration directive is specified, Redis listens</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for connections from all the network interfaces available on the server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is possible to listen to just one or multiple selected interfaces using</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the &quot;bind&quot; configuration directive, followed by one or more IP addresses.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Examples:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># bind 192.168.1.100 10.0.0.1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># bind 127.0.0.1 ::1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ~~~ WARNING ~~~ If the computer running Redis is directly exposed to the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># internet, binding to all the interfaces is dangerous and will expose the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># instance to everybody on the internet. So by default we uncomment the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># following bind directive, that will force Redis to listen only into</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the IPv4 loopback interface address (this means Redis will be able to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># accept connections only from clients running into the same computer it</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is running).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># JUST COMMENT THE FOLLOWING LINE.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#FFCB6B;">bind</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">0.0.0.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Protected mode is a layer of security protection, in order to avoid that</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis instances left open on the internet are accessed and exploited.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When protected mode is on and if:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) The server is not binding explicitly to a set of addresses using the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    &quot;bind&quot; directive.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) No password is configured.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The server only accepts connections from clients connecting from the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># IPv4 and IPv6 loopback addresses 127.0.0.1 and ::1, and from Unix domain</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># sockets.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default protected mode is enabled. You should disable it only if</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># you are sure you want clients from other hosts to connect to Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># even if no authentication is configured, nor a specific set of interfaces</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># are explicitly listed using the &quot;bind&quot; directive.</span></span>
<span class="line"><span style="color:#FFCB6B;">protected-mode</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Accept connections on the specified port, default is 6379 (IANA #815344).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If port 0 is specified Redis will not listen on a TCP socket.</span></span>
<span class="line"><span style="color:#FFCB6B;">port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># TCP listen() backlog.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In high requests-per-second environments you need an high backlog in order</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to avoid slow clients connections issues. Note that the Linux kernel</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will silently truncate it to the value of /proc/sys/net/core/somaxconn so</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># make sure to raise both the value of somaxconn and tcp_max_syn_backlog</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to get the desired effect.</span></span>
<span class="line"><span style="color:#FFCB6B;">tcp-backlog</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">511</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Unix socket.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify the path for the Unix socket that will be used to listen for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># incoming connections. There is no default, so Redis will not listen</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># on a unix socket when not specified.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># unixsocket /tmp/redis.sock</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># unixsocketperm 700</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Close the connection after a client is idle for N seconds (0 to disable)</span></span>
<span class="line"><span style="color:#FFCB6B;">timeout</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># TCP keepalive.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If non-zero, use SO_KEEPALIVE to send TCP ACKs to clients in absence</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of communication. This is useful for two reasons:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) Detect dead peers.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Take the connection alive from the point of view of network</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    equipment in the middle.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># On Linux, the specified value (in seconds) is the period used to send ACKs.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that to close the connection the double of the time is needed.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># On other kernels the period depends on the kernel configuration.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A reasonable value for this option is 300 seconds, which is the new</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis default starting with Redis 3.2.1.</span></span>
<span class="line"><span style="color:#FFCB6B;">tcp-keepalive</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################# GENERAL #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default Redis does not run as a daemon. Use &#39;yes&#39; if you need it.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that Redis will write a pid file in /var/run/redis.pid when daemonized.</span></span>
<span class="line"><span style="color:#FFCB6B;">daemonize</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If you run Redis from upstart or systemd, Redis can interact with your</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># supervision tree. Options:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   supervised no      - no supervision interaction</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   supervised auto    - detect upstart or systemd method based on</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#                        UPSTART_JOB or NOTIFY_SOCKET environment variables</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note: these supervision methods only signal &quot;process is ready.&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       They do not enable continuous liveness pings back to your supervisor.</span></span>
<span class="line"><span style="color:#FFCB6B;">supervised</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If a pid file is specified, Redis writes it where specified at startup</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and removes it at exit.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When the server runs non daemonized, no pid file is created if none is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># specified in the configuration. When the server is daemonized, the pid file</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is used even if not specified, defaulting to &quot;/var/run/redis.pid&quot;.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Creating a pid file is best effort: if Redis is not able to create it</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># nothing bad happens, the server will start and run normally.</span></span>
<span class="line"><span style="color:#FFCB6B;">pidfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/www/server/redis/redis.pid</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify the server verbosity level.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This can be one of:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># debug (a lot of information, useful for development/testing)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># verbose (many rarely useful info, but not a mess like the debug level)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># notice (moderately verbose, what you want in production probably)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># warning (only very important / critical messages are logged)</span></span>
<span class="line"><span style="color:#FFCB6B;">loglevel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">notice</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify the log file name. Also the empty string can be used to force</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis to log on the standard output. Note that if you use standard</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># output for logging but daemonize, logs will be sent to /dev/null</span></span>
<span class="line"><span style="color:#FFCB6B;">logfile</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/www/server/redis/redis.log</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># To enable logging to the system logger, just set &#39;syslog-enabled&#39; to yes,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and optionally update the other syslog parameters to suit your needs.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># syslog-enabled no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify the syslog identity.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># syslog-ident redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># syslog-facility local0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set the number of databases. The default database is DB 0, you can select</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a different one on a per-connection basis using SELECT &lt;dbid&gt; where</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># dbid is a number between 0 and &#39;databases&#39;-1</span></span>
<span class="line"><span style="color:#FFCB6B;">databases</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">16</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default Redis shows an ASCII art logo only when started to log to the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># standard output and if the standard output is a TTY. Basically this means</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that normally a logo is displayed only in interactive sessions.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># However it is possible to force the pre-4.0 behavior and always show a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ASCII art logo in startup logs by setting the following option to yes.</span></span>
<span class="line"><span style="color:#FFCB6B;">always-show-logo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################ SNAPSHOTTING  ################################</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Save the DB on disk:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   save &lt;seconds&gt; &lt;changes&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   Will save the DB if both the given number of seconds and the given</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   number of write operations against the DB occurred.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   In the example below the behaviour will be to save:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   after 900 sec (15 min) if at least 1 key changed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   after 300 sec (5 min) if at least 10 keys changed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   after 60 sec if at least 10000 keys changed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   Note: you can disable saving completely by commenting out all &quot;save&quot; lines.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   It is also possible to remove all the previously configured save</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   points by adding a save directive with a single empty string argument</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   like in the following example:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   save &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">save</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">900</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#FFCB6B;">save</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">300</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#FFCB6B;">save</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default Redis will stop accepting writes if RDB snapshots are enabled</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># (at least one save point) and the latest background save failed.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This will make the user aware (in a hard way) that data is not persisting</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># on disk properly, otherwise chances are that no one will notice and some</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># disaster will happen.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If the background saving process will start working again Redis will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># automatically allow writes again.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># However if you have setup your proper monitoring of the Redis server</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and persistence, you may want to disable this feature so that Redis will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># continue to work as usual even if there are problems with disk,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># permissions, and so forth.</span></span>
<span class="line"><span style="color:#FFCB6B;">stop-writes-on-bgsave-error</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Compress string objects using LZF when dump .rdb databases?</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For default that&#39;s set to &#39;yes&#39; as it&#39;s almost always a win.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If you want to save some CPU in the saving child set it to &#39;no&#39; but</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the dataset will likely be bigger if you have compressible values or keys.</span></span>
<span class="line"><span style="color:#FFCB6B;">rdbcompression</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Since version 5 of RDB a CRC64 checksum is placed at the end of the file.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This makes the format more resistant to corruption but there is a performance</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># hit to pay (around 10%) when saving and loading RDB files, so you can disable it</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for maximum performances.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># RDB files created with checksum disabled have a checksum of zero that will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># tell the loading code to skip the check.</span></span>
<span class="line"><span style="color:#FFCB6B;">rdbchecksum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The filename where to dump the DB</span></span>
<span class="line"><span style="color:#FFCB6B;">dbfilename</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dump.rdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The working directory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The DB will be written inside this directory, with the filename specified</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># above using the &#39;dbfilename&#39; configuration directive.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The Append Only File will also be created inside this directory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that you must specify a directory here, not a file name.</span></span>
<span class="line"><span style="color:#FFCB6B;">dir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/www/server/redis/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################# REPLICATION #################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Master-Replica replication. Use replicaof to make a Redis instance a copy of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># another Redis server. A few things to understand ASAP about Redis replication.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   |      Master      | ---&gt; |    Replica    |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   | (receive writes) |      |  (exact copy) |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) Redis replication is asynchronous, but you can configure a master to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    stop accepting writes if it appears to be not connected with at least</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    a given number of replicas.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Redis replicas are able to perform a partial resynchronization with the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    master if the replication link is lost for a relatively small amount of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    time. You may want to configure the replication backlog size (see the next</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    sections of this file) with a sensible value depending on your needs.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3) Replication is automatic and does not need user intervention. After a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    network partition replicas automatically try to reconnect to masters</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    and resynchronize with them.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replicaof &lt;masterip&gt; &lt;masterport&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If the master is password protected (using the &quot;requirepass&quot; configuration</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># directive below) it is possible to tell the replica to authenticate before</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># starting the replication synchronization process, otherwise the master will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># refuse the replica request.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># masterauth &lt;master-password&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When a replica loses its connection with the master, or when the replication</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is still in progress, the replica can act in two different ways:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) if replica-serve-stale-data is set to &#39;yes&#39; (the default) the replica will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    still reply to client requests, possibly with out of date data, or the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    data set may just be empty if this is the first synchronization.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) if replica-serve-stale-data is set to &#39;no&#39; the replica will reply with</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    an error &quot;SYNC with master in progress&quot; to all the kind of commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    but to INFO, replicaOF, AUTH, PING, SHUTDOWN, REPLCONF, ROLE, CONFIG,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    SUBSCRIBE, UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    COMMAND, POST, HOST: and LATENCY.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#FFCB6B;">replica-serve-stale-data</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You can configure a replica instance to accept writes or not. Writing against</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a replica instance may be useful to store some ephemeral data (because data</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># written on a replica will be easily deleted after resync with the master) but</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># may also cause problems if clients are writing to it because of a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># misconfiguration.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Since Redis 2.6 by default replicas are read-only.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note: read only replicas are not designed to be exposed to untrusted clients</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># on the internet. It&#39;s just a protection layer against misuse of the instance.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Still a read only replica exports by default all the administrative commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># such as CONFIG, DEBUG, and so forth. To a limited extent you can improve</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># security of read only replicas using &#39;rename-command&#39; to shadow all the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># administrative / dangerous commands.</span></span>
<span class="line"><span style="color:#FFCB6B;">replica-</span><span style="color:#82AAFF;">read</span><span style="color:#FFCB6B;">-only</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Replication SYNC strategy: disk or socket.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -------------------------------------------------------</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># WARNING: DISKLESS REPLICATION IS EXPERIMENTAL CURRENTLY</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -------------------------------------------------------</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># New replicas and reconnecting replicas that are not able to continue the replication</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># process just receiving differences, need to do what is called a &quot;full</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># synchronization&quot;. An RDB file is transmitted from the master to the replicas.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The transmission can happen in two different ways:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) Disk-backed: The Redis master creates a new process that writes the RDB</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#                 file on disk. Later the file is transferred by the parent</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#                 process to the replicas incrementally.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Diskless: The Redis master creates a new process that directly writes the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#              RDB file to replica sockets, without touching the disk at all.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># With disk-backed replication, while the RDB file is generated, more replicas</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># can be queued and served with the RDB file as soon as the current child producing</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the RDB file finishes its work. With diskless replication instead once</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the transfer starts, new replicas arriving will be queued and a new transfer</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will start when the current one terminates.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When diskless replication is used, the master waits a configurable amount of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># time (in seconds) before starting the transfer in the hope that multiple replicas</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will arrive and the transfer can be parallelized.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># With slow disks and fast (large bandwidth) networks, diskless replication</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># works better.</span></span>
<span class="line"><span style="color:#FFCB6B;">repl-diskless-sync</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When diskless replication is enabled, it is possible to configure the delay</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the server waits in order to spawn the child that transfers the RDB via socket</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to the replicas.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This is important since once the transfer starts, it is not possible to serve</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># new replicas arriving, that will be queued for the next RDB transfer, so the server</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># waits a delay in order to let more replicas arrive.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The delay is specified in seconds, and by default is 5 seconds. To disable</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># it entirely just set it to 0 seconds and the transfer will start ASAP.</span></span>
<span class="line"><span style="color:#FFCB6B;">repl-diskless-sync-delay</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Replicas send PINGs to server in a predefined interval. It&#39;s possible to change</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># this interval with the repl_ping_replica_period option. The default value is 10</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># seconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># repl-ping-replica-period 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The following option sets the replication timeout for:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) Bulk transfer I/O during SYNC, from the point of view of replica.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Master timeout from the point of view of replicas (data, pings).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3) Replica timeout from the point of view of masters (REPLCONF ACK pings).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is important to make sure that this value is greater than the value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># specified for repl-ping-replica-period otherwise a timeout will be detected</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># every time there is low traffic between the master and the replica.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># repl-timeout 60</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Disable TCP_NODELAY on the replica socket after SYNC?</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If you select &quot;yes&quot; Redis will use a smaller number of TCP packets and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># less bandwidth to send data to replicas. But this can add a delay for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the data to appear on the replica side, up to 40 milliseconds with</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Linux kernels using a default configuration.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If you select &quot;no&quot; the delay for data to appear on the replica side will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># be reduced but more bandwidth will be used for replication.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default we optimize for low latency, but in very high traffic conditions</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or when the master and replicas are many hops away, turning this to &quot;yes&quot; may</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># be a good idea.</span></span>
<span class="line"><span style="color:#FFCB6B;">repl-disable-tcp-nodelay</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set the replication backlog size. The backlog is a buffer that accumulates</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica data when replicas are disconnected for some time, so that when a replica</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># wants to reconnect again, often a full resync is not needed, but a partial</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># resync is enough, just passing the portion of data the replica missed while</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># disconnected.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The bigger the replication backlog, the longer the time the replica can be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># disconnected and later be able to perform a partial resynchronization.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The backlog is only allocated once there is at least a replica connected.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># repl-backlog-size 1mb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># After a master has no longer connected replicas for some time, the backlog</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will be freed. The following option configures the amount of seconds that</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># need to elapse, starting from the time the last replica disconnected, for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the backlog buffer to be freed.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that replicas never free the backlog for timeout, since they may be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># promoted to masters later, and should be able to correctly &quot;partially</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># resynchronize&quot; with the replicas: hence they should always accumulate backlog.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A value of 0 means to never release the backlog.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># repl-backlog-ttl 3600</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The replica priority is an integer number published by Redis in the INFO output.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is used by Redis Sentinel in order to select a replica to promote into a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># master if the master is no longer working correctly.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A replica with a low priority number is considered better for promotion, so</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for instance if there are three replicas with priority 10, 100, 25 Sentinel will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># pick the one with priority 10, that is the lowest.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># However a special priority of 0 marks the replica as not able to perform the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># role of master, so a replica with priority of 0 will never be selected by</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis Sentinel for promotion.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default the priority is 100.</span></span>
<span class="line"><span style="color:#FFCB6B;">replica-priority</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is possible for a master to stop accepting writes if there are less than</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># N replicas connected, having a lag less or equal than M seconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The N replicas need to be in &quot;online&quot; state.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The lag in seconds, that must be &lt;= the specified value, is calculated from</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the last ping received from the replica, that is usually sent every second.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This option does not GUARANTEE that N replicas will accept the write, but</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will limit the window of exposure for lost writes in case not enough replicas</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># are available, to the specified number of seconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For example to require at least 3 replicas with a lag &lt;= 10 seconds use:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># min-replicas-to-write 3</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># min-replicas-max-lag 10</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Setting one or the other to 0 disables the feature.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default min-replicas-to-write is set to 0 (feature disabled) and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># min-replicas-max-lag is set to 10.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A Redis master is able to list the address and port of the attached</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replicas in different ways. For example the &quot;INFO replication&quot; section</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># offers this information, which is used, among other tools, by</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis Sentinel in order to discover replica instances.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Another place where this info is available is in the output of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># &quot;ROLE&quot; command of a master.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The listed IP and address normally reported by a replica is obtained</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in the following way:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   IP: The address is auto detected by checking the peer address</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   of the socket used by the replica to connect with the master.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   Port: The port is communicated by the replica during the replication</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   handshake, and is normally the port that the replica is using to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   listen for connections.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># However when port forwarding or Network Address Translation (NAT) is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># used, the replica may be actually reachable via different IP and port</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># pairs. The following two options can be used by a replica in order to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># report to its master a specific set of IP and port, so that both INFO</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and ROLE will report those values.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># There is no need to use both the options if you need to override just</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the port or the IP address.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica-announce-ip 5.5.5.5</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica-announce-port 1234</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################## SECURITY ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Require clients to issue AUTH &lt;PASSWORD&gt; before processing any other</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># commands.  This might be useful in environments in which you do not trust</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># others with access to the host running redis-server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This should stay commented out for backward compatibility and because most</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># people do not need auth (e.g. they run their own servers).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Warning: since Redis is pretty fast an outside user can try up to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 150k passwords per second against a good box. This means that you should</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># use a very strong password otherwise it will be very easy to break.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># requirepass foobared</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Command renaming.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is possible to change the name of dangerous commands in a shared</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># environment. For instance the CONFIG command may be renamed into something</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># hard to guess so that it will still be available for internal-use tools</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># but not available for general clients.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Example:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is also possible to completely kill a command by renaming it into</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># an empty string:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># rename-command CONFIG &quot;&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Please note that changing the name of commands that are logged into the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># AOF file or transmitted to replicas may cause problems.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################### CLIENTS ####################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set the max number of connected clients at the same time. By default</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># this limit is set to 10000 clients, however if the Redis server is not</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># able to configure the process file limit to allow for the specified limit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the max number of allowed clients is set to the current file limit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># minus 32 (as Redis reserves a few file descriptors for internal uses).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Once the limit is reached Redis will close all the new connections sending</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># an error &#39;max number of clients reached&#39;.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># maxclients 10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">############################## MEMORY MANAGEMENT ################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set a memory usage limit to the specified amount of bytes.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When the memory limit is reached Redis will try to remove keys</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># according to the eviction policy selected (see maxmemory-policy).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If Redis can&#39;t remove keys according to the policy, or if the policy is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># set to &#39;noeviction&#39;, Redis will start to reply with errors to commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that would use more memory, like SET, LPUSH, and so on, and will continue</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to reply to read-only commands like GET.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This option is usually useful when using Redis as an LRU or LFU cache, or to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># set a hard memory limit for an instance (using the &#39;noeviction&#39; policy).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># WARNING: If you have replicas attached to an instance with maxmemory on,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the size of the output buffers needed to feed the replicas are subtracted</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># from the used memory count, so that network problems / resyncs will</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># not trigger a loop where keys are evicted, and in turn the output</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># buffer of replicas is full with DELs of keys evicted triggering the deletion</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of more keys, and so forth until the database is completely emptied.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In short... if you have replicas attached it is suggested that you set a lower</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># limit for maxmemory so that there is some free RAM on the system for replica</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># output buffers (but this is not needed if the policy is &#39;noeviction&#39;).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># maxmemory &lt;bytes&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># MAXMEMORY POLICY: how Redis will select what to remove when maxmemory</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is reached. You can select among five behaviors:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># volatile-lru -&gt; Evict using approximated LRU among the keys with an expire set.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># allkeys-lru -&gt; Evict any key using approximated LRU.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># volatile-lfu -&gt; Evict using approximated LFU among the keys with an expire set.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># allkeys-lfu -&gt; Evict any key using approximated LFU.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># volatile-random -&gt; Remove a random key among the ones with an expire set.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># allkeys-random -&gt; Remove a random key, any key.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># volatile-ttl -&gt; Remove the key with the nearest expire time (minor TTL)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># noeviction -&gt; Don&#39;t evict anything, just return an error on write operations.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># LRU means Least Recently Used</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># LFU means Least Frequently Used</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Both LRU, LFU and volatile-ttl are implemented using approximated</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># randomized algorithms.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note: with any of the above policies, Redis will return an error on write</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       operations, when there are no suitable keys for eviction.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       At the date of writing these commands are: set setnx setex append</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       getset mset msetnx exec sort</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default is:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># maxmemory-policy noeviction</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># LRU, LFU and minimal TTL algorithms are not precise algorithms but approximated</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># algorithms (in order to save memory), so you can tune it for speed or</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># accuracy. For default Redis will check five keys and pick the one that was</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># used less recently, you can change the sample size using the following</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># configuration directive.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default of 5 produces good enough results. 10 Approximates very closely</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># true LRU but costs more CPU. 3 is faster but not very accurate.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># maxmemory-samples 5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Starting from Redis 5, by default a replica will ignore its maxmemory setting</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># (unless it is promoted to master after a failover or manually). It means</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that the eviction of keys will be just handled by the master, sending the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># DEL commands to the replica as keys evict in the master side.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This behavior ensures that masters and replicas stay consistent, and is usually</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># what you want, however if your replica is writable, or you want the replica to have</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a different memory setting, and you are sure all the writes performed to the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica are idempotent, then you may change this default (but be sure to understand</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># what you are doing).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that since the replica by default does not evict, it may end using more</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># memory than the one set via maxmemory (there are certain buffers that may</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># be larger on the replica, or data structures may sometimes take more memory and so</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># forth). So make sure you monitor your replicas and make sure they have enough</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># memory to never hit a real out-of-memory condition before the master hits</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the configured maxmemory setting.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica-ignore-maxmemory yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">############################# LAZY FREEING ####################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis has two primitives to delete keys. One is called DEL and is a blocking</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># deletion of the object. It means that the server stops processing new commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to reclaim all the memory associated with an object in a synchronous</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># way. If the key deleted is associated with a small object, the time needed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to execute the DEL command is very small and comparable to most other</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># O(1) or O(log_N) commands in Redis. However if the key is associated with an</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># aggregated value containing millions of elements, the server can block for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a long time (even seconds) in order to complete the operation.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For the above reasons Redis also offers non blocking deletion primitives</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># such as UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># FLUSHDB commands, in order to reclaim memory in background. Those commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># are executed in constant time. Another thread will incrementally free the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># object in the background as fast as possible.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It&#39;s up to the design of the application to understand when it is a good</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># idea to use one or the other. However the Redis server sometimes has to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># delete keys or flush the whole database as a side effect of other operations.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specifically Redis deletes objects independently of a user call in the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># following scenarios:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) On eviction, because of the maxmemory and maxmemory policy configurations,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    in order to make room for new data, without going over the specified</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    memory limit.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Because of expire: when a key with an associated time to live (see the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    EXPIRE command) must be deleted from memory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3) Because of a side effect of a command that stores data on a key that may</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    already exist. For example the RENAME command may delete the old key</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    content when it is replaced with another one. Similarly SUNIONSTORE</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    or SORT with STORE option may delete existing keys. The SET command</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    itself removes any old content of the specified key in order to replace</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    it with the specified string.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 4) During replication, when a replica performs a full resynchronization with</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    its master, the content of the whole database is removed in order to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    load the RDB file just transferred.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In all the above cases the default is to delete objects in a blocking way,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># like if DEL was called. However you can configure each case specifically</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to instead release memory in a non-blocking way like if UNLINK</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># was called, using the following configuration directives:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">lazyfree-lazy-eviction</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"><span style="color:#FFCB6B;">lazyfree-lazy-expire</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"><span style="color:#FFCB6B;">lazyfree-lazy-server-del</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"><span style="color:#FFCB6B;">replica-lazy-flush</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">############################## APPEND ONLY MODE ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default Redis asynchronously dumps the dataset on disk. This mode is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># good enough in many applications, but an issue with the Redis process or</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a power outage may result into a few minutes of writes lost (depending on</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the configured save points).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The Append Only File is an alternative persistence mode that provides</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># much better durability. For instance using the default data fsync policy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># (see later in the config file) Redis can lose just one second of writes in a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># dramatic event like a server power outage, or a single write if something</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># wrong with the Redis process itself happens, but the operating system is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># still running correctly.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># AOF and RDB persistence can be enabled at the same time without problems.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If the AOF is enabled on startup Redis will load the AOF, that is the file</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># with the better durability guarantees.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Please check http://redis.io/topics/persistence for more information.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">appendonly</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The name of the append only file (default: &quot;appendonly.aof&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">appendfilename</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">appendonly.aof</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The fsync() call tells the Operating System to actually write data on disk</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># instead of waiting for more data in the output buffer. Some OS will really flush</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># data on disk, some other OS will just try to do it ASAP.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis supports three different modes:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># no: don&#39;t fsync, just let the OS flush the data when it wants. Faster.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># always: fsync after every write to the append only log. Slow, Safest.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># everysec: fsync only one time every second. Compromise.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default is &quot;everysec&quot;, as that&#39;s usually the right compromise between</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># speed and data safety. It&#39;s up to you to understand if you can relax this to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># &quot;no&quot; that will let the operating system flush the output buffer when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># it wants, for better performances (but if you can live with the idea of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># some data loss consider the default persistence mode that&#39;s snapshotting),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or on the contrary, use &quot;always&quot; that&#39;s very slow but a bit safer than</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># everysec.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># More details please check the following article:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># http://antirez.com/post/redis-persistence-demystified.html</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If unsure, use &quot;everysec&quot;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># appendfsync always</span></span>
<span class="line"><span style="color:#FFCB6B;">appendfsync</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">everysec</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># appendfsync no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When the AOF fsync policy is set to always or everysec, and a background</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># saving process (a background save or AOF log background rewriting) is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># performing a lot of I/O against the disk, in some Linux configurations</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis may block too long on the fsync() call. Note that there is no fix for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># this currently, as even performing fsync in a different thread will block</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># our synchronous write(2) call.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In order to mitigate this problem it&#39;s possible to use the following option</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that will prevent fsync() from being called in the main process while a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># BGSAVE or BGREWRITEAOF is in progress.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This means that while another child is saving, the durability of Redis is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the same as &quot;appendfsync none&quot;. In practical terms, this means that it is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># possible to lose up to 30 seconds of log in the worst scenario (with the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># default Linux settings).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If you have latency problems turn this to &quot;yes&quot;. Otherwise leave it as</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># &quot;no&quot; that is the safest pick from the point of view of durability.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">no-appendfsync-on-rewrite</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Automatic rewrite of the append only file.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis is able to automatically rewrite the log file implicitly calling</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># BGREWRITEAOF when the AOF log size grows by the specified percentage.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This is how it works: Redis remembers the size of the AOF file after the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># latest rewrite (if no rewrite has happened since the restart, the size of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the AOF at startup is used).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This base size is compared to the current size. If the current size is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># bigger than the specified percentage, the rewrite is triggered. Also</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># you need to specify a minimal size for the AOF file to be rewritten, this</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is useful to avoid rewriting the AOF file even if the percentage increase</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is reached but it is still pretty small.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Specify a percentage of zero in order to disable the automatic AOF</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># rewrite feature.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">auto-aof-rewrite-percentage</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span></span>
<span class="line"><span style="color:#FFCB6B;">auto-aof-rewrite-min-size</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">64mb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># An AOF file may be found to be truncated at the end during the Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># startup process, when the AOF data gets loaded back into memory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This may happen when the system where Redis is running</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># crashes, especially when an ext4 filesystem is mounted without the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># data=ordered option (however this can&#39;t happen when Redis itself</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># crashes or aborts but the operating system still works correctly).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis can either exit with an error when this happens, or load as much</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># data as possible (the default now) and start if the AOF file is found</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to be truncated at the end. The following option controls this behavior.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If aof-load-truncated is set to yes, a truncated AOF file is loaded and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the Redis server starts emitting a log to inform the user of the event.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Otherwise if the option is set to no, the server aborts with an error</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and refuses to start. When the option is set to no, the user requires</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to fix the AOF file using the &quot;redis-check-aof&quot; utility before to restart</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that if the AOF file will be found to be corrupted in the middle</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the server will still exit with an error. This option only applies when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis will try to read more data from the AOF file but not enough bytes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will be found.</span></span>
<span class="line"><span style="color:#FFCB6B;">aof-load-truncated</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When rewriting the AOF file, Redis is able to use an RDB preamble in the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># AOF file for faster rewrites and recoveries. When this option is turned</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># on the rewritten AOF file is composed of two different stanzas:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   [RDB file][AOF tail]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When loading Redis recognizes that the AOF file starts with the &quot;REDIS&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># string and loads the prefixed RDB file, and continues loading the AOF</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># tail.</span></span>
<span class="line"><span style="color:#FFCB6B;">aof-use-rdb-preamble</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################ LUA SCRIPTING  ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Max execution time of a Lua script in milliseconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If the maximum execution time is reached Redis will log that a script is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># still in execution after the maximum allowed time and will start to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># reply to queries with an error.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When a long running script exceeds the maximum execution time only the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># SCRIPT KILL and SHUTDOWN NOSAVE commands are available. The first can be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># used to stop a script that did not yet called write commands. The second</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is the only way to shut down the server in the case a write command was</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># already issued by the script but the user doesn&#39;t want to wait for the natural</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># termination of the script.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set it to 0 or a negative value for unlimited execution without warnings.</span></span>
<span class="line"><span style="color:#FFCB6B;">lua-time-limit</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################ REDIS CLUSTER  ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Normal Redis instances can&#39;t be part of a Redis Cluster; only nodes that are</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># started as cluster nodes can. In order to start a Redis instance as a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster node enable the cluster support uncommenting the following:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-enabled yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Every cluster node has a cluster configuration file. This file is not</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># intended to be edited by hand. It is created and updated by Redis nodes.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Every Redis Cluster node requires a different cluster configuration file.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Make sure that instances running in the same system do not have</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># overlapping cluster configuration file names.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-config-file nodes-6379.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Cluster node timeout is the amount of milliseconds a node must be unreachable</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for it to be considered in failure state.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Most other internal time limits are multiple of the node timeout.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-node-timeout 15000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A replica of a failing master will avoid to start a failover if its data</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># looks too old.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># There is no simple way for a replica to actually have an exact measure of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># its &quot;data age&quot;, so the following two checks are performed:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1) If there are multiple replicas able to failover, they exchange messages</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    in order to try to give an advantage to the replica with the best</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    replication offset (more data from the master processed).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    Replicas will try to get their rank by offset, and apply to the start</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    of the failover a delay proportional to their rank.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2) Every single replica computes the time of the last interaction with</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    its master. This can be the last ping or command received (if the master</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    is still in the &quot;connected&quot; state), or the time that elapsed since the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    disconnection with the master (if the replication link is currently down).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    If the last interaction is too old, the replica will not try to failover</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    at all.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The point &quot;2&quot; can be tuned by user. Specifically a replica will not perform</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the failover if, since the last interaction with the master, the time</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># elapsed is greater than:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   (node-timeout * replica-validity-factor) + repl-ping-replica-period</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># So for example if node-timeout is 30 seconds, and the replica-validity-factor</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is 10, and assuming a default repl-ping-replica-period of 10 seconds, the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica will not try to failover if it was not able to talk with the master</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for longer than 310 seconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A large replica-validity-factor may allow replicas with too old data to failover</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a master, while a too small value may prevent the cluster from being able to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># elect a replica at all.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For maximum availability, it is possible to set the replica-validity-factor</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to a value of 0, which means, that replicas will always try to failover the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># master regardless of the last time they interacted with the master.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># (However they&#39;ll always try to apply a delay proportional to their</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># offset rank).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Zero is the only value able to guarantee that when all the partitions heal</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the cluster will always be able to continue.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-replica-validity-factor 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Cluster replicas are able to migrate to orphaned masters, that are masters</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that are left without working replicas. This improves the cluster ability</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to resist to failures as otherwise an orphaned master can&#39;t be failed over</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in case of failure if it has no working replicas.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Replicas migrate to orphaned masters only if there are still at least a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># given number of other working replicas for their old master. This number</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is the &quot;migration barrier&quot;. A migration barrier of 1 means that a replica</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will migrate only if there is at least 1 other working replica for its master</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and so forth. It usually reflects the number of replicas you want for every</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># master in your cluster.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Default is 1 (replicas migrate only if their masters remain with at least</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># one replica). To disable migration just set it to a very large value.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A value of 0 can be set but is useful only for debugging and dangerous</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in production.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-migration-barrier 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default Redis Cluster nodes stop accepting queries if they detect there</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is at least an hash slot uncovered (no available node is serving it).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This way if the cluster is partially down (for example a range of hash slots</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># are no longer covered) all the cluster becomes, eventually, unavailable.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It automatically returns available as soon as all the slots are covered again.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># However sometimes you want the subset of the cluster which is working,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to continue to accept queries for the part of the key space that is still</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># covered. In order to do so, just set the cluster-require-full-coverage</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># option to no.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-require-full-coverage yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This option, when set to yes, prevents replicas from trying to failover its</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># master during master failures. However the master can still perform a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># manual failover, if forced to do so.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This is useful in different scenarios, especially in the case of multiple</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># data center operations, where we want one side to never be promoted if not</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in the case of a total DC failure.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-replica-no-failover no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In order to setup your cluster make sure to read the documentation</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># available at http://redis.io web site.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">########################## CLUSTER DOCKER/NAT support  ########################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In certain deployments, Redis Cluster nodes address discovery fails, because</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># addresses are NAT-ted or because ports are forwarded (the typical case is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Docker and other containers).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In order to make Redis Cluster working in such environments, a static</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># configuration where each node knows its public address is needed. The</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># following two options are used for this scope, and are:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># * cluster-announce-ip</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># * cluster-announce-port</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># * cluster-announce-bus-port</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Each instruct the node about its address, client port, and cluster message</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># bus port. The information is then published in the header of the bus packets</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># so that other nodes will be able to correctly map the address of the node</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># publishing the information.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If the above options are not used, the normal Redis Cluster auto-detection</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will be used instead.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Note that when remapped, the bus port may not be at the fixed offset of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># clients port + 10000, so you can specify any port and bus-port depending</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># on how they get remapped. If the bus-port is not set, a fixed offset of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 10000 will be used as usually.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Example:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-announce-ip 10.1.1.5</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-announce-port 6379</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cluster-announce-bus-port 6380</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################## SLOW LOG ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The Redis Slow Log is a system to log queries that exceeded a specified</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># execution time. The execution time does not include the I/O operations</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># like talking with the client, sending the reply and so forth,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># but just the time needed to actually execute the command (this is the only</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># stage of command execution where the thread is blocked and can not serve</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># other requests in the meantime).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You can configure the slow log with two parameters: one tells Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># what is the execution time, in microseconds, to exceed in order for the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># command to get logged, and the other parameter is the length of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># slow log. When a new command is logged the oldest one is removed from the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># queue of logged commands.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The following time is expressed in microseconds, so 1000000 is equivalent</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to one second. Note that a negative number disables the slow log, while</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a value of zero forces the logging of every command.</span></span>
<span class="line"><span style="color:#FFCB6B;">slowlog-log-slower-than</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># There is no limit to this length. Just be aware that it will consume memory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You can reclaim memory used by the slow log with SLOWLOG RESET.</span></span>
<span class="line"><span style="color:#FFCB6B;">slowlog-max-len</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">128</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">################################ LATENCY MONITOR ##############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The Redis latency monitoring subsystem samples different operations</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># at runtime in order to collect data related to possible sources of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># latency of a Redis instance.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Via the LATENCY command this information is available to the user that can</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># print graphs and obtain reports.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The system only logs operations that were performed in a time equal or</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># greater than the amount of milliseconds specified via the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># latency-monitor-threshold configuration directive. When its value is set</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to zero, the latency monitor is turned off.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default latency monitoring is disabled since it is mostly not needed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># if you don&#39;t have latency issues, and collecting data has a performance</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># impact, that while very small, can be measured under big load. Latency</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># monitoring can easily be enabled at runtime using the command</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># &quot;CONFIG SET latency-monitor-threshold &lt;milliseconds&gt;&quot; if needed.</span></span>
<span class="line"><span style="color:#FFCB6B;">latency-monitor-threshold</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">############################# EVENT NOTIFICATION ##############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis can notify Pub/Sub clients about events happening in the key space.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This feature is documented at http://redis.io/topics/notifications</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For instance if keyspace events notification is enabled, and a client</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># performs a DEL operation on key &quot;foo&quot; stored in the Database 0, two</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># messages will be published via Pub/Sub:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># PUBLISH __keyspace@0__:foo del</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># PUBLISH __keyevent@0__:del foo</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># It is possible to select the events that Redis will notify among a set</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of classes. Every class is identified by a single character:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  K     Keyspace events, published with __keyspace@&lt;db&gt;__ prefix.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  E     Keyevent events, published with __keyevent@&lt;db&gt;__ prefix.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  $     String commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  l     List commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  s     Set commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  h     Hash commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  z     Sorted set commands</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  x     Expired events (events generated every time a key expires)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  e     Evicted events (events generated when a key is evicted for maxmemory)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  A     Alias for g$lshzxe, so that the &quot;AKE&quot; string means all the events.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  The &quot;notify-keyspace-events&quot; takes as argument a string that is composed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  of zero or multiple characters. The empty string means that notifications</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  are disabled.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  Example: to enable list and generic events, from the point of view of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#           event name, use:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  notify-keyspace-events Elg</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  Example 2: to get the stream of the expired keys subscribing to channel</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#             name __keyevent@0__:expired use:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  notify-keyspace-events Ex</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  By default all notifications are disabled because most users don&#39;t need</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  this feature and the feature has some overhead. Note that if you don&#39;t</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  specify at least one of K or E, no events will be delivered.</span></span>
<span class="line"><span style="color:#FFCB6B;">notify-keyspace-events</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">############################### ADVANCED CONFIG ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Hashes are encoded using a memory efficient data structure when they have a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># small number of entries, and the biggest entry does not exceed a given</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># threshold. These thresholds can be configured using the following directives.</span></span>
<span class="line"><span style="color:#82AAFF;">hash</span><span style="color:#FFCB6B;">-max-ziplist-entries</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">512</span></span>
<span class="line"><span style="color:#82AAFF;">hash</span><span style="color:#FFCB6B;">-max-ziplist-value</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">64</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Lists are also encoded in a special way to save a lot of space.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The number of entries allowed per internal list node can be specified</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># as a fixed maximum size or a maximum number of elements.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># For a fixed maximum size, use -5 through -1, meaning:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -5: max size: 64 Kb  &lt;-- not recommended for normal workloads</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -4: max size: 32 Kb  &lt;-- not recommended</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -3: max size: 16 Kb  &lt;-- probably not recommended</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -2: max size: 8 Kb   &lt;-- good</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -1: max size: 4 Kb   &lt;-- good</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Positive numbers mean store up to _exactly_ that number of elements</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># per list node.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The highest performing option is usually -2 (8 Kb size) or -1 (4 Kb size),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># but if your use case is unique, adjust the settings as necessary.</span></span>
<span class="line"><span style="color:#FFCB6B;">list-max-ziplist-size</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Lists may also be compressed.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Compress depth is the number of quicklist ziplist nodes from *each* side of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the list to *exclude* from compression.  The head and tail of the list</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># are always uncompressed for fast push/pop operations.  Settings are:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 0: disable all list compression</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1: depth 1 means &quot;don&#39;t start compressing until after 1 node into the list,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    going from either the head or tail&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    So: [head]-&gt;node-&gt;node-&gt;...-&gt;node-&gt;[tail]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    [head], [tail] will always be uncompressed; inner nodes will compress.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2: [head]-&gt;[next]-&gt;node-&gt;node-&gt;...-&gt;node-&gt;[prev]-&gt;[tail]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    2 here means: don&#39;t compress head or head-&gt;next or tail-&gt;prev or tail,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    but compress all nodes between them.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3: [head]-&gt;[next]-&gt;[next]-&gt;node-&gt;node-&gt;...-&gt;node-&gt;[prev]-&gt;[prev]-&gt;[tail]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># etc.</span></span>
<span class="line"><span style="color:#FFCB6B;">list-compress-depth</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Sets have a special encoding in just one case: when a set is composed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of just strings that happen to be integers in radix 10 in the range</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of 64 bit signed integers.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The following configuration setting sets the limit in the size of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># set in order to use this special memory saving encoding.</span></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#FFCB6B;">-max-intset-entries</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">512</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Similarly to hashes and lists, sorted sets are also specially encoded in</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># order to save a lot of space. This encoding is only used when the length and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># elements of a sorted set are below the following limits:</span></span>
<span class="line"><span style="color:#FFCB6B;">zset-max-ziplist-entries</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">128</span></span>
<span class="line"><span style="color:#FFCB6B;">zset-max-ziplist-value</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">64</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># HyperLogLog sparse representation bytes limit. The limit includes the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 16 bytes header. When an HyperLogLog using the sparse representation crosses</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># this limit, it is converted into the dense representation.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A value greater than 16000 is totally useless, since at that point the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># dense representation is more memory efficient.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The suggested value is ~ 3000 in order to have the benefits of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the space efficient encoding without slowing down too much PFADD,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># which is O(N) with the sparse encoding. The value can be raised to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ~ 10000 when CPU is not a concern, but space is, and the data set is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># composed of many HyperLogLogs with cardinality in the 0 - 15000 range.</span></span>
<span class="line"><span style="color:#FFCB6B;">hll-sparse-max-bytes</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Streams macro node max size / items. The stream data structure is a radix</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># tree of big nodes that encode multiple items inside. Using this configuration</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># it is possible to configure how big a single node can be in bytes, and the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># maximum number of items it may contain before switching to a new node when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># appending new stream entries. If any of the following settings are set to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># zero, the limit is ignored, so for instance it is possible to set just a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># max entires limit by setting max-bytes to 0 and max-entries to the desired</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># value.</span></span>
<span class="line"><span style="color:#FFCB6B;">stream-node-max-bytes</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4096</span></span>
<span class="line"><span style="color:#FFCB6B;">stream-node-max-entries</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Active rehashing uses 1 millisecond every 100 milliseconds of CPU time in</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># order to help rehashing the main Redis hash table (the one mapping top-level</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># keys to values). The hash table implementation Redis uses (see dict.c)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># performs a lazy rehashing: the more operation you run into a hash table</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that is rehashing, the more rehashing &quot;steps&quot; are performed, so if the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># server is idle the rehashing is never complete and some more memory is used</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># by the hash table.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default is to use this millisecond 10 times every second in order to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># actively rehash the main dictionaries, freeing memory when possible.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># If unsure:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># use &quot;activerehashing no&quot; if you have hard latency requirements and it is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># not a good thing in your environment that Redis can reply from time to time</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to queries with 2 milliseconds delay.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># use &quot;activerehashing yes&quot; if you don&#39;t have such hard requirements but</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># want to free memory asap when possible.</span></span>
<span class="line"><span style="color:#FFCB6B;">activerehashing</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The client output buffer limits can be used to force disconnection of clients</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># that are not reading data from the server fast enough for some reason (a</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># common reason is that a Pub/Sub client can&#39;t consume messages as fast as the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># publisher can produce them).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The limit can be set differently for the three different classes of clients:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># normal -&gt; normal clients including MONITOR clients</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># replica  -&gt; replica clients</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># pubsub -&gt; clients subscribed to at least one pubsub channel or pattern</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The syntax of every client-output-buffer-limit directive is the following:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># client-output-buffer-limit &lt;class&gt; &lt;hard limit&gt; &lt;soft limit&gt; &lt;soft seconds&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A client is immediately disconnected once the hard limit is reached, or if</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the soft limit is reached and remains reached for the specified number of</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># seconds (continuously).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># So for instance if the hard limit is 32 megabytes and the soft limit is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 16 megabytes / 10 seconds, the client will get disconnected immediately</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># if the size of the output buffers reach 32 megabytes, but will also get</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># disconnected if the client reaches 16 megabytes and continuously overcomes</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the limit for 10 seconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default normal clients are not limited because they don&#39;t receive data</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># without asking (in a push way), but just after a request, so only</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># asynchronous clients may create a scenario where data is requested faster</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># than it can read.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Instead there is a default limit for pubsub and replica clients, since</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># subscribers and replicas receive data in a push fashion.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Both the hard or the soft limit can be disabled by setting them to zero.</span></span>
<span class="line"><span style="color:#FFCB6B;">client-output-buffer-limit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">normal</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#FFCB6B;">client-output-buffer-limit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">replica</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">256mb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">64mb</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span></span>
<span class="line"><span style="color:#FFCB6B;">client-output-buffer-limit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pubsub</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">32mb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">8mb</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Client query buffers accumulate new commands. They are limited to a fixed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># amount by default in order to avoid that a protocol desynchronization (for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># instance due to a bug in the client) will lead to unbound memory usage in</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the query buffer. However you can configure it here if you have very special</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># needs, such us huge multi/exec requests or alike.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># client-query-buffer-limit 1gb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In the Redis protocol, bulk requests, that are, elements representing single</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># strings, are normally limited ot 512 mb. However you can change this limit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># here.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># proto-max-bulk-len 512mb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis calls an internal function to perform many background tasks, like</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># closing connections of clients in timeout, purging expired keys that are</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># never requested, and so forth.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Not all tasks are performed with the same frequency, but Redis checks for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># tasks to perform according to the specified &quot;hz&quot; value.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># By default &quot;hz&quot; is set to 10. Raising the value will use more CPU when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis is idle, but at the same time will make Redis more responsive when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># there are many keys expiring at the same time, and timeouts may be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># handled with more precision.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The range is between 1 and 500, however a value over 100 is usually not</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a good idea. Most users should use the default of 10 and raise this up to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 100 only in environments where very low latency is required.</span></span>
<span class="line"><span style="color:#FFCB6B;">hz</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Normally it is useful to have an HZ value which is proportional to the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># number of clients connected. This is useful in order, for instance, to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># avoid too many clients are processed for each background task invocation</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to avoid latency spikes.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Since the default HZ value by default is conservatively set to 10, Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># offers, and enables by default, the ability to use an adaptive HZ value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># which will temporary raise when there are many connected clients.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When dynamic HZ is enabled, the actual configured HZ will be used as</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># as a baseline, but multiples of the configured HZ value will be actually</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># used as needed once more clients are connected. In this way an idle</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># instance will use very little CPU time while a busy instance will be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># more responsive.</span></span>
<span class="line"><span style="color:#FFCB6B;">dynamic-hz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When a child rewrites the AOF file, if the following option is enabled</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the file will be fsync-ed every 32 MB of data generated. This is useful</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to commit the file to the disk more incrementally and avoid</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># big latency spikes.</span></span>
<span class="line"><span style="color:#FFCB6B;">aof-rewrite-incremental-fsync</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># When redis saves RDB file, if the following option is enabled</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the file will be fsync-ed every 32 MB of data generated. This is useful</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in order to commit the file to the disk more incrementally and avoid</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># big latency spikes.</span></span>
<span class="line"><span style="color:#FFCB6B;">rdb-save-incremental-fsync</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Redis LFU eviction (see maxmemory setting) can be tuned. However it is a good</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># idea to start with the default settings and only change them after investigating</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># how to improve the performances and how the keys LFU change over time, which</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># is possible to inspect via the OBJECT FREQ command.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># There are two tunable parameters in the Redis LFU implementation: the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># counter logarithm factor and the counter decay time. It is important to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># understand what the two parameters mean before changing them.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The LFU counter is just 8 bits per key, it&#39;s maximum value is 255, so Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># uses a probabilistic increment with logarithmic behavior. Given the value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of the old counter, when a key is accessed, the counter is incremented in</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># this way:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1. A random number R between 0 and 1 is extracted.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2. A probability P is calculated as 1/(old_value*lfu_log_factor+1).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3. The counter is incremented only if R &lt; P.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default lfu-log-factor is 10. This is a table of how the frequency</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># counter changes with a different number of accesses with different</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># logarithmic factors:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># | factor | 100 hits   | 1000 hits  | 100K hits  | 1M hits    | 10M hits   |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># | 0      | 104        | 255        | 255        | 255        | 255        |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># | 1      | 18         | 49         | 255        | 255        | 255        |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># | 10     | 10         | 18         | 142        | 255        | 255        |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># | 100    | 8          | 11         | 49         | 143        | 255        |</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># NOTE: The above table was obtained by running the following commands:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   redis-benchmark -n 1000000 incr foo</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   redis-cli object freq foo</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># NOTE 2: The counter initial value is 5 in order to give new objects a chance</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to accumulate hits.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The counter decay time is the time, in minutes, that must elapse in order</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># for the key counter to be divided by two (or decremented if it has a value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># less &lt;= 10).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The default value for the lfu-decay-time is 1. A Special value of 0 means to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># decay the counter every time it happens to be scanned.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># lfu-log-factor 10</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># lfu-decay-time 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">########################### ACTIVE DEFRAGMENTATION #######################</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># WARNING THIS FEATURE IS EXPERIMENTAL. However it was stress tested</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># even in production and manually tested by multiple engineers for some</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># time.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># What is active defragmentation?</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -------------------------------</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Active (online) defragmentation allows a Redis server to compact the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># spaces left between small allocations and deallocations of data in memory,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># thus allowing to reclaim back memory.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Fragmentation is a natural process that happens with every allocator (but</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># less so with Jemalloc, fortunately) and certain workloads. Normally a server</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># restart is needed in order to lower the fragmentation, or at least to flush</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># away all the data and create it again. However thanks to this feature</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># implemented by Oran Agra for Redis 4.0 this process can happen at runtime</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># in an &quot;hot&quot; way, while the server is running.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Basically when the fragmentation is over a certain level (see the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># configuration options below) Redis will start to create new copies of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># values in contiguous memory regions by exploiting certain specific Jemalloc</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># features (in order to understand if an allocation is causing fragmentation</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># and to allocate it in a better place), and at the same time, will release the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># old copies of the data. This process, repeated incrementally for all the keys</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># will cause the fragmentation to drop back to normal values.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Important things to understand:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 1. This feature is disabled by default, and only works if you compiled Redis</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    to use the copy of Jemalloc we ship with the source code of Redis.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    This is the default with Linux builds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 2. You never need to enable this feature if you don&#39;t have fragmentation</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    issues.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 3. Once you experience fragmentation, you can enable this feature when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    needed with the command &quot;CONFIG SET activedefrag yes&quot;.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The configuration parameters are able to fine tune the behavior of the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># defragmentation process. If you are not sure about what they mean it is</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a good idea to leave the defaults untouched.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Enabled active defragmentation</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># activedefrag yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Minimum amount of fragmentation waste to start active defrag</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-ignore-bytes 100mb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Minimum percentage of fragmentation to start active defrag</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-threshold-lower 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Maximum percentage of fragmentation at which we use maximum effort</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-threshold-upper 100</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Minimal effort for defrag in CPU percentage</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-cycle-min 5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Maximal effort for defrag in CPU percentage</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-cycle-max 75</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Maximum number of set/hash/zset/list fields that will be processed from</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># the main dictionary scan</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># active-defrag-max-scan-fields 1000</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="mysql" tabindex="-1">mysql <a class="header-anchor" href="#mysql" aria-label="Permalink to &quot;mysql&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3306</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">3306</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--privileged=true</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/mysql/log:/var/log/mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/mysql/data:/var/lib/mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/mysql/conf:/etc/mysql/conf.d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-e</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MYSQL_ROOT_PASSWORD=</span><span style="color:#F78C6C;">123456</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql:</span><span style="color:#F78C6C;">5.7</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">exec</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-it</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">bash</span></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-uroot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">CREATE</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">USER</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">admin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">IDENTIFIED</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">BY</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">admin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ALTER</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">USER</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">IDENTIFIED</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">WITH</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql_native_password</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">BY</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 8.0</span></span>
<span class="line"><span style="color:#FFCB6B;">ALTER</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">USER</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xiaoyi</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">IDENTIFIED</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">WITH</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql_native_password</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">BY</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xiaoyi1255Admin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 5.7</span></span>
<span class="line"><span style="color:#FFCB6B;">GRANT</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ALL</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PRIVILEGES</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ON</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">.</span><span style="color:#A6ACCD;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TO</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xiaoyi</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">IDENTIFIED</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">BY</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xiaoyi1255</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">WITH</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GRANT</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">OPTION</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">FLUSH</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PRIVILEGES</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="防火墙" tabindex="-1">防火墙 <a class="header-anchor" href="#防火墙" aria-label="Permalink to &quot;防火墙&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 启动防火墙</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看当前放行了哪些端口</span></span>
<span class="line"><span style="color:#FFCB6B;">firewall-cmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--zone=public</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--list-ports</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 添加放行8888端口</span></span>
<span class="line"><span style="color:#FFCB6B;">firewall-cmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--zone=public</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--add-port=8888/tcp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--permanent</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#重新加载系统防火墙配置，每次执行完添加或删除端口都要执行这条让它生效</span></span>
<span class="line"><span style="color:#FFCB6B;">firewall-cmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--reload</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="端口占用" tabindex="-1">端口占用 <a class="header-anchor" href="#端口占用" aria-label="Permalink to &quot;端口占用&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">netstat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-tunlp</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3000</span></span>
<span class="line"><span style="color:#82AAFF;">kill</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-9</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxxx</span></span>
<span class="line"></span></code></pre></div>`,17),o=[t];function p(i,c,r,y,f,d){return n(),a("div",null,o)}const u=s(e,[["render",p]]);export{E as __pageData,u as default};
