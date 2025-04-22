import { instance } from '.'

const VERIFICATION_PATH = '/verification'

export const verificationApi = {
  sendCode: (email) => instance.post(`${VERIFICATION_PATH}/send`, { email }),
  confirmCode: (email, code) => instance.post(`${VERIFICATION_PATH}/confirm`, { email, code }),
}
