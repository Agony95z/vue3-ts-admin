<template>
  <div>
    <el-form
      ref="accountRuleFormRef"
      :model="accountForm"
      status-icon
      :rules="accountRules"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model.number="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          autocomplete="new-password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
// import type { FormInstance } from 'element-plus'
export default defineComponent({
  setup() {
    const store = useStore()
    const accountRuleFormRef = ref<InstanceType<typeof ElForm>>()
    const accountForm = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const accountLoginFn = (isKeepPassword: boolean) => {
      console.log('accountLogin登录')
      accountRuleFormRef.value?.validate((valid) => {
        if (valid) {
          // 执行登录
          // 1. 判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('name', accountForm.name)
            localCache.setCache('password', accountForm.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2. 开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...accountForm })
        }
      })
    }
    return {
      accountRules,
      accountForm,
      accountLoginFn,
      accountRuleFormRef
    }
  }
})
</script>

<style scoped lang="less"></style>
