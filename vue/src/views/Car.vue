<script setup>
    import { RouterLink } from 'vue-router';
    import swal from 'sweetalert';
    import PageComponent from '../components/PageComponent.vue';
    import { carStore } from '../store/carStore';

    import { TrashIcon } from '@heroicons/vue/24/solid';

    const storeCar = carStore();

    storeCar.getCars('All');

    function handleDeleteCar(id){
        swal({
            title: 'Warning!',
            text: 'You are deleting a record, are you sure?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        })
        .then((willDelete) => {
            if(willDelete){
                storeCar.deleteCar(id).then((res) => {
                    swal("Success!", "Register deleted with success!", "success");
                    storeCar.getCars('All');
                })
            }
        })
    }
</script>

<template>
    <PageComponent title="Car">
        <template v-slot:header>
            <RouterLink class="bg-emerald-500 p-2 rounded-md text-white hover:bg-emerald-300" to="/car/form">New Car</RouterLink>
        </template>
        <div class="flex flex-wrap justify-center mt-10">
            <div v-if="storeCar.cars.length > 0" class="grid grid-cols-3 gap-4">
                <div v-for="car in storeCar.cars" class="bg-white shadow-md w-80 rounded-md p-2">
                    <img :src="car.image_url" alt="" class="w-full h-48 object-cover" />
                    <div class="flex justify-between py-1">
                        <h1 class="font-semibold text-gray-900 py-1">{{ car.model }}</h1>
                        <div v-if="car.available === 1" class="bg-emerald-500 text-white text-sm font-semibold p-2 rounded-full shadow-lg">Available</div>
                        <div v-else class="bg-red-500 text-white text-sm font-semibold p-2 rounded-full shadow-lg">Unavailable</div>
                    </div>
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
                    <div class="flex justify-between p-2">
                        <router-link
                            :to="{name: 'CarView', params: {id: car.id}}"
                            class="rounded-md bg-violet-500 p-2 text-white hover:bg-violet-800">
                            Details
                        </router-link>
                        <button @click="handleDeleteCar(car.id)">
                            <TrashIcon class="h-6 w-6 text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="bg-gray-300 rounded-md p-5">
                No records where found...
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
