import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import Login from '@/views/Login'
import ArticleDetail from '@/views/articleDetail'
import ArticleEdit from '@/views/articleEdit'

Vue.use(Router)

// const _import = require(`./_import_${process.env.NODE_ENV}`).default
export const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/',
    component: Layout,
    redirect: 'html/view',
    children: [{
        path: 'html',
        redirect: 'html/view'
    }, {
        path: 'html/view',
        component: ArticleDetail,
        name: 'html文章详情'
    }, {
        path: 'html/view/:articleId',
        component: ArticleDetail,
        name: 'html文章详情 '
    }, {
        path: 'html/edit',
        component: ArticleEdit,
        name: 'html文章新增'
    }, {
        path: 'html/edit/:articleId',
        component: ArticleEdit,
        name: 'html文章编辑'
    }, {
        path: 'css',
        redirect: 'css/view'
    }, {
        path: 'css/view',
        component: ArticleDetail,
        name: 'css文章详情'
    }, {
        path: 'css/view/:articleId',
        component: ArticleDetail,
        name: 'css文章详情 '
    }, {
        path: 'css/edit',
        component: ArticleEdit,
        name: 'css文章新增'
    }, {
        path: 'css/edit/:articleId',
        component: ArticleEdit,
        name: 'css文章编辑'
    }, {
        path: 'javaScript',
        redirect: 'javaScript/view'
    }, {
        path: 'javaScript/view',
        component: ArticleDetail,
        name: 'javaScript文章详情'
    }, {
        path: 'javaScript/view/:articleId',
        component: ArticleDetail,
        name: 'javaScript文章详情 '
    }, {
        path: 'javaScript/edit',
        component: ArticleEdit,
        name: 'javaScript文章新增'
    }, {
        path: 'javaScript/edit/:articleId',
        component: ArticleEdit,
        name: 'javaScript文章编辑'
    }, {
        path: 'nodejs',
        redirect: 'nodejs/view'
    }, {
        path: 'nodejs/view',
        component: ArticleDetail,
        name: 'nodejs文章详情'
    }, {
        path: 'nodejs/view/:articleId',
        component: ArticleDetail,
        name: 'nodejs文章详情 '
    }, {
        path: 'nodejs/edit',
        component: ArticleEdit,
        name: 'nodejs文章新增'
    }, {
        path: 'nodejs/edit/:articleId',
        component: ArticleEdit,
        name: 'nodejs文章编辑'
    }, {
        path: 'vue',
        redirect: 'vue/view'
    }, {
        path: 'vue/view',
        component: ArticleDetail,
        name: 'vue文章详情'
    }, {
        path: 'vue/view/:articleId',
        component: ArticleDetail,
        name: 'vue文章详情 '
    }, {
        path: 'vue/edit',
        component: ArticleEdit,
        name: 'vue文章新增'
    }, {
        path: 'vue/edit/:articleId',
        component: ArticleEdit,
        name: 'vue文章编辑'
    }, {
        path: 'aboutMyself',
        redirect: 'aboutMyself/view'
    }, {
        path: 'aboutMyself/view',
        component: ArticleDetail,
        name: 'aboutMyself文章详情'
    }, {
        path: 'aboutMyself/view/:articleId',
        component: ArticleDetail,
        name: 'aboutMyself文章详情 '
    }, {
        path: 'aboutMyself/edit',
        component: ArticleEdit,
        name: 'aboutMyself文章新增'
    }, {
        path: 'aboutMyself/edit/:articleId',
        component: ArticleEdit,
        name: 'aboutMyself文章编辑'
    }, {
        path: 'http',
        redirect: 'http/view'
    }, {
        path: 'http/view',
        component: ArticleDetail,
        name: 'http文章详情'
    }, {
        path: 'http/view/:articleId',
        component: ArticleDetail,
        name: 'http文章详情 '
    }, {
        path: 'http/edit',
        component: ArticleEdit,
        name: 'http文章新增'
    }, {
        path: 'http/edit/:articleId',
        component: ArticleEdit,
        name: 'http文章编辑'
    }]
}]

const router = new Router({
    mode: 'history',
    // scrollBehavior: () => ({
    //     y: 0
    // }),
    routes: routes
})

export default router;