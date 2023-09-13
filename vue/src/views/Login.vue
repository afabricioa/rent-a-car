<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { userStore } from '../store/userStore';
    import { useAlert } from '../../composables/useAlert';

    const storeUser = userStore();
    const router = useRouter();
    const alert = useAlert();

    const credentials = ref({
        email: '',
        password: ''
    });

    function handleLogin(){
        storeUser.login(credentials.value)
            .then(() => {
                router.push('/dashboard');
            })
            .catch(({response}) => {
                let errorMessage = response.data.error;
                alert('An error occurred', errorMessage, 'error');
            });
    }

</script>

<template>
    <div
        class="bg-red-300 mt-10 w-1/4 h-1/4 flex justify-center items-center rounded-md"
    >
        <form class="space-y-6 p-8 w-full" @submit.prevent="handleLogin()">
            <div class="mt-5 flex justify-center font-size-18 text-black text-3xl">
                Login
            </div>
            <div>
                <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email" type="email" id="email" v-model="credentials.email"/>
            </div>

            <div>
                <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" type="password" id="password" v-model="credentials.password"/>
            </div>

            <div class="mb-5">
                <button class="mt-5 p-2 rounded-md w-full bg-emerald-500" type="submit">Sign In</button>
            </div>

            <div class="mt-10 text-center text-sm text-black">
                Not a member?

                <RouterLink to="/register" class="font-semibold leading-6 text-black hover:text-emerald-500">Register</RouterLink>
            </div>
        </form>
    </div>
</template>
