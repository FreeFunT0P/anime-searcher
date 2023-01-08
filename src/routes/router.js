import Vue from 'vue'
import Router from 'vue-router'
import ContentBarAnime from "@/components/ContentBarAnime";
import ContentBarManga from "@/components/ContentBarManga";


Vue.use(Router)

const routes = [
  {
    path: '/anime',
    name: 'anime',
    component: ContentBarAnime,
    props: true,
  },
  {
    path: '/manga',
    name: 'manga',
    component: ContentBarManga,
    props: true,
  },
]

const router = new Router({ base: '/', routes })


export default router