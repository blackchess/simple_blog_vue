import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入代码高亮css样式
import 'highlight.js/styles/monokai-sublime.css'

// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入全局样式,js表
import './assets/css/global.css'
import './assets/js/global.js'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import { Quill } from 'vue-quill-editor'
import Video from './quill/video'
// 导入富文本编辑器的 css 样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(ElementUI)

Vue.use(VueQuillEditor, /* { default global options } */)

Quill.register(Video,true);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
