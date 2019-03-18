/**
 * perfect markdown
 */
import editor from './views/editor'
import markdownIt from './utils/md'
import markdownBody from './store/modules/markdownBody'
const pmdEditor = {
    markdownIt: markdownIt,
    editor: editor,
    install: function (Vue, options = {}) {
        Vue.component('pmd', editor)
        options.store && options.store.registerModule('markdownBody', markdownBody)
    }
}

export default pmdEditor
