/**
 * 滚动条联动
 */
export function scrollLink(e, vue) {
    let element = e.srcElement ? e.srcElement : e.target
    let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight)
    if (vue.edit_scroll_height >= 0 && element.scrollHeight !== vue.edit_scroll_height && (element.scrollHeight - element.offsetHeight - element.scrollTop <= 30)) {
        // 内容变化 导致 高度增加  且滚动条距离底部小于25px  自动滚动到底部
        vue.$refs.inputEdit.scrollTop = element.scrollHeight - element.offsetHeight
        ratio = 1
    }
    vue.edit_scroll_height = element.scrollHeight
    // end ----
    if (vue.$refs.renderHtml.scrollHeight > vue.$refs.renderHtml.offsetHeight) {
        vue.$refs.renderHtml.scrollTop = (vue.$refs.renderHtml.scrollHeight - vue.$refs.renderHtml.offsetHeight) * ratio
    }
}
