import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = '/api/v1/channels/login'
export const URL_REGISTER = '/api/v1/channels/signup'
export const URL_VERIFY_EMAIL = '/api/v1/channels/verify'
export const URL_LOGOUT = '/api/v1/channels/logout'
export const GET_OTP = '/api/v1/channels/get-otp'
export const URL_REFRESH_TOKEN = '/api/v1/channels/refresh-access-token'

//* C2
const authApi = {
  registerAccount(body: { email: string; password: string; fullName: string; passwordConfirm: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  },
  verify(body: { email: string; encode: string }) {
    return http.post(URL_VERIFY_EMAIL, body)
  },
  getOtp(body: { email: string }) {
    return http.post(GET_OTP, body)
  },
  forgotPassword(body: { email: string }) {
    return http.post('/api/v1/channels/forgotPassword', body)
  },
  verifyResetPassPage(body: { encode: string }) {
    return http.post('/api/v1/channels/verifyResetPass', body)
  },
  resetPassword(body: { password: string; passwordConfirm: string }, token: string) {
    return http.patch(`/api/v1/channels/resetPassword/${token}`, body)
  }
}

export default authApi
