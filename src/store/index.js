// 该文件用于创建 Vuex 中最为核心的 Store
// 注意：如果确定要用 Vuex 来管理数据，那么请把对数据的操作逻辑也尽可能全部在 Vuex 中实现，而不要 Vuex 实现一部分，组件还要依赖某些具体的逻辑来调用 API，这样的代码复用性与可读性都不好！
// 引入 Vue
import Vue from 'vue';
// 引入 Vuex
// 安装：npm i vuex@3
// 注意：目前 Vue 默认版本已经是 Vue3，Vuex 的默认版本是 Vuex4，而 Vuex4 只支持 Vue3，所以我们安装指定的 Vuex3 版本，才能在 Vue2 中使用
import Vuex from 'vuex';
// 应用 Vuex 插件
// 之所以在 /store/index.js 中 Vue.use(Vuex) 插件，是因为 Store 实例创建之前必须先 Vue.use(Vuex)
// 如果我们把 Vue.use(Vuex) 写在 main.js 中，那么其实在执行 Vue.use(Vuex) 之前，main.js 已经把 import store from './store' 都执行完了，Store 实例已经创建了，所以肯定会报错！
// 提示：我们在 main.js 中把 Vue.use(Vuex) 写在 import store from './store' 之前也没有用，因为 import 语句是优先执行的！
Vue.use(Vuex);
// 应用 Vuex 插件之后，并在 main.js 中配置 store，那么 vm 与 vc 上就都有 $store 了！
// 引入模块
// Vuex 模块化的意义在于：封装不同的业务数据及操作（提高可读性、提高可维护性、防止命名冲突……）
import countOptions from './count';
import personOptions from './person';

export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
});
