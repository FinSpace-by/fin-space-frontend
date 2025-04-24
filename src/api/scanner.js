import { instance } from '.'

const SCANNER_PATH = '/parse'

export const scannerApi = {
  sendImage: (body) => instance.post(`${SCANNER_PATH}/check`, body),
  sendCode: (body) => instance.post(`/receipts`, body),
}
