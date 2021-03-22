<template>
  <div class="synthesis-box">
    <header-tab :tabindex="index" />
    <el-row type="flex" class="home-content" :gutter="20">
      <el-col :span="6">
        <div>感知设备</div>
        <div>监控设备</div>
        <div>人防力量</div>
      </el-col>
      <el-col :span="9">
        <div>报警统计</div>
        <div class="flex-info">
          <div>报警处理统计</div>
          <div>报警处置率</div>
        </div>
      </el-col>
      <el-col :span="9">
        <div>合作目标列表</div>
        <div>扣押列表</div>
        <div>无人机监管统计</div>
        <div>公安部推送无人机数据</div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.synthesis-box{
  height:100%;
  background:url(../../assets/synthesis_state/timg.png) center no-repeat fixed;
}
.home-content{
	height:100%;
	padding:0 20px;
}
.el-col div{
	border:1px solid blue;
	margin:0 0 20px 0;
}
.el-col .flex-info{
	border:0 none;
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
}
.flex-info div{
	flex:0 0 48%;
}
</style>

<script>
import { resetRem } from '@/utils/rem'
import HeaderTab from '@/components/HeaderTab'
export default {
  name: 'PageOne',
  components: {
    HeaderTab
  },
  data() {
    return {
      index: '1'
    }
  },
  created() {
    resetRem()
  }
}
</script>
