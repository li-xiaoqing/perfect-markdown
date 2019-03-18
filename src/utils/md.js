import MarkdownIt from 'markdown-it'

// 表情
import emoji from 'markdown-it-emoji'
// 下标
import sub from 'markdown-it-sub'
// 上标
import sup from 'markdown-it-sup'
// <dl/>
import deflist from 'markdown-it-deflist'
// <abbr/>
import abbr from 'markdown-it-abbr'
// footnote
import footnote from 'markdown-it-footnote'
// insert 带有下划线 样式 ++ ++
import ins from 'markdown-it-ins'
// mark
import mark from 'markdown-it-mark'
// taskLists
import taskLists from 'markdown-it-task-lists'
// container
import container from 'markdown-it-container'
// 目录
import toc from 'markdown-it-toc'

import mdhl from '../plugins/markdown-it-highlight/'
// math katex
import katex from 'markdown-it-katex' // todos: dynamic import
// local图片插件
import miip from '../plugins/markdown-it-images'
// todos: inject merge
const plugins = {
    emoji: emoji,
    ins: ins,
    sub: sub,
    sup: sup,
    deflist: deflist,
    abbr: abbr,
    footnote: footnote,
    mark: mark,
    taskLists: taskLists,
    container: container,
    toc: toc,
    mdhl: mdhl,
    katex: katex,
    miip: miip
}

const config = {
    html: true, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’'

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
}
// 初始化md
const md = new MarkdownIt(config)
const installConfig = {
    emoji: true,
    ins: true,
    sub: true,
    sup: true,
    deflist: true,
    abbr: true,
    footnote: true,
    mark: true,
    taskLists: true,
    container: true,
    toc: true,
    mdhl: true,
    katex: false,
    miip: true
}
// a link target
const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
    }
    return defaultRender(tokens, idx, options, env, self)
}
md.init = function (config) {
    const mergeConfig = Object.assign(installConfig, config)
    for (let key in mergeConfig) {
        if (plugins[key]) {
            mergeConfig[key] && md.use(plugins[key])
            // add container
            if (key === 'container') {
                md.use(plugins[key], 'hljs-left') /* align left */
                md.use(plugins[key], 'hljs-center')/* align center */
                md.use(plugins[key], 'hljs-right')/* align right */
            }
        }
    }
}

export default md
