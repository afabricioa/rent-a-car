import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import Dashboard from "../components/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { userStore } from "../store/userStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            component: Dashboard,
            meta: {requiresAuth: true},
            children: [
                {path: '/dashboard', name: 'Dashboard', component: Dashboard}
            ]
        },
        {
            path: '/auth',
            name: 'Auth',
            redirect: '/login',
            component: AuthLayout,
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const storeUser = userStore();
    console.log(storeUser.user.token)
    if(to.meta.requiresAuth && !storeUser.user.token){
        console.log('login')
        next({name: 'Login'})
    }else if(storeUser.user.token){
        next({name: 'Dashboard'})
    }else{
        next();
    }
})
export default router
