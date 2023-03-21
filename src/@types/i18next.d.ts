/* eslint-disable import/no-unresolved */
import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  // Kế thừa (thêm vào type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    // key này là ngôn ngữ mặc định
    resources: (typeof resources)['vi']
  }
}
