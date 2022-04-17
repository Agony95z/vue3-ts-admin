import { httpRequest } from '../index'
import type { IAccount, IDataType, ILoginResult } from './types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
// 登录接口
export function accountLoginRequest(accout: IAccount) {
  // <IDataType<ILoginResult>> IDataType类型下有个ILoginResult
  return httpRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: accout
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return httpRequest.get<IDataType<any>>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 请求用户菜单权限
export function requestUserMenusRoleId(id: number) {
  return httpRequest.get<IDataType>({
    url: LoginAPI.UserMenus + `${id}/menu`,
    showLoading: false
  })
}
