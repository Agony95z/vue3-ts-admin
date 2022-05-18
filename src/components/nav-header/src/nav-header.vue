<template>
  <div class="nav-header">
    <el-icon :size="30" @click="handleFoldClick">
      <expand v-if="!isFold" />
      <fold v-if="isFold" />
    </el-icon>
    <div class="content">
      <self-breadcrumb :breadcrumbs="breadcrumbs" />
      <nav-info />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import selfBreadcrumb from '@/base-ui/breadcrumb/index'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import NavInfo from './nav-info.vue'
export default defineComponent({
  components: {
    Expand,
    Fold,
    selfBreadcrumb,
    NavInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑的数据: [{name: , path: }]
    const breadcrumbs = computed(() => {
      const path = useRoute().path
      const userMenus = useStore().state.login.userMenus
      return pathMapBreadcrumbs(userMenus, path)
    })
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
