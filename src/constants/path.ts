const path = {
  home: '/',
  login: '/login',
  register: '/register',
  detail: 'detail/:id',
  verify: '/verify',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  upload: '/upload',
  content: '/content',
  analytics: '/analytics',
  changePassword: 'changePassword',
  search: '/search',
  channel: ':id/channel',
  video: ':id/video',
  playList: ':id/playlist',
  about: ':id/about'
} as const
export default path
