import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Car from "../views/Car.vue";
import CarForm from "../views/CarForm.vue";
import Rent from "../views/Rent.vue";
import { userStore } from "../store/userStore";
import { useAlert } from "../../composables/useAlert";

const alert = useAlert();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            component: DefaultLayout,
            meta: {requiresAuth: true},
            children: [
                {path: '/dashboard', name: 'Dashboard', component: Dashboard},
                {path: '/car', name: 'Car', component: Car},
                {path: '/rent', name: 'Rent', component: Rent},
                {path: '/car/form', name: 'CarForm', component: CarForm},
                {path: '/car/form/:id', name: 'CarView', component: CarForm}
            ]
        },
        {
            path: '/auth',
            name: 'Auth',
            redirect: '/login',
            meta: {isGuest: true},
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
    if(to.meta.requiresAuth && !storeUser.user.token){
        next({name: 'Login'})
    } else if(storeUser.user.token && to.meta.isGuest){
        next({name: 'Dashboard'})
    } else if(to.name === 'Car' && storeUser.user.data.is_admin === 0){
        alert('Warning', 'You don`t have permission to access this page', 'warning')
        next({name: 'Dashboard'})
    } else {
        next()
    }
})
export default router
