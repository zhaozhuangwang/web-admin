<template>
  <div>
    <div style="margin-bottom:15px;">
      <!-- $t是挂到vue.prototype上的一个方法，接受一个字符串作为参数 -->
      {{ $t('permission.roles') }}: {{ roles }}
    </div>
    {{ $t('permission.switchRoles') }}:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
