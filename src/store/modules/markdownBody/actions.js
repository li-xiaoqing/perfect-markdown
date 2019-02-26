export default {
    setEditorSplitType(context, split) {
        context.commit('SET_EDITOR_SPLIT_TYPE', split)
    },
    setEditorFullscreenType(context, fullscrean) {
        context.commit('SET_EDITOR_FULLSCREEN_TYPE', fullscrean)
    },
    setTextareaContent(context, content) {
        context.commit('SET_TEXTAREA_CONTENT', content)
    }
}
