// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useUserStore();

    if (to.path.startsWith('/auth') && user.loggedIn) {
        return navigateTo('/');
    }

    if (to.path.startsWith('/profile') && !user.loggedIn) {
        return navigateTo('/auth/signin');
    }
});
