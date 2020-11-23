import { fetchGoodList } from '@/utils/api'

export default {

    namespaced: true,
    state: {
        goodObj: {}
    },
    mutations: {
        updateGoodObj(state, payload) {
            state.goodObj[payload.k] = payload.v
                //深复制：对象层级过深，无法自动更新，需要用深复制。
                //就是把变量粉粹再重新组装。
                //原理：对象的地址在栈里，内容在堆里。直接复制只是复制地址，但指向的是同一个堆。深复制不仅复制地址还复制堆。
            state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
        },
        clearGoodObj(state) {
            state.goodObj = {}
        }
    },
    actions: {
        fetchList(store, params) { //params来于页面
            fetchGoodList(params).then(res => {
                // console.log('当前品类下的列表', res)
                let payload = {
                    k: params.index,
                    v: res.list
                }
                store.commit('updateGoodObj', payload)
            })
        }
    }
}