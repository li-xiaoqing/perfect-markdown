<template>
    <div class="input-box">
        <pre class="pre-content"><br>{{inputStr}}</pre>
        <textarea
            ref="textarea"
            v-model="inputStr"
            @input="inputHandler"
            :placeholder="placeholder"
            :autofocus="autofocus"
        ></textarea>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputStr: this.value
        }
    },
    props: {
        autofocus: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
        }
    },
    methods: {
        inputHandler(e) {
            this.$nextTick(() => {
                this.inputStr = e.target.value
            })
        }
    },
    watch: {
        value: function (val, oldVal) {
            this.inputStr = val
        },
        inputStr: function (val, oldVal) {
            this.$emit('input', val)
        }
    }
}
</script>
<style lang="less" scoped>
.input-box {
    position: relative;
    width: 100%;
    .pre-content {
        display: block;
        visibility: hidden;
        height: 100%;
        font-size: 16px;
        color: #333333;
        line-height: 1.5;
        white-space: pre-wrap;
        word-wrap: break-word;
        padding: 0;
        margin: 0;
    }
    textarea {
        overflow: hidden;
        resize: none;
        width: 100%;
        height: 100%;
        border: 0;
        font-size: 16px;
        color: #333333;
        line-height: 1.5;
        padding: 0px;
        position: absolute;
        left: 0;
        top: 0;
        outline: 0 none;
    }
}
</style>
