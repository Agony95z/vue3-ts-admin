<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      status-icon
      :rules="messageRules"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="name">
        <el-input v-model.number="accountForm.name" />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="verify-code">
          <el-input v-model="accountForm.password" autocomplete="off" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { messageRules } from '../config/account-config'
// import type { FormInstance } from 'element-plus'
export default defineComponent({
  setup() {
    const accountForm = reactive({
      name: '',
      password: ''
    })
    return {
      messageRules,
      accountForm
    }
  }
})
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
