import { store } from '../index'

export const baseCheck = (res: { data: any }) => {
  const codes: { [key: string]: string } = {
  }
  const code = res.data.code
  const result = code !== '0'

  if (result) {
    store.message.error(codes[code] || res.data.msg)
  }
  return result
}