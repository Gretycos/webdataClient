import Vue from 'vue'
import VueRouter from 'vue-router'

const layout = () => import("@/views/Layout")
const animation = () => import("@/views/Animation")
const movie = () => import("@/views/Movie")
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      component: layout,
      redirect: '/animation',
      children:[
        {
          path: "animation",
          name: "动漫",
          meta:{
            title: "动漫资源"
          },
          component: animation
        },
        {
          path: "movie",
          name: "电影",
          meta:{
            title: "电影资源"
          },
          component: movie
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 自动化修改页面标签的 title
  document.title = to.meta.title;
  next()
});
export default router
