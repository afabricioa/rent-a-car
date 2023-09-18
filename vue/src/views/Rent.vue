<script setup>
    import { ref } from 'vue';
    import PageComponent from '../components/PageComponent.vue';
    import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/solid'
    import { carStore } from '../store/carStore';

    const storeCar = carStore();

    const searchInfo = ref({
        start_date: '',
        end_date: '',
        type: 'All'
    });

    const carTypes = [
        {
            key: 'all',
            name: 'All',
            selected: true
        },
        {
            key: 'hatch',
            name: 'Hatch',
            selected: false
        },
        {
            key: 'sedan',
            name: 'Sedan',
            selected: false
        },
        {
            key: 'sedansport',
            name: 'Sedan Sport',
            selected: false
        },
        {
            key: 'suv',
            name: 'SUV',
            selected: false
        },
        {
            key: 'compact',
            name: 'Compact',
            selected: false
        },
        {
            key: 'truck',
            name: 'Truck',
            selected: false
        }
    ];

    function handleSearch(){
        storeCar.getCars(searchInfo.value.type);
    }

</script>

<template>
    <PageComponent title="Rent">
        <div class="flex justify-center items-center bg-orange-300 p-5 rounded-lg">
            <div class="mr-10">
                <label class="p-5 block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select id="type" name="type" v-model="searchInfo.type"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-50 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                    <option
                        v-for="carType in carTypes"
                    >
                        {{ carType.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="start_date" class="p-5 block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    v-model="searchInfo.start_date"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:border-gray-600 w-50 block shadow-sm sm:text-sm border-0 hover:bg-gray-100"
                />
            </div>
            <div>
                <label for="end_date" class="p-5 block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    v-model="searchInfo.end_date"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:border-gray-600 w-50 block shadow-sm sm:text-sm border-0 hover:bg-gray-100"
                />
            </div>
            <button @click="handleSearch" class="h-12 mt-12 py-2 ml-5">
                <MagnifyingGlassCircleIcon class="h-12 w-12 text-emerald-600 hover:text-emerald-400"/>
            </button>
        </div>
        <h1 v-if="storeCar.cars.length > 0" class="flex justify-center p-5 text-bold text-2xl">Available Cars</h1>
        <div v-for="car in storeCar.cars" class="bg-white shadow-lg p-2 mt-3 flex">
            <img :src="car.image_url" alt="" class="w-1/2 h-48 object-cover rounded-md" />
            <div class="flex justify-between w-full">
                <div class="p-2 ml-5">
                    <h1 class="text-2xl">{{ car.model }}</h1>
                    <h1 class="text-gray-500 mt-2">{{ car.brand }}</h1>
                    <h1 class="text-gray-800 mt-2">{{ car.type }}</h1>
                </div>
                <div class="m-5 p-10 flex">
                    {{ car.price }}
                    <button>
                        View Deal
                    </button>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<style scoped>
    ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
</style>
