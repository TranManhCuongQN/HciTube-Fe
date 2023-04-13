import { playList } from './../types/playList.type'
const path = {
  home: '/',
  login: '/login',
  register: '/register',
  detail: '/:id',
  verify: '/verify',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  upload: '/upload',
  content: '/content',
  analytics: '/analytics',
  changePassword: 'changePassword',
  channel: '/channel',
  video: '/videos',
  playLists: '/playlists',
  about: '/about'
} as const
export default path
