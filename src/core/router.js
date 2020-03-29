import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '../generate/route';
// 添加默认路径
routerConfig.push({
    path: '/',
    redirect: {
        name: '/home/home/Home'
    }
});
Vue.use(Router);

const router = new Router({
    routes: routerConfig
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
