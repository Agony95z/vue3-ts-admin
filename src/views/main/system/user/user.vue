<template>
  <div class="user">
    <!-- <self-form :formItems="formItems"></self-form> -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :pageName="'users'"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
// import selfTable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
    // selfTable
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    return {
      pageContentRef, // 内容区dom
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped lang="less"></style>
