/**
 * loader js/css
 *
 * loader.loadScript('xxx.js', option, function() { ... })
 * loader.loadLink('yyy.css', function() { ... })
 *
 */

let loader = {
    error: function (msg) {
        throw new Error(msg)
    },
    ua: window.navigator.userAgent.toLowerCase(),
    ie: /msie/.test(navigator.userAgent) && !/opera/.test(navigator.userAgent)
}

const doc = window.document

const types = ['Array', 'Function', 'Object', 'String', 'Number', 'Boolean', 'Date']
const nativeForEach = types.forEach
const emptyFunc = function () { }
const head = doc.head || doc.getElementsByTagName('head')[0]
let hash = {}

function forEach(obj, iterator, context) {
    if (obj == null) return
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context)
    } else if (obj.length === +obj.length) {
        for (var i = 0; i < obj.length; i++) {
            if (iterator.call(context || obj[i], obj[i], i, obj) === true) return
        }
    } else {
        for (var k in obj) {
            if (iterator.call(context || obj[k], obj[k], k, obj) === true) return
        }
    }
}

forEach(types, function (name) {
    loader['is' + name] = function (obj) {
        if (obj === undefined || obj === null) return false
        return Object.prototype.toString.call(obj) === '[object ' + name + ']'
    }
})

function createEl(type, attrs) {
    let el = doc.createElement(type)
    let attr
    for (attr in attrs) {
        el.setAttribute(attr, attrs[attr])
    }
    return el
}
function done(list, obj) {
    hash[obj.url] = true
    list.shift()
    if (!list.length) {
        obj.callback.call(obj.scope)
    }
}
function load(type, urls, option, callback) {
    if (loader.isString(urls)) {
        urls = [urls]
    }

    if (loader.isFunction(option)) {
        callback = option
        option = {}
    }

    option = option || {}
    const obj = {
        scope: option.scope || window,
        callback: callback || emptyFunc
    }
    let list = [].concat(urls)
    const charset = option.charset || 'utf-8'

    forEach(urls, function (url, i) {
        let el = null
        if (hash[url]) {
            console.warn('warning: ' + url + ' has loaded.')
        }

        if (type === 'js') {
            el = createEl('script', {
                src: url,
                async: 'async',
                charset: charset
            })
        } else {
            el = createEl('link', {
                href: url,
                rel: 'stylesheet',
                type: 'text/css'
            })
        }

        (function (url) {
            if (loader.ie) {
                el.onreadystatechange = function () {
                    const readyState = this.readyState
                    if (readyState === 'loaded' || readyState === 'complete') {
                        obj.url = url
                        this.onreadystatechange = null
                        done(list, obj)
                    }
                }
            } else {
                if (type === 'js') {
                    el.onload = function () {
                        obj.url = url
                        setTimeout(() => {
                            done(list, obj)
                        }, 200)
                    }
                    el.onerror = function () {
                        loader.error(url + ' 不存在')
                    }
                } else {
                    setTimeout(function () {
                        obj.url = url
                        done(list, obj)
                    }, 100)
                }
            }
        })(url)

        if (type === 'js') {
            head.insertBefore(el, head.firstChild)
        } else {
            head.appendChild(el)
        }
    })
}

loader.loadScript = function (urls, option, callback) {
    load('js', urls, option, callback)
}

loader.loadLink = function (urls, option, callback) {
    load('css', urls, option, callback)
}

export default loader
