<script setup>
    import { ref } from 'vue';

    import { userStore } from '../store/userStore';
    import { useAlert } from '../../composables/useAlert';
    const storeUser = userStore();

    const alert = useAlert();

    const userData = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        driver_license: '',
    });

    function handleRegister(){
        storeUser.register(userData.value).then((res) => {
            console.log(res)
        }).catch(({response}) => {
            let errors = response.data.errors;
            let errorMessages = "";
            Object.values(errors).forEach(err => {
                err.forEach(e => {
                    errorMessages = errorMessages + e + "\n";
                })
            })
            console.log(errorMessages)
            alert('Some errors occurred!', errorMessages, 'error');

        })
    }
</script>

<template>
    <div
        class="bg-white text-black mt-10 w-1/2 h-1/4 flex justify-center items-center rounded-md"
    >
        <form class="space-y-6 p-8 w-3/4" @submit.prevent="handleRegister()">
            <div class="mt-5 flex justify-center text-2xl">
                Sign Up
            </div>

            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Fullname" type="text" id="name" v-model="userData.name"/>

            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email" type="email" id="email" v-model="userData.email"/>

            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" type="password" id="password" v-model="userData.password"/>

            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Confirm Password" type="password" id="password_confirmation" v-model="userData.password_confirmation"/>

            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Phone Number" type="text" id="phone" v-model="userData.phone"/>

            <div class="mt-2">
                <label class="p-1" for="driver_license">
                    Choose your driver license
                </label>
                <select
                    id="driver_license"
                    name="driver_license"
                    class="block w-full border px-2 py-2 border-gray-300 bg-white rounded-md shadow-sm"
                    v-model="userData.driver_license"
                >
                    <option v-for="license in storeUser.licenses">{{ license }}</option>
                </select>
            </div>

            <div class="mb-5">
                <button class="mt-5 p-2 rounded-md w-full bg-emerald-500" type="submit">Register</button>
            </div>

            <div class="mt-10 text-center text-sm">
                Already have an account?

                <RouterLink to="/login" class="font-semibold leading-6 hover:text-emerald-500">Login</RouterLink>
            </div>
        </form>
    </div>
</template>
