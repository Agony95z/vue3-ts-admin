<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view />
    </div>
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less" scoped>
.app {
  height: 100%;
}
</style>
