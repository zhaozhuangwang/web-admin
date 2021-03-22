<template>
  <div class="g-header">
    <el-row type="flex">
      <el-col :span="24" class="g-header-title">
        <p>崇礼及核心区域周界防护立体化管控平台</p>
        <span class="g-edit" @click="handleEdit" />
      </el-col>
    </el-row>
    <el-row type="flex" class="g-header-tab">
      <el-col :span="12" class="g-header-time">
        <div class="g-logo" />
        <div class="g-time">{{ nowDate }}</div>
      </el-col>
      <el-col :span="12" class="g-header-link">
        <!-- @select="handleSelect" -->
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">综合态势</el-menu-item>
          <el-menu-item index="2" class="second-item">地图展示</el-menu-item>
          <el-menu-item index="3">管理平台</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { resetRem } from '@/utils/rem'
export default {
  name: 'HeaderTab',
  created() {
    resetRem()
  }
}
</script>
<style scoped>
.g-header{
  font-family:"Microsoft YaHei";
  font-weight:bold;
  height:2rem;
}
.g-header-title{
  text-align:center;
	height:.85rem;
  line-height:.85rem;
  background:url(../../assets/synthesis_state/g-header-bg.png) center center no-repeat;

	position:relative;
}
.g-header-title p{
  width: 100%;
  height:.85rem;
  line-height:.85rem;
  background:url(../../assets/synthesis_state/g-header-center.png) center center no-repeat;
  background-size: 60%;
  text-align:center;
  color:#fff;
  font-weight:bold;
  font-size:.3rem;
  margin:0;
}
.g-header-title .g-edit{
  position:absolute;
  top:.3rem;
  /* margin-top:-15px; */
  right:.2rem;
  background:url(../../assets/synthesis_state/edit.png)  no-repeat;
  background-size: 100%;
  width:.3rem;
  height:.3rem;
  cursor:pointer;
}

.g-header-tab{
  height:1rem;
  padding:0 .2rem;
}
.g-header-time{
  display:flex;
}
.g-header-time .g-logo{
  width:.8rem;
  height:.8rem;
  margin:.1rem .2rem 0 0;
  background:url(../../assets/synthesis_state/logo.png) center center no-repeat;
  background-size: 100%;
}
.g-header-time .g-time{
  padding:0 .15rem 0 .1rem;
  background:rgba(6, 4, 42, 0.49);
  border:.01rem solid #4170c8;
  margin:.2rem 0 0 0;
  font-size:.24rem;
  color:#00ffff;
  height:.6rem;
  line-height:.55rem;
}

.g-header-link{
  display:flex;
  flex:1;
  justify-content:flex-end;
}
.el-menu.el-menu--horizontal{
  border-bottom:0 none;
}
.el-menu{
  background:transparent;
}
.el-menu--horizontal > .el-menu-item{
  margin:.2rem .05rem 0 .05rem;
  width:1.4rem;
  height:.5rem;
  font-size:.22rem;
  color:#fff;
  line-height:.5rem;
  text-align:center;
  background:url(../../assets/synthesis_state/g-tab-item.png) center center no-repeat;
  cursor:pointer;
  background-size: 100%;
  padding: 0 .2rem;

}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus{
  background-color:transparent;
  color:#fff;
}
.el-menu--horizontal > .el-menu-item.is-active:not(.is-disabled):hover, .el-menu--horizontal > .el-menu-item.is-active:not(.is-disabled):focus{
  color:#00ffff;
}
.el-menu--horizontal > .el-menu-item.is-active{
  border-bottom:0 none;
  color:#00ffff;
}
.el-menu--horizontal .second-item{
  /* margin:27px 20px 0; */
}
</style>

<script>
// 引入日期格式化插件
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'HeaderTab',
  props: ['tabindex'],
  data() {
    return {
      nowDate: '',
      nowYear: '',
      activeIndex: ''
    }
  },
  mounted() {
    const _this = this
    setInterval(function() {
      // let nowDate = ''
      _this.nowDate = _this.getCurrentDateTime()
      // _this.nowYear = nowDate.slice(0, 4)
      // console.log(_this.nowYear)
    }, 1000)
    this.activeIndex = this.tabindex
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    getCurrentDateTime() {
      return moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
    },
    // 点击退出
    async handleEdit() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSelect(key, keyPath) {
      if (key === '1') {
        this.$router.push({ path: '/page-one' })
      } else if (key === '2') {
        this.$router.push({ path: '/page-two' })
      } else if (key === '3') {
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
}
</script>
