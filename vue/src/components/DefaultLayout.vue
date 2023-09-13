<script setup>
    import { RouterView, RouterLink, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { userStore } from '../store/userStore';

    const storeUser = userStore();
    const router = useRouter();

    const pages = [
        {name: 'Home', path: '/'},
        {name: 'Car', path: '/car'},
        {name: 'Rent', path: '/rent'}
    ];

    const mobileMenuOpen = ref(false)

    function handleLogout(){
        storeUser.logout().then(() => {
            router.push('/login');
        });
    }

</script>

<template>
    <header class="bg-white">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <RouterLink class="text-sm font-semibold leading-6 text-gray-900" v-for="item in pages" :to="item.path">{{ item.name }}</RouterLink>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <button @click="handleLogout" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log out &rarr;</button>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
                </div>
                <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-6">
                        <RouterLink class="text-sm font-semibold leading-6 text-gray-900" v-for="item in pages" :to="item.path">{{ item.name }}</RouterLink>
                    </div>
                    <div class="py-6">
                        <button class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log out</button>
                    </div>
                </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
    <RouterView/>
</template>
