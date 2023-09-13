<script setup>
    import { RouterLink } from 'vue-router';
    import PageComponent from '../components/PageComponent.vue';
    import { carStore } from '../store/carStore';
    const storeCar = carStore();
</script>

<template>
    <PageComponent title="Car">
        <template v-slot:header>
            <RouterLink class="bg-emerald-500 p-2 rounded-md text-white hover:bg-emerald-300" to="/car/form">New Car</RouterLink>
        </template>
        <div class="flex flex-wrap justify-center mt-10">
            <div class="grid grid-cols-3 gap-4">
                <div v-for="car in storeCar.cars" class="bg-white shadow-md w-80 rounded-md p-2">
                    <img :src="car.image" alt="" class="w-full h-48 object-cover" />
                    <h1 class="font-semibold text-gray-900 py-1">{{ car.model }}</h1>
                    <h3 class="font-medium text-gray-700 text-sm py-1">{{ car.brand }}</h3>
                    <div class="flex gap-2 py-1">
                        <h3 class="font-medium text-gray-700 text-sm">{{ car.type }}</h3>
                        <h3 class="font-medium text-gray-700 text-sm">{{ car.year }}</h3>
                    </div>
                    <h3 class="font-medium text-gray-700 text-sm py-1">{{ car.transmission }}</h3>
                    <div class="flex gap-2 py-1">
                        <h3 class="font-medium text-gray-700 text-sm">
                            Passengers: {{ car.passengers }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<style scoped>
    .cardGrid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 20px;
    }
</style>
