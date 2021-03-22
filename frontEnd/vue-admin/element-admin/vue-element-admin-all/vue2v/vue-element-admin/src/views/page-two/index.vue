<!--
 * @Author: your name
 * @Date: 2020-11-19 19:13:37
 * @LastEditTime: 2020-11-20 09:17:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OlympicsAdmin\src\views\page-two\index.vue
-->
<template>
  <div>
    <div class="map-module">
      <header-tab :tabindex="index" />
    </div>
    <iframe
      ref="iframe"
      src="/superMap/Test.html"
      style="width: 100%;
    height: 100%;"
    />
    <!-- <div class="iframeMap">
      <div
        v-loading="loading"
        class="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >

        <iframe
          ref="iframe"
          src="http://127.0.0.1:5500/Test.html"
          style="width: 100%;
    height: 100%;"
        />
      </div> -->

  </div>
</template>

<script>
import { resetRem } from '@/utils/rem'
import HeaderTab from '@/components/HeaderTab'
// import DynamicHtml from '/superMap/Test.html'
export default {
  name: 'PageTwo',
  components: {
    HeaderTab
  },
  data() {
    return {
      index: '2',
      loading: false
    }
  },
  created() {
    resetRem()
  },
  mounted() {
    this.get()
    const that = this
    window.addEventListener('message', function(e) {
      // console.log(e.data,'hhhhhhhhhhhhhhhhhhhhhhhhh    ')
      if (e.data.loading) {
        that.loading = false
        // that.$refs.iframe.contentWindow.location.reload(true);
        console.log(that.$refs.iframe, 'e.data.loading')
      }
    })

    const clientHeight = document.body.clientHeight
    this.$refs.iframe.style.height = clientHeight + 'px'
    // console.log(DynamicHtml,'clientHeight')
  },
  methods: {
    get() {
      this.$nextTick(() => {
        this.iframe = this.$refs.iframe
        this.iframeWindow = this.iframe.contentWindow
        const message = {
          loginId: 'admin',
          password: '123456'
        }
        // let setData = this.$Cookies.get('username')
        //   console.log(setData,'setData')
        setTimeout(() => {
          this.iframeWindow.postMessage(message, '*')
          //   console.log(this.iframeWindow,'this.iframeWindow')
        }, 2000)
      })
    }
  }
}
</script>
<style scoped>
.map-module {
  height: 0.85rem;
  background: url(../../assets/map_state/timg.png) center no-repeat fixed;
}
.iframeMap {
  height: 100%;
}
.iframeMap .loading {
  height: 100%;
}
</style>
