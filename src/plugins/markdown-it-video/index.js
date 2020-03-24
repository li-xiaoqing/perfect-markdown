/**
 *  fork from markdown-it-video
 *  https://github.com/CenterForOpenScience/markdown-it-video/blob/master/index.js
 */

// Process @[video](videoUrl)

function videoParser(url) {
    return url
}

const EMBED_REGEX = /@\[([a-zA-Z].+)]\([\s]*(.*?)[\s]*[)]/im

function videoEmbed(md, options) {
    function videoReturn(state, silent) {
        let serviceEnd
        let serviceStart
        let token
        let videoUrl
        let theState = state
        const oldPos = state.pos

        if (state.src.charCodeAt(oldPos) !== 0x40/* @ */ ||
            state.src.charCodeAt(oldPos + 1) !== 0x5B/* [ */) {
            return false
        }

        const match = EMBED_REGEX.exec(state.src.slice(state.pos, state.src.length))

        if (!match || match.length < 3) {
            return false
        }

        const service = match[1]
        videoUrl = match[2]
        const serviceLower = service.toLowerCase()
        if (serviceLower === 'video') {
            videoUrl = videoParser(videoUrl)
        } else if (!options[serviceLower]) {
            return false
        }

        // If the videoUrl field is empty, regex currently make it the close parenthesis.
        if (videoUrl === ')') {
            videoUrl = ''
        }

        serviceStart = oldPos + 2
        serviceEnd = md.helpers.parseLinkLabel(state, oldPos + 1, false)

        //
        // We found the end of the link, and know for a fact it's a valid link;
        // so all that's left to do is to call tokenizer.
        //
        if (!silent) {
            theState.pos = serviceStart
            theState.service = theState.src.slice(serviceStart, serviceEnd)
            const newState = new theState.md.inline.State(service, theState.md, theState.env, [])
            newState.md.inline.tokenize(newState)

            token = theState.push('video', '')
            token.videoUrl = videoUrl
            token.service = service
            token.url = match[2]
            token.level = theState.level
        }

        theState.pos += theState.src.indexOf(')', theState.pos)
        return true
    }

    return videoReturn
}

function videoUrl(service, videoUrl, url, options) {
    return service
}

function tokenizeVideo(md, options) {
    function tokenizeReturn(tokens, idx) {
        const videoUrl = md.utils.escapeHtml(tokens[idx].videoUrl)
        const service = md.utils.escapeHtml(tokens[idx].service).toLowerCase()
        return videoUrl === '' ? ''
            : `<video class="video" controls width=${options[service].width} height=${options[service].height} src=${videoUrl}></vide>`
    }

    return tokenizeReturn
}

const defaults = {
    url: videoUrl,
    video: { width: '100%', height: '100%' }
}

export default function videoPlugin(md, options) {
    let theOptions = options
    const theMd = md
    if (theOptions) {
        Object.keys(defaults).forEach(function checkForKeys(key) {
            if (typeof theOptions[key] === 'undefined') {
                theOptions[key] = defaults[key]
            }
        })
    } else {
        theOptions = defaults
    }
    theMd.renderer.rules.video = tokenizeVideo(theMd, theOptions)
    theMd.inline.ruler.before('emphasis', 'video', videoEmbed(theMd, theOptions))
}
