import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { Eventer } from "./helpers/eventer";
import { redirects, toRouteRecordRaw } from "./redirects";

export const routes: RouteRecordRaw[] = [
    {
        name: "Home",
        path: "/",
        component: () => import("../pages/Home.vue"),
    },
    {
        name: "Download",
        path: "/download",
        redirect: "/download/latest",
    },
    {
        path: "/download/:version",
        component: () => import("../pages/Download.vue"),
    },
    ...redirects.map((x) => toRouteRecordRaw(...x)),
    {
        path: "/:pathMatch(.*)*",
        component: () => import("../pages/404.vue"),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export const RouterHooks = {
    beforeChange: new Eventer<void>(),
    afterChange: new Eventer<void>(),
};

router.beforeEach((to, from, next) => {
    RouterHooks.beforeChange.dispatch();
    next();
});

router.afterEach((to, from) => {
    RouterHooks.afterChange.dispatch();
});
