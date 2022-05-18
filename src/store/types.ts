import { ILoginState } from './login/types' // login模块类型
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
