export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/menu") {
        to.meta.layoutTransition = { name: 'page-left' };
        from.meta.layoutTransition = { name: 'page-left' };
    } else if (from.path === "/menu"){
        to.meta.layoutTransition = { name: 'page-right' };
        from.meta.layoutTransition = { name: 'page-right' };
    }
})