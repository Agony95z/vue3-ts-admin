interface ISelectOption {
  label: string
  value: any
}

type ItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: ItemType
  label: string
  placeholder?: string
  rules?: any[]
  options?: ISelectOption[]
  // 针对特殊的属性
  otherOptions?: any
  defaultValue?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems?: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout?: any
}
