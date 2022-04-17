import { reactive } from 'vue'

export const accountRules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/,
      message: '字母开头，允许5-10字节，字母数字下划线'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]{5,10}$/,
      message: '允许5-10字节，字母数字下划线'
    }
  ]
})
export const messageRules = reactive({
  name: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      message: '请输入正确的手机号'
    }
  ],
  password: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      pattern: /^\d{6}$/,
      message: '请输入6位数验证码'
    }
  ]
})
