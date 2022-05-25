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
      label: '角色名称',
      rules: [],
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      label: '权限类型',
      rules: [],
      type: 'input',
      placeholder: '请输入权限类型'
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
