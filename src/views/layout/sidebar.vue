<template>
    <div id="sidebar">
        <div class="category-list" style="height: 100%;">
            <el-menu mode="vertical" router class="category-content el-menu-vertical-demo" text-color="#8d9199" active-text-color="#20a0ff" @select="handleGetArticleList" :default-active="'/'+ path ">
                <template v-for="item in urlList">
                    <el-menu-item :index="'/' + item.value" :key="item.value">
                        <i :class="'el-icon-menu iconfont ' + item.icon_class"></i>
                        <span slot="title">{{item.value}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="article-list" style="height: 100%;">
            <div class="search-add-article">
                <el-input suffix-icon="el-icon-search" v-model="articleVal" size="mini" @keyup.native="handleSearchArticle">
                </el-input>
                <i class="add iconfont icon-jian" @click="handleAddArticle"></i>
            </div>
            <div class="no-article-content" v-if="!article_id">暂无文章</div>
            <ul class="article-content">
                <li v-for="(item, index) in articleList" :key="index" :class="{'article-list-item': true,'article-active': active.article === index}" @click="handleGetArticleDetail(item, index)">
                    <div class="time">{{item.date}}</div>
                    <div class="article-title">{{item.article_title || '- -'}}</div>
                    <i class="edit iconfont icon-icon-test" v-if="item.isSaved === '1'"></i>
                    <i class="delete iconfont icon-shanchu1" @click="handleOpenDeleteDialog(index)"></i>
                </li>
            </ul>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>是否删除当前文章</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteArticle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { AETICLE_ID, CATEGORY_NAME, ARTICLE_TITLE, IS_SAVED, ARTICLE_LIST } from '@/store/modules/article'
import { formatDateStr } from '@/filters'
function formatArticleList(articleList) {
    if (articleList.length) {
        articleList.forEach((v) => {
            v.date = formatDateStr(new Date(v.date), 'yyyy-MM-dd hh:mm:ss');
        })
    }
    return articleList;
}
let _articleList = [];
export default {
    name: 'siderbar',
    mounted() {
        this.getCategoryList()
    },
    data() {
        return {
            active: {
                category: 0,
                article: 0,
                categoryVal: 'html'
            },
            articleVal: '',
            urlList: [],
            dialogVisible: false,
            articleIndex: ''
        }
    },
    computed: {
        ...mapState({
            articleList: (state) => state.article.articleList,
            article_id: (state) => state.article.article_id,
            articleTitle: (state) => state.article.articleTitle,
            isSaved: (state) => state.article.isSaved,
            category_name: (state) => state.article.category_name
        }),
        path() {
            return this.$route.path.match(/(\/\w+)/g)[0].substring(1)
        }
    },
    methods: {
        ...mapActions([
            AETICLE_ID,
            CATEGORY_NAME,
            ARTICLE_TITLE,
            IS_SAVED,
            ARTICLE_LIST
        ]),
        getCategoryList() {
            this.$ajax({
                method: 'get',
                url: '/myblog/category'
            }).then(({ data }) => {
                this.urlList = data.category_list;
                this.CATEGORY_NAME({
                    category_name: this.$route.path.match(/(\/\w+)/g)[0].substring(1)
                })
                this.getArticleList(this.category_name);
            }).catch((err) => {
                console.log(err);
            })
        },
        getArticleList(value) {
            this.CATEGORY_NAME({
                category_name: value
            });
            this.$ajax({
                method: 'get',
                url: '/myblog/article',
                params: {
                    category_name: value
                }
            }).then(({ data }) => {
                let _this = this;
                _articleList = [];
                if (data.article_list.length) {
                    data.article_list.forEach((v) => {
                        _articleList.push(v);
                    });
                } else {
                    _articleList = [];
                }
                this.ARTICLE_LIST({
                    articleList: formatArticleList(_articleList)
                })
                if (this.articleList.length) {
                    if (this.$route.params.articleId) {
                        this.AETICLE_ID({
                            article_id: this.$route.params.articleId
                        })
                        this.active.article = this.articleList.findIndex(function(item, index) {
                            return item._id === _this.$route.params.articleId
                        });
                        this.IS_SAVED({
                            isSaved: this.articleList[this.active.article].isSaved
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
        handleSearchArticle() {
            let articleListSearch = [];
            _articleList.forEach((v) => {
                if (v.article_title.indexOf(this.articleVal) !== -1) {
                    articleListSearch.push(v);
                }
            });
            this.ARTICLE_LIST({
                articleList: articleListSearch
            })
        },
        handleGetArticleList(routePath) {
            let categoryName = routePath.substring(1);
            this.getArticleList(categoryName);
        },
        handleGetArticleDetail(item, index) {
            this.active.article = index;
            this.AETICLE_ID({
                article_id: this.articleList[index]._id
            });
            this.IS_SAVED({
                isSaved: item.isSaved
            });
            if (item.isSaved === '2') {
                this.$router.push({
                    path: `/${this.category_name}/view/${item._id}`
                })
            } else {
                this.$router.push({
                    path: `/${this.category_name}/edit/${item._id}`
                })
            }
        },
        handleAddArticle() {
            this.IS_SAVED({
                isSaved: '1'    // 为了保证增加文章后,点击文章列表可以进入到编辑页
            });
            this.$ajax.post('/myblog/article', {
                'category_name': this.category_name,
                'article_title': '',
                'isSaved': '1'
            }).then(({ data }) => {
                _articleList.unshift(data.article_item);
                this.ARTICLE_LIST({
                    articleList: formatArticleList(_articleList)
                });
                this.AETICLE_ID({
                    article_id: this.articleList[0]._id
                });
                this.$router.push({
                    path: `/${this.category_name}/edit/${data.article_item._id}`
                })
                this.active.article = 0;
            }).catch((err) => {
                console.log(err);
            })
        },
        handleOpenDeleteDialog(index) {
            this.dialogVisible = true;
            this.articleIndex = index;
        },
        handleDeleteArticle() {
            let index = this.articleIndex;
            this.$ajax.delete(`/myblog/article/${this.articleList[index]._id}`).then(({ data }) => {
                if (data.resultCode === 0) {
                    this.dialogVisible = false;
                    this.articleList.splice(index, 1);
                }
            }).catch((err) => {
                console.log(err);
            });

            this.$ajax.delete(`/myblog/articleContent/${this.articleList[index]._id}`).then(({ data }) => {
                if (data.resultCode === 0) {
                    console.log('删除文章成功');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    watch: {
        articleTitle() {
            if (this.articleList.length > 0) {
                this.articleList[this.active.article].article_title = this.articleTitle;
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
    height: 100%;
    border-radius: 0;
}

.el-menu-item {
    &:hover {
        background: #e1edfa;
    }
    &.is-active {
        background: #e1edfa;
    }
}
.el-dialog {
    z-index: 999999;
}
li {
    list-style: none;
}

#sidebar {
    position: relative;
    height: 100%;
    .category-list {
        width: 200px;
        height: 100%;
        overflow-y: auto;
        background-color: #324157;
        position: absolute;
        top: 0px;
        left: 0px;
        .category-content {
            background-color: #f5f7fa;
            height: 100%;
            overflow-y: scroll;
            border-right: 1px solid #e6e9f0;
        }
    }
    .article-list {
        width: 250px;
        height: 100%;
        background-color: #f5f7fa;
        overflow-y: auto;
        position: absolute;
        top: 0px;
        left: 200px;
        .search-add-article {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-input {
                width: 80%;
                margin-left: 10px;
            }
            .add {
                width: 25px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                font-weight: bold;
                margin-right: 10px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 4px;
                color:#8d9199;
            }
        }
        .no-article-content {
            font-size: 20px;
            text-align: center;
            height: inherit;
            margin-top: 300px;
        }
        .article-content {
            padding: 0px;
            height: 100%;
            margin-top: 40px;
            .article-list-item {
                overflow: hidden;
                text-overflow: ellipsis;
                height: 80px;
                padding: 10px;
                position: relative;
                color: #8d9199;
                cursor: pointer;
                border-bottom: 1px solid #e6e6e6;
                word-wrap: break-word;
                word-break: break-all;
                .time {
                    margin-bottom: 12px;
                }
                .edit {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    right: 50px;
                    top: 50%;
                    margin-top: -5px;
                }
                .delete {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    right: 20px;
                    top: 50%;
                    margin-top: -5px;
                    &:hover {
                        color: red;
                    }
                }
                &.article-active {
                    color: #20a0ff;
                    background-color: #e1edfa;
                }
                .article-title {
                    width: 75%;
                }
                &:hover {
                    background-color: #e1edfa;
                }
            }
        }
    }
}
</style>