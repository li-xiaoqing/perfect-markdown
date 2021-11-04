export function insertContentAtCaret(dom, icon, payload, $vue) {
    switch (icon) {
        case 'file':
            fileInsert(dom, payload, $vue)
            break
        case 'link':
            linkInsert(dom, payload, $vue)
            break
        case 'image':
            imageInsert(dom, payload, $vue)
            break
        case 'video':
            videoInsert(dom, payload, $vue)
            break
        default:
            txtInsert(dom, icon, payload, $vue)
            break
    }
}

function fileInsert(dom, payload, $vue) {
    const textArea = dom()
    textArea.focus()
    let content = textArea.value // current value
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        let newStart = 0
        let newEnd = 0

        if (start === end) {
            // insert
            content = content.substring(0, start) + `[${payload.name}](${payload.url})` + content.substring(end, content.length)
            // foucus url by url
            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                newStart = start + 1 + payload.name.length + 1 + 1
                newEnd = newStart + `${payload.url}`.length
            }
        } else { // selected
            // select insert, ignore the input url
            content = content.substring(0, start) + `[${payload.name}](${content.substring(start, end)})` + content.substring(end, content.length)
            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                newStart = start + 1 + payload.name.length + 2
                newEnd = newStart + end - start
            }
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

function videoInsert(dom, payload, $vue) {
    const textArea = dom()
    textArea.focus()
    let content = textArea.value // current value
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        let newStart = 0
        let newEnd = 0

        if (start === end) {
            // insert
            content = content.substring(0, start) + `@[video](${payload.url})` + content.substring(end, content.length)
            // foucus url by url
            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                newStart = start + 1 + 1 + 5 + 1 + 1
                newEnd = newStart + `${payload.url}`.length
            }
        } else { // selected
            // select insert, ignore the input url
            content = content.substring(0, start) + `@[video](${content.substring(start, end)})` + content.substring(end, content.length)
            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                newStart = start + 1 + 1 + 5 + 1 + 1
                newEnd = newStart + end - start
            }
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

function isLocal(url) {
    return typeof url === 'number'
}

function linkInsert(dom, payload, $vue) {
    const textArea = dom()
    textArea.focus()
    let content = textArea.value // current value
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd

        let newStart = 0
        let newEnd = 0

        if (start === end) {
            // insert
            content = content.substring(0, start) + `[${payload.name}](${payload.url})` + content.substring(end, content.length)
            newStart = start + 1 + payload.name.length + 1 + 1
            newEnd = newStart + payload.url.length
        } else {
            // select insert, ignore the input url
            content = content.substring(0, start) + `[${payload.name}](${content.substring(start, end)})` + content.substring(end, content.length)
            newStart = start + 1 + payload.name.length + 2
            newEnd = newStart + end - start
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

function imageInsert(dom, payload, $vue) {
    const textArea = dom()
    textArea.focus()
    let content = textArea.value // current value
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        let newStart = 0
        let newEnd = 0
        let imgContent = ''
        let nameLength = 0
        if (payload.width || payload.height) {
            if (payload.width && payload.height) {
                imgContent = `![${payload.name} =${payload.width}x${payload.height}](${payload.url})`
            } else if (!payload.width) {
                imgContent = `![${payload.name} =x${payload.height}](${payload.url})`
            } else {
                imgContent = `![${payload.name} =${payload.width}x](${payload.url})`
            }
        } else {
            imgContent = `![${payload.name}](${payload.url})`
        }
        if (start === end) {
            // insert

            content = content.substring(0, start) + imgContent + content.substring(end, content.length)
            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                if (payload.width) {
                    nameLength += payload.width.toString().length
                }

                if (payload.height) {
                    nameLength += payload.height.toString().length
                }

                if (nameLength > 1) {
                    nameLength += 2 // = x 两个符号
                }
                newStart = start + 1 + 1 + payload.name.length + 1 + nameLength + 1 + 1
                newEnd = newStart + `${payload.url}`.length
            }
        } else { // selected
            // select insert, ignore the input url
            if (payload.multiple) {
                content = content.substring(0, content.length) + '\n' + imgContent
            } else {
                content = content.substring(0, start) + imgContent + content.substring(end, content.length)
            }

            if (isLocal(payload.url)) {
                newStart = newEnd = content.length
            } else {
                if (payload.multiple) {
                    newStart = newEnd = content.length
                } else {
                    if (payload.width) {
                        nameLength += payload.width.toString().length
                    }

                    if (payload.height) {
                        nameLength += payload.height.toString().length
                    }

                    if (nameLength > 1) {
                        nameLength += 2 // = x 两个符号
                    }
                    newStart = start + 2 + payload.name.length + 1 + nameLength + 2
                    newEnd = newStart + `${payload.url}`.length
                }
            }
        }

        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

function txtInsert(dom, icon, payload, $vue) {
    const textArea = dom()
    textArea.focus()
    let content = textArea.value // current value
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        const prefix = window.i18n.t(`iconConfig.${icon}.prefix`)
        const subfix = window.i18n.t(`iconConfig.${icon}.subfix`)
        const txttxt = window.i18n.t(`iconConfig.${icon}.txt`)
        const txttxtLen = txttxt.length
        const prefixLen = prefix.length
        const subfixLen = subfix.length
        let newStart = 0
        let newEnd = 0
        if (start === end) {
            content = content.substring(0, start) + `${prefix}${txttxt}${subfix}` + content.substring(end, content.length)
            newStart = start + prefixLen
            newEnd = newStart + txttxtLen
        } else {
            if (content.substring(start - prefixLen, start) === prefix && content.substring(end, end + subfixLen) === subfix) {
                // cancel
                content = content.substring(0, start - prefixLen) + content.substring(start, end) + content.substring(end + subfixLen, content.length)
                newStart = start - prefixLen
                newEnd = end - prefixLen
            } else {
                content = content.substring(0, start) + prefix + content.substring(start, end) + subfix + content.substring(end + subfixLen, content.length)
                newStart = start + prefixLen
                newEnd = start + (end - start + prefixLen)
            }
        }

        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

// insert enter
export function insertEnter(textArea, e, $vue) {
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        let newStart = 0
        let newEnd = 0
        let content = textArea.value
        // get cursor lastLine
        let lastLine = content.substring(0, start).split('\n').pop()
        let matchListNeedChangeLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+\S+/)
        if (matchListNeedChangeLine) {
            // next li
            e.preventDefault()
            // eg: [1.  test] get [1. ]
            let subfix = matchListNeedChangeLine.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift()
            if (subfix.search(/-/) >= 0) {
                // ul
                content = content.substring(0, start) + '\n' + subfix + content.substring(end, content.length)
                newStart = start + subfix.length + 1
                newEnd = start + subfix.length + 1
            } else {
                // ol
                let temp = subfix.replace(/(\d+)/, parseInt(subfix) + 1)
                content = content.substring(0, start) + '\n' + temp + content.substring(end, content.length)
                newStart = start + temp.length + 1
                newEnd = start + temp.length + 1
            }
        } else {
            let matchListNeedRemoveLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+$/)
            if (matchListNeedRemoveLine) {
                e.preventDefault()
                let preLength = matchListNeedRemoveLine.shift().length
                content = content.substring(0, start - preLength) + '\n' + content.substring(end, content.length)
                newStart = start - preLength
                newEnd = start - preLength
            } else {
                newStart = start
                newEnd = end
            }
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(newStart, newEnd)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}

// insert tab
export function insertTab(textArea, e, $vue) {
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        const tmpStr = textArea.value
        const lastLine = tmpStr.substring(0, start).split('\n').pop()
        let content = textArea.value
        if (lastLine.match(/^\s*[0-9]+\.\s+\S*/)) {
            // ol
            const temp = lastLine.replace(/(\d+)/, 1)
            content = tmpStr.substring(0, start - temp.length) + '\t' + temp + tmpStr.substring(end, tmpStr.length)
        } else if (lastLine.match(/^\s*-\s+\S*/)) {
            // ul
            content = tmpStr.substring(0, start - lastLine.length) + '\t' + lastLine + tmpStr.substring(end, tmpStr.length)
        } else {
            content = tmpStr.substring(0, start) + '\t' + tmpStr.substring(end, tmpStr.length)
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(start + 1, start + 1)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}
// shift + tab
export function unInsertTab(textArea, e, $vue) {
    if ('selectionStart' in textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        const tmpStr = textArea.value
        const lastLine = tmpStr.substring(0, start).split('\n').pop()
        let content = textArea.value
        if (lastLine.search(/\t/) >= 0) {
            // replace the last T empty
            content = tmpStr.substring(0, start - lastLine.length) + lastLine.replace(/(.*)\t/, '$1') + tmpStr.substring(end, tmpStr.length)
        }
        $vue.setTextareaContent(content)
        $vue.$nextTick(() => {
            textArea.setSelectionRange(start - 1, start - 1)
            textArea.focus()
        })
    } else {
        console.warn('the browser version is too low')
    }
}
