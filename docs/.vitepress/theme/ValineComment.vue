<template>
  <!-- <h1>有理解不到位的地方，欢迎在评论区指出！！！</h1> -->
  <div class="page">
    <section class="page-edit">
      <div class="page-edit-read">
        <span class="leancloud-visitors" :data-flag-title="pageTitle">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch, onMounted, ref } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
const pageTitle = ref('默认pageTitle')
const initValine = () => {
  let path = location.origin + location.pathname;
  document.getElementsByClassName("leancloud-visitors")[0].id = path;
  pageTitle.value = `${document.querySelector('.is-active .text')?.innerHTML}:(${location.pathname})`
  new Valine({
    el: "#vcomments",
    appId: "Iicq7kgu05xqkYFa5CpPO8sE-gzGzoHsz", // your appId
    appKey: "ttLJhzck3CpcCLR9ZqFOAqBx", // your appKey
    path: path,
    visitor: true,
    avatar: "mp",
    recordIP: true,
    enableQQ: true,
    placeholder: "请在这里留下你的留言！！！",
  });
};

watch(
  () => route.path,
  () => {
    initValine();
  }
);

onMounted(() => {
  remoteImport('//unpkg.com/valine/dist/Valine.min.js').then(() => initValine());
});

function remoteImport(url) {
  return new Promise((resolve) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    head.appendChild(script);

    script.onload = function () {
      resolve();
    };
  });
}


</script>

<style scoped>
.page-edit-read {
  text-align: right;
  margin: 24px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.leancloud-visitors-count {
  color: red;
  font-size: 16px;
  font-weight: 700;
}
</style>