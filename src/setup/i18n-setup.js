import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../lang'
import help from '../lang/help'

window.Vue = Vue // i18n required

Vue.use(VueI18n)

export const i18n = new VueI18n({
    locale: 'zh-CN', // 设置语言环境
    fallbackLocale: 'en',
    messages // 设置语言环境信息
})

const loadedLanguages = ['en'] // 我们的预装默认语言

/**
 * add help doc
 * @param {*} lang
 * @param {*} helpMd
 */
export function setHelp(lang, helpMd) {
    help[lang] = helpMd
}

/**
 * set locale
 * @param {*} lang
 */
export function setI18nLocale(lang) {
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

/**
 * set lang and messages
 * @param {*} lang
 * @param {*} messages
 */
export function setLangMessages(lang, messages) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            i18n.setLocaleMessage(lang, messages)
            loadedLanguages.push(lang)
            return setI18nLocale(lang)
        }
        return setI18nLocale(lang)
    }
    return lang
}
