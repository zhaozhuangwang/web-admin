<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">综合态势</el-menu-item>
      <el-menu-item index="2">地图展示</el-menu-item>
      <el-menu-item index="3">管理平台</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item{
  height:50px;
  line-height:50px;
}
</style>

<script>
export default {
  name: 'HeaderMenu',
  data() {
    return {
      activeIndex: '3'
    }
  },
  methods: {
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
