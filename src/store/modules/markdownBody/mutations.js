const mutations = {
    SET_EDITOR_SPLIT_TYPE(state, split = true) {
        state.editorIsSplit = split
    },
    SET_EDITOR_FULLSCREEN_TYPE(state, split = true) {
        state.editorIsFullscrean = split
    },
    SET_TEXTAREA_CONTENT(state, content = '') {
        state.textareaContent = content
    }
}

export default mutations
