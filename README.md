# perfect-markdown

## What is perfect-markdown
perfect-markdown is a markdown editor based on Vue & markdown-it. The core is inspired by the implementation of [mavonEditor](https://github.com/hinesboy/mavonEditor), so perfect-markdown has almost all of the functions of mavonEditor. What's more, perfect-markdown also extends some features based on mavonEditor.

## Links

[codepen demo](https://codepen.io/li-xiaoqing/pen/wOmabo)

### Install perfect-markdown

```
$ npm install perfect-markdown --save
```

### Usage

`main.js`:
```javascript
    import Vue from 'vue'
    import store from '@/store' // vuex is required in perfect-markdown
    import pmd from 'perfect-markdown' //  or import pmd from 'perfect-markdown/lib/pmd.umd.min.js'
    // use
    Vue.use(pmd, { store }) // register pmd vuex module

```
`editor.vue`
```html
<div id="main">
    <pmd
        v-model="value"
        :showToolbar="true"
        :showTextarea="true"
        :uploadImgFn="uploadFn"
        :uploadFileFn="uploadFn"
        :plugins="{katex: true}"
        :imgWidthHeightAttr="{width: true, height: false}"
    ></pmd>
</div>
```

## API

### props

| name         | type     | default  | describe                                                  |
| ------------ | :-----:  | :---------: | -------------------------------------------------------|
| value        | String   | ''      | textarea value
| showToolbar  | Boolean  | true    | show toolbar                                               |
| showTextarea | Boolean  | true    | show the textarea                                          |
| uploadImgFn  | Function | funtion | uploadImg                                              |
|  uploadFileFn | Function | funtion | uploadFile                                                 |
|  plugins        | Object   |   {}    | katex or mathjax plugin, { katex: true } or { mathjax: true }. (mathjax  is more powerful than katex, but it rendering efficiency is lower) |
|  customLeftToolbar |   Boolean  |    false   |       |
|  customRightToolbar |   Boolean  |    false   |       |
|  imgWidthHeightAttr |   Object  |    {width: false, height: false}   | this is default output \[name](url), and all true will output \[name =WxH](url)      |
| ...          | ...      |   ...   | ....                                                       |

#### upload img file

```html
<div>
    <pmd ref=md :uploadImgFn="imgFn" :uploadFileFn="fileFn"></pmd>
</div>
export default {
    methods: {

        imgFn(payload) {
            const ret = await this.upload(payload); // the payload has the file(File) param from pmd
            return {
                upload: true, // required
                url: ret.data.url
            };
        },
        fileFn(payload) {
            const ret = await this.upload(payload); // the payload has the file(File) param from pmd
            return {
                upload: true, // required
                url: ret.data.url
            };
        }
    }
}
```

### slot
```html
<template>
    <div>
        <pmd
            v-if="renderType === 0"
            v-model="form.content"
            :uploadImgFn="uploadFn"
            :uploadFileFn="uploadFn"
            :plugins="{mathjax: true}"
            :customLeftToolbar="false"
        >


            <template slot="toolbarLeftBefore"><span><i class="iconfont icon-clean"></i></span></template>
            <template slot="toolbarLeftAfter"><span><i class="iconfont icon-clean"></i></span></template>
            <template slot="toolbarRightBefore"><span><i class="iconfont icon-clean"></i></span></template>
            <template slot="toolbarRightAfter"><span><i class="iconfont icon-clean"></i></span></template>
        </pmd>
    <div>
<template>
```

### vuex module api
```html
<template>
    <div>
        <pmd>
        </pmd>
    </div
</template>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            editorIsSplit: 'markdownBody/getEditorIsSplit',
            editorIsFullscrean: 'markdownBody/getEditorIsFullscrean',
            textareaContent: 'markdownBody/getTextareaContent'
        })
    },
    methods: {
        ...mapActions({ setTextareaContent: 'markdownBody/setTextareaContent' })
    }
}
```
### add i18n
jaHelpMD and messages refer to /src/lang/en
```
setHelp('ja', jaHelpMD)
setLangMessages('ja', messages)
setI18nLocale('ja')
```
## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/li-xiaoqing/perfect-markdown/releases).

## Licence

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

Copyright (c) 2019-present
