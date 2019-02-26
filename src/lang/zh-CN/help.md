@[toc](目录)

Markdown 语法举例
=============
## **粗体**
```
**粗体**
__粗体__
```
## *斜体*
```
*斜体*
_斜体_
```
## 标题
```
# 一级标题 #
一级标题
====
## 二级标题 ##
二级标题
----
### 三级标题 ###
#### 四级标题 ####
##### 五级标题 #####
###### 六级标题 ######
```

## ++下划线++ ~~中划线~~
```
++下划线++
~~中划线~~
```
## ==标记==
```
==标记==
```

## ^上^角~下~标
```
上角标 x^2^
下角标 H~2~0
```

## 段落引用
```
> 一级
>> 二级
>>> 三级
...
```
## 列表
```
有序列表
1.
2.
3.
...
无序列表
-
-
...
```
## 代码段落
\``` type

代码段落

\```

\` 代码块 \`

```javascript
function helloJS() {
    console.log("hello js!");
}
```
`code`

## 链接
```
[链接](www.baidu.com)
```
[链接](www.baidu.com)

## 图片
```
![图片描述](https://www.baidu.com/img/baidu_jgylogo3.gif)
```
![图片描述](https://www.baidu.com/img/baidu_jgylogo3.gif)

## 表格(table)
```
|    name    | age |
| ---------- | --- |
| xiaoqing   |  18 |
| xiaoming   |  18 |
```
|    name    | age |
| ---------- | --- |
| xiaoqing   |  18 |
| xiaoming   |  18 |

## 任务列表
```
- [x] done
- [ ] doing
```
- [x] done
- [ ] doing

## 脚注(footnote)
```
见页面底部[^hello]

[^hello]: 一个脚注
```

## emoji

```
:-)
:D
:)
...
```
:-) :D :)

## 公式 katex latex

行内公式：$x_i + y_i = z_i$和$\sum_{i=1}^n a_i=0$
换行公式：
$$\sum_{i=1}^n a_i=0$$
