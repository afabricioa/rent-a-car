<script setup>
    import { ref, watch } from 'vue';
    import PageComponent from '../components/PageComponent.vue';
    import { MagnifyingGlassCircleIcon, UserIcon } from '@heroicons/vue/24/solid'
    import { carStore } from '../store/carStore';
    import moment from 'moment';

    const storeCar = carStore();
    const searchInfo = ref({
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().add(1, 'days').format('YYYY-MM-DD'),
        type: 'All'
    });

    const totalDays = ref(1);

    watch(
        () => new Date(searchInfo.value.end_date).getTime() - new Date(searchInfo.value.start_date).getTime(),
        (diffDays) => {
            totalDays.value = Math.ceil(diffDays/(1000 * 3600 * 24));
        }
    )

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

    function handleSelectPrice(e){
        console.log(e)
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
                    End Date
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
        <h1 v-if="storeCar.cars.length > 0" class="flex justify-center p-5 text-bold text-2xl">{{ `${storeCar.cars.length} available cars` }}</h1>
        <div v-if="storeCar.cars.length > 0" class="lg:flex gap-4">
            <div class="p-2 mt-3 lg:w-1/4 border-solid border-2 rounded-md">
                <div class="flex justify-between border-b-2">
                    <h1 class="p-1 h-10 text-bold text-2xl">Filter</h1>
                    <h1 class="p-3 h-10 text-blue-400 hover:text-blue-700 cursor-pointer">Clear All Filters</h1>
                </div>
                <div class="p-2 mt-2">
                    <h1>Price Per Day</h1>
                    <div class="py-1">
                        <input
                            type="checkbox"
                            @change="handleSelectPrice([0, 50])"
                            class="rounded-sm w-5 h-5"
                            id="050"
                            name="050"
                        />
                        <label class="p-1" for="050">$50-$100</label>
                    </div>
                    <div class="py-1">
                        <input
                            type="checkbox"
                            @change="handleSelectPrice([50,100])"
                            class="rounded-sm w-5 h-5"
                            id="50100"
                            name="50100"
                        />
                        <label class="p-1" for="50100">$50-$100</label>
                    </div>
                    <div class="py-1">
                        <input
                            type="checkbox"
                            @change="handleSelectPrice([100,200])"
                            class="rounded-sm w-5 h-5"
                            id="100200"
                            name="100200"
                        />
                        <label class="p-1" for="100200">$100-$200</label>
                    </div>
                    <div class="py-1">
                        <input
                            type="checkbox"
                            @change="handleSelectPrice([200])"
                            class="rounded-sm w-5 h-5"
                            id="200plus"
                            name="200plus"
                        />
                        <label class="p-1" for="200plus">$200+</label>
                    </div>
                </div>
            </div>
            <div class="lg:w-3/4">
                <div v-for="car in storeCar.cars" class="bg-white shadow-lg p-2 mt-3 flex rounded-md border-solid border-2 border-gray-200">
                    <div class="w-1/3">
                        <img :src="car.image_url" alt="" class="w-full h-48 object-cover rounded-md" />
                    </div>
                    <div class="w-2/3">
                        <div class="flex justify-between w-full">
                            <div class="p-2 ml-5">
                                <div class="flex gap-2">
                                    <h1 class="text-2xl">{{ car.type }}</h1>
                                    <h1 class="mt-2 text-sm text-gray-800">{{ car.model }}</h1>
                                </div>
                                <h1 class="text-gray-500 mt-2">{{ car.brand }}</h1>
                                <div class="grid grid-cols-2 gap-4 mt-4">
                                    <div class="flex">
                                        <UserIcon class="h-4 w-4 mt-1 mr-1"/>{{ `${car.passengers} Seats` }}
                                    </div>
                                    <div>
                                        {{ car.transmission }}
                                    </div>
                                    <div>
                                        {{ `Licenses to drive: ${car.licenses.length > 2 ? car.licenses.split('/').sort() : car.licenses.replace('/', '')}` }}
                                    </div>
                                </div>
                            </div>
                            <div class="m-5 p-10 grid justify-center items-center">
                                <div class="grid justify-center">
                                    <h1>{{ `Price for ${totalDays} days:` }}</h1>
                                    <h1 class="text-3xl font-bold ml-10">${{ totalDays * car.price }}</h1>
                                </div>
                                <br/>
                                <button class="w-40 rounded-md bg-green-700 text-white text-1xl p-2 hover:bg-green-900">
                                    View Deal
                                </button>
                            </div>
                        </div>
                    </div>
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
