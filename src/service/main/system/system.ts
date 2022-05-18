import { httpRequest } from '../../index'
import { IDataType } from './types'
export function getPageListData(pageUrl: string, queryInfo: any) {
  return httpRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}
