<template>
  <div>
    <el-icon :size="30" @click="handleFoldClick">
      <expand v-if="!isFold" />
      <fold v-if="isFold" />
    </el-icon>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    Expand,
    Fold
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
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
