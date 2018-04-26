<template>
    <div id="article-edit">
        <el-input v-model="articleTitle" placeholder="请输入内容"></el-input>
        <markdown-editor v-model="articleContent" preview-class="markdown-body" ref="markdownEditor" :configs="configs">
        </markdown-editor>
        <div>
            <el-button type="primary" @click="handleSaveArticle(isDraft = '1')" v-if="isSaved === '1'" :loading="loading">保存草稿</el-button>
            <el-button type="primary" icon="el-icon-check" @click="handleSaveArticle(isDraft = '2')">发布文章</el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ARTICLE_TITLE, IS_SAVED, ARTICLE_LIST, AETICLE_ID } from '@/store/modules/article'
import { formatDateStr } from '@/filters'
function formatArticleList(articleList) {
    articleList.forEach((v) => {
        v.date = formatDateStr(new Date(v.date), 'yyyy-MM-dd hh:mm:ss');
    })
    return articleList;
}
let _articleList = [];
let timerAdd = null;
let timerUpdate = null;
export default {
    name: 'articleEdit',
    data() {
        return {
            loading: false,
            articleTitle: '',
            articleContent: '',
            active: {
                category: 0,
                article: 0
            },
            configs: {
                status: false,
                // autosave: {
                //     enabled: true,
                //     uniqueId: 'cms',
                //     delay: 1000
                // },
                initialValue: '',
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                    highlightingTheme: 'atom-one-light'
                }
            }
        }
    },
    computed: mapState({
        article_id: (state) => state.article.article_id,
        isSaved: (state) => state.article.isSaved,
        category_name: (state) => state.article.category_name,
        articleList: (state) => state.article.articleList
    }),
    mounted() {
        this.getArticleContent();
    },
    methods: {
        ...mapActions([
            ARTICLE_TITLE,
            IS_SAVED,
            ARTICLE_LIST,
            AETICLE_ID
        ]),
        getArticleContent() {
            this.$ajax({
                method: 'get',
                url: '/myblog/articleContent',
                params: {
                    article_id: this.article_id
                }
            }).then(({ data }) => {
                clearInterval(timerAdd);
                clearInterval(timerUpdate);
                var resData = data.articleDetailList;
                if (resData.length > 0) {
                    this.articleTitle = resData[0].article_title;
                    this.articleContent = resData[0].article_content;
                }
                if (this.isSaved === '1') {
                    // timerAdd = setInterval(() => {
                    //     this.handleSaveArticle('1', false);
                    // }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getArticleList(value) {
            this.$ajax({
                method: 'get',
                url: '/myblog/article',
                params: {
                    category_name: value
                }
            }).then(({ data }) => {
                let _this = this;
                _articleList = [];
                // 由于使用Vuex来管理articleList, 不能直接复制操作, 所以复制一份来进行数据操作
                data.article_list.forEach((v) => {
                    _articleList.push(v);
                });
                // 更新articleList为了拿到文章列表新增后, 新增文章列表item的isSaved值,来进行判断点击文章列表item时进入编辑页的行为
                this.ARTICLE_LIST({
                    articleList: formatArticleList(_articleList)
                })
                if (this.articleList.length) {
                    if (this.$route.params.articleId) {
                        this.AETICLE_ID({
                            article_id: this.$route.params.articleId
                        })
                        this.IS_SAVED({
                            isSaved: this.articleList[this.active.article].isSaved
                        });
                        this.active.article = this.articleList.findIndex(function(item, index) {
                            return item._id === _this.$route.params.articleId
                        });
                    } else {
                        this.AETICLE_ID({
                            article_id: this.articleList[0]._id
                        })
                        this.ARTICLE_TITLE({
                            title: this.articleList[0].article_title
                        })
                    }
                } else {
                    this.ARTICLE_TITLE({
                        title: ''
                    })
                    this.AETICLE_ID({
                        article_id: ''
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        addArticleContent(isDraft, isAutoSave = true) {
            this.$ajax.post('/myblog/articleContent', {
                'article_id': this.article_id,
                'article_title': this.articleTitle,
                'article_content': this.articleContent,
                'category_name': this.category_name,
                'isSaved': isDraft
            }).then(({ data }) => {
                if (data.resultCode === 0) {
                    this.loading = false;
                    this.upDateArticleList(isDraft, isAutoSave);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        upDateArticleContent(isDraft, isAutoSave) {
            this.$ajax.put('/myblog/articleContent', {
                'article_id': this.article_id,
                'article_title': this.articleTitle,
                'article_content': this.articleContent,
                'category_name': this.category_name
            }).then(({ data }) => {
                this.loading = false;
                if (data.resultCode === 0) {
                    this.upDateArticleList(isDraft, true);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        upDateArticleList(isDraft, isAutoSave) {
            this.$ajax.put('/myblog/article', {
                article_id: this.article_id,
                article_title: this.articleTitle,
                isSaved: isDraft
            }).then(({ data }) => {
                if (data.resultCode === 0) {
                    this.getArticleList(this.category_name);
                    if (isAutoSave) {
                        // isAutoSave 判断是定时自动保存还是点击按钮保存,如果是点击按钮保存, 则保存后进行路由跳转
                        this.$router.push({
                            path: `/${this.category_name}/view/${this.article_id}`
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        handleSaveArticle(isDraft, isAutoSave) {
            // 保存草稿和发布文章统一都调用handleSaveArticle方法
            // isDraft为1是增加文章内容, 2是更新文章内容
            // isAutoSave 判断是定时自动保存还是点击按钮保存,如果是点击按钮保存, 则保存后进行路由跳转
            this.loading = true;
            if (this.isSaved === '1') {
                this.addArticleContent(isDraft, isAutoSave);
            } else if (this.isSaved === '2') {
                this.upDateArticleContent(isDraft, isAutoSave)
            }
        }
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

</style>