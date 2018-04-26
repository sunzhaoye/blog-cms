<template>
    <router-view></router-view>
    <!--<div id="article-contain">
        <el-input v-model="articleTitle" placeholder="请输入内容"></el-input>
        <markdown-editor v-model="articleContent" preview-class="markdown-body" ref="markdownEditor" :configs="configs">
        </markdown-editor>
        <div>
            <el-button type="primary" icon="el-icon-check">发布</el-button>
        </div>
    </div>-->
</template>

<script>
// import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ARTICLE_TITLE } from '@/store/modules/article'
export default {
    name: 'mainContent',
    data() {
        return {
            articleTitle: '',
            articleContent: '',
            configs: {                                    // markdown编辑器配置参数
                status: false,                            // 禁用底部状态栏
                initialValue: '',                // 设置初始值
                renderingConfig: {
                    codeSyntaxHighlighting: true,        // 开启代码高亮
                    highlightingTheme: 'atom-one-light' // 自定义代码高亮主题
                }
            }
        }
    },
    methods: {
        ...mapActions([
            ARTICLE_TITLE
        ])
    },
    watch: {
        articleTitle() {
            this.ARTICLE_TITLE({
                title: this.articleTitle
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.markdown-editor {
    margin-top: 20px;
    margin-bottom: 20px;
}

.markdown-editor {
    .CodeMirror {
        .CodeMirror-scroll {
            min-height: 500px;
            height: 500px;
        }
    }
}
</style>