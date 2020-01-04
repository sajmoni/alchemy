import { setupI18n } from '@lingui/core'
import japaneseMessages from '../locale/ja/messages'
import englishMessages from '../locale/en/messages'

// setup the i18n object with active language and catalogs
const i18n = setupI18n({
  language: 'en',
  catalogs: {
    en: englishMessages,
    ja: japaneseMessages,
  },
})

export default i18n
