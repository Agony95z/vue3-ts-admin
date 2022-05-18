<template>
  <div class="user">
    <!-- <self-form :formItems="formItems"></self-form> -->
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <div class="content">
      <self-table
        :listData="userList"
        :propList="propList"
        showIndexColumn="showIndexColumn"
        showSelectColumn="showSelectColumn"
      >
        <template #status="scope">
          <el-button
            plain
            size="small"
            :type="scope.row.enable ? 'primary' : 'info'"
            >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #create="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #update="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
      </self-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import selfTable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    selfTable
  },
  setup() {
    // 获取列表信息
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      pageName: 'users',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.usersList)
    const userCount = computed(() => store.state.system.usersTotalCount)
    const showIndexColumn = true
    const showSelectColumn = true
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实名', minWidth: '120' },
      { prop: 'cellphone', label: '手机号码', minWidth: '150' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'create'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'update'
      },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]
    return {
      searchFormConfig,
      showIndexColumn,
      showSelectColumn,
      userList,
      propList
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
