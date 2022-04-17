<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><message /></el-icon>
            <span>验证码登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginFn"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Message } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    Avatar,
    Message,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    // 调用子组件accountRef中的accountLoginFn
    const handleLoginFn = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.accountLoginFn(isKeepPassword.value)
      } else {
        console.log('phoneRef')
      }
    }
    return {
      isKeepPassword,
      handleLoginFn,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
  /deep/ .el-icon {
    vertical-align: middle;
  }
}
</style>
