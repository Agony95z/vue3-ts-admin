// 字符串首字母大写
export function changeUpperCase(str: string): string {
  const newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}
