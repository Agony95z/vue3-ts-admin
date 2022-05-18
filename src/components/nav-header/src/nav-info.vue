<template>
  <div class="nav-info">
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            size="default"
            class="avatar"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          ></el-avatar>
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><circle-close /></el-icon>退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><avatar /></el-icon>个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><key /></el-icon>修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="operation">
      <span>
        <el-icon><bell /></el-icon>
      </span>
      <span>
        <el-icon><chat-dot-round /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><postcard /></el-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import {
  CircleClose,
  Avatar,
  Key,
  Bell,
  ChatDotRound,
  Postcard
} from '@element-plus/icons-vue'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    CircleClose,
    Avatar,
    Key,
    Bell,
    ChatDotRound,
    Postcard
  },
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const router = useRouter()

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }

    return {
      name,
      handleExitClick
    }
  }
})

Number('123')
</script>

<style scoped lang="less">
.nav-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
    }
  }

  .operation {
    margin-right: 20px;
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
