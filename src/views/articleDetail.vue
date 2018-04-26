<template>
    <div class="article-detail">
        <div v-if="article_id">
            <h1>
                {{articleInfo.article_title}}
            </h1>
            <p class="tag">
                <span>{{articleInfo.date}}</span>
                <el-tag type="primary" style="margin-left: 50px;height: 26px; line-height: 26px;">{{articleInfo.category_name}}</el-tag>
                <el-button class="edit-btn" type="primary" icon="el-icon-edit" @click="handleEditArticle" size="mini">编辑</el-button>
            </p>
            <div class="article-content" ref="articleContent">
            </div>
        </div>
        <div class="no-article-content" v-if="!article_id">暂无文章内容</div>
    </div>
</template>

<script>
import { formatDateStr } from '@/filters'
import highlight from 'highlight';
import { mapState } from 'vuex'
import marked from 'marked'
let renderer = new marked.Renderer();
export default {
    name: 'articleDetail',
    data() {
        return {
            articleInfo: {
                article_title: '',
                article_content: ''
            }
        }
    },
    computed: mapState({
        article_id: (state) => state.article.article_id,
        category_name: (state) => state.article.category_name
    }),
    mounted() {
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return highlight.highlightAuto(code).value;
            }
        })

        if (this.article_id) {
            this.$ajax({
                method: 'get',
                url: '/myblog/articleContent',
                params: {
                    article_id: this.$route.params.articleId
                }
            }).then(({ data }) => {
                var resData = data.articleDetailList;
                if (resData.length > 0) {
                    this.articleInfo = resData[0];
                    this.articleInfo.date = formatDateStr(new Date(this.articleInfo.date), 'yyyy-MM-dd hh:mm:ss');
                    this.$refs.articleContent.innerHTML = this.articleInfo.article_content = marked(this.articleInfo.article_content, { renderer: renderer })
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    methods: {
        handleEditArticle() {
            this.$router.push({
                path: `/${this.category_name}/edit/${this.article_id}`
            })
        }
    },
    watch: {
        article_id() {
            if (this.article_id) {
                this.$ajax({
                    method: 'get',
                    url: '/myblog/articleContent',
                    params: {
                        article_id: this.article_id
                    }
                }).then(({ data }) => {
                    var resData = data.articleDetailList;
                    if (resData.length > 0) {
                        this.articleInfo = resData[0];
                        this.articleInfo.date = formatDateStr(new Date(this.articleInfo.date), 'yyyy-MM-dd hh:mm:ss');
                        this.$refs.articleContent.innerHTML = this.articleInfo.article_content = marked(this.articleInfo.article_content, { renderer: renderer })
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// ul,
// li {
//     list-style: none;
//     margin: 0px;
//     padding: 0px;
// }
.article-detail {
    box-sizing: border-box;
    h1 {
        text-align: center;
    }

    .tag {
        position: relative;
        text-align: center;
        .edit-btn {
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }

    .no-article-content {
        font-size: 40px;
        text-align: center;
        margin-top: 260px;
    }

    .article-content {
        margin-top: 50px;
        box-sizing: border-box;
    }
}
</style>