// reference https://github.com/CHENXCHEN/markdown-it-images-preview.git

import parseImageSize from './parseWH'

export default function (md, config) {
    md.imageAdd = function (src, data) {
        if (!(md.__image instanceof Object)) {
            md.__image = {}
        }
        md.__image[src] = data
    }
    md.imageDel = function (src) {
        if (!(md.__image instanceof Object)) {
            md.__image = {}
        }
        delete md.__image[src]
    }
    let imagedefault = md.renderer.rules.image
    md.renderer.rules.image = function (tokens, idx, options, env, slf) {
        let styleAttr = null
        if (tokens[idx].type === 'image') {
            const start = tokens[idx].content.indexOf('=')
            let result = parseImageSize(tokens[idx].content, start, tokens[idx].content.length)
            if (result.ok) {
                // 兼容 百分比写法
                const W = result.width.includes('%') ? result.width : result.width + 'px'
                const H = result.height.includes('%') ? result.height : result.height + 'px'
                styleAttr = ['style', `width: ${W};height: ${H}`]
            }
        }

        let _attrs = tokens[idx].attrs
        if (md.__image instanceof Object) {
            localAttrHandler(_attrs, styleAttr, md, tokens, idx)
        } else {
            inputAttrHandler(_attrs, styleAttr)
        }
        return imagedefault(tokens, idx, options, env, slf)
    }
}

function localAttrHandler(_attrs, styleAttr, md, tokens, idx) {
    for (let i = 0; i < _attrs.length; i++) {
        if (_attrs[i][0] === 'src' && md.__image.hasOwnProperty(tokens[idx].attrs[i][1])) {
            _attrs.push(['rel', _attrs[i][1]])
            styleAttr && _attrs.push(styleAttr) // inject style
            _attrs[i][1] = md.__image[tokens[idx].attrs[i][1]]
            break
        } else {
            styleAttr && _attrs.push(styleAttr) // modify local img
            break
        }
    }
}

function inputAttrHandler(_attrs, styleAttr) {
    for (let i = 0; i < _attrs.length; i++) {
        styleAttr && _attrs.push(styleAttr) // inject style direct input
        break
    }
}
