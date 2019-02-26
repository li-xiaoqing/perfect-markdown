<template>
    <div class="editor-box">
        <h1>{{title}}</h1>
        <div
            class="pmd-editor"
        >
            <pmd :showTextarea="true" :showToolbar="true" v-model="value" :uploadImgFn="fileUplod" :uploadFileFn="fileUplod" :plugins="{katex: true}"></pmd>
        </div>
    </div>
</template>
<script>
import pmd from './editor'
export default {
    data() {
        return {
            title: 'demo',
            value: '# demo'
        }
    },
    components: {
        pmd
    },
    methods: {
        fileUplod(file) {
            console.log(file)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ upload: true, url: 'http://www.baidu.com' }) // uploadImgFn required the return value {upload: true, url: 'the real url'}
                }, 0)
            })
        }
    }

}
</script>
<style lang="less" scoped>
.pmd-editor {
    width: 75%;
    margin: 0 auto;
}
</style>
