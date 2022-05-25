<template>
  <div class="page-search">
    <self-form v-bind="searchFormConfig" v-model="formData">
      <template #header>高级检索</template>
      <template #footer>
        <el-button type="primary" @click="handleResetClick">
          <el-icon><refresh /></el-icon>重置
        </el-button>
        <el-button type="primary" @click="handleQueryClick">
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
interface IFormData {
  [key: string]: any
}
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
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    const formOriginData: IFormData = {} // 需要设置类型
    const formItems = props.searchFormConfig.formItems ?? []
    console.log(formItems, 'ppp')
    for (const item of formItems) {
      formOriginData[item.field] = '' // formOriginData不设置接口类型 这里赋值不上
    }
    /* const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    }) */
    // 重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    // 查询
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    const formData = ref({ ...formOriginData })
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
