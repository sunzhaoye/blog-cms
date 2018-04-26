export const ARTICLE_TITLE = 'ARTICLE_TITLE'
export const AETICLE_ID = 'AETICLE_ID'
export const IS_SAVED = 'IS_SAVED'
export const CATEGORY_NAME = 'CATEGORY_NAME'
export const ARTICLE_LIST = 'ARTICLE_LIST'
export default {
    state: {
        articleTitle: '',
        article_id: '',
        isSaved: '1',
        category_name: '',
        articleList: []
    },
    mutations: {
        [ARTICLE_TITLE](state, titleInfo) {
            state.articleTitle = titleInfo.title;
        },
        [AETICLE_ID](state, articleIdObj) {
            state.article_id = articleIdObj.article_id;
        },
        [IS_SAVED](state, isSavedObj) {
            state.isSaved = isSavedObj.isSaved;
        },
        [CATEGORY_NAME](state, categoryNameObj) {
            state.category_name = categoryNameObj.category_name
        },
        [ARTICLE_LIST](state, articleListObj) {
            state.articleList = articleListObj.articleList
        }
    },
    actions: {
        [ARTICLE_TITLE]({ commit }, titleInfo) {
            commit(ARTICLE_TITLE, titleInfo)
        },
        [AETICLE_ID]({ commit }, articleIdObj) {
            commit(AETICLE_ID, articleIdObj)
        },
        [IS_SAVED]({ commit }, isSavedObj) {
            commit(IS_SAVED, isSavedObj)
        },
        [CATEGORY_NAME]({ commit }, categoryNameObj) {
            commit(CATEGORY_NAME, categoryNameObj)
        },
        [ARTICLE_LIST]({ commit }, articleListObj) {
            commit(ARTICLE_LIST, articleListObj)
        }
    }
}