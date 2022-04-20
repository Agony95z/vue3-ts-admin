<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      unique-opened
      :collapse="collapse"
      default-active="2"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :class="item.name" :is="item.iconName"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <el-menu-item
              v-for="subitem in item.children"
              :key="subitem.id"
              :index="subitem.id + ''"
              @click="handleMenuItemClick(subitem)"
            >
              {{ subitem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon">
              <component :class="item.name" :is="item.iconName"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index' // 引用自己封装的store
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Monitor,
    Setting,
    Goods,
    ChatLineRound
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    console.log(props.collapse)
    const store = useStore()
    let userMenus = computed(() => store.state.login.userMenus)
    console.log(userMenus.value)
    const router = useRouter()
    const handleMenuItemClick = (item) => {
      console.log(item)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #6c9ac5;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    background: #2c68a8;
  }

  // 目录
  .el-sub-menu {
    background-color: #6c9ac5 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #84a9cb !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #6c9ac5 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #1c5f9d !important;
  }
}
// 有.el-menu-vertical没有.el-menu--collapse
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
