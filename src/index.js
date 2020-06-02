/**
 * perfect markdown
 */
import editor from './views/editor'
import markdownIt from './utils/md'
import markdownBody from './store/modules/markdownBody'
import { setLangMessages, setI18nLocale, i18n, setHelp } from './setup/i18n-setup'

const pmdEditor = {
    markdownIt: markdownIt,
    editor: editor,
    setI18nLocale,
    setLangMessages,
    setHelp,
    i18n,
    install: function (Vue, options = {}) {
        Vue.component('pmd', editor)
        options.store && options.store.registerModule('markdownBody', markdownBody)
    }
}

export default pmdEditor
