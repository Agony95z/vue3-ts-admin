import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '100',
  itemStyle: {
    padding: '10px 20px'
  },
  colLayout: {
    lg: 8
  },
  formItems: [
    {
      field: 'id',
      label: 'ID',
      rules: [],
      type: 'input',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      label: '用户名',
      rules: [],
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      label: '密码',
      rules: [],
      type: 'input',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      rules: [],
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '篮球', value: '1' },
        { label: '足球', value: '2' }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      },
      field: 'createTime'
    }
  ]
}
