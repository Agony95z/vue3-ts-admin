<template>
  <div class="page-search">
    <self-form v-bind="searchFormConfig" v-model="formData">
      <template #header>高级检索</template>
      <template #footer>
        <el-button type="primary">
          <el-icon><refresh /></el-icon>重置
        </el-button>
        <el-button type="primary">
          <el-icon><search /></el-icon>搜索
        </el-button>
      </template>
    </self-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import selfForm from '@/base-ui/form'
import { Refresh, Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'page-search',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    selfForm,
    Refresh,
    Search
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style scoped></style>
