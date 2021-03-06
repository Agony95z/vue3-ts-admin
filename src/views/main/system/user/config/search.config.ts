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
      field: 'realname',
      label: '真实姓名',
      rules: [],
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      label: '电话号码',
      rules: [],
      type: 'input',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      rules: [],
      placeholder: '请选择用户状态',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
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
      field: 'createAt'
    }
  ]
}
