export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
export interface userMenus {
  children?: any[]
  icon?: string
  id: number
  sort: number
  type: number
  url: string
}
