<template>
  <div class="page-content">
    <self-table :listData="pageListData" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button type="primary" size="medium" @click="handleNewData">
          新建用户
        </el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'primary' : 'info'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- 数据在子组件内部 此处为父级 也就是数据的编排者 -->
      <template #create="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #update="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </div>
      </template>
    </self-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import selfTable from '@/base-ui/table'
import { useStore } from '@/store/index'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    selfTable
  },
  setup(props) {
    const store = useStore()
    // 获取列表信息
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }
    getPageData()
    // const userList = computed(() => store.state.system.usersList)
    // const userCount = computed(() => store.state.system.usersTotalCount)
    // 2.获取页面数据
    const pageListData = computed(() =>
      // props.pageName父级传递过来的
      store.getters['system/pageListData'](props.pageName)
    )

    // 3.footer
    const totalCount = computed(() =>
      store.getters['system/pageListDataCount'](props.pageName)
    )
    return {
      pageListData,
      totalCount,
      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
