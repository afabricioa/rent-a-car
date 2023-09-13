<script setup>
    import { ref } from 'vue';
    import { carStore } from '../store/carStore';

    const storeCar = carStore();

    const car = ref({
        model:'',
        brand: '',
        type: '',
        year: null,
        passengers: 0,
        price: '',
        transmission: '',
        available: true,
        image: ''
    });

    const carTypes = ['Hatch', 'Sedan', 'Sedan Sport', 'SUV', 'Compact'];

    function onImageChange(ev){
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            car.value.image = reader.result;
        };

        reader.readAsDataURL(file);
    }

    function handleSaveCar(){
        car.value.price = parseFloat(car.value.price);
        storeCar.saveCar(car.value)
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    }
</script>

<template>
    <div class="flex justify-center">
        <h1 class="text-2xl font-semibold">Type information about the new car</h1>
    </div>
    <form @submit.prevent="handleSaveCar">
        <div class="p-8 shadow sm:rounded-md sm:overflow-hidden">
            <div class="flex justify-center">
                <img v-if="car.image" :src="car.image" :alt="car.model" class="w-64 h-48 object-cover" />
                <span
                    v-else
                    class="flex items-center justify-center
                            h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </span>
                <button
                    type="button"
                    class="relative
                        overflow-hidden
                        ml-5
                        bg-white
                        py-2 px-3
                        border border-gray-300
                        rounded-md
                        shadow-sm text-sm
                        leading-4
                        font-medium text-gray-700
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500
                    "
                >
                    <input
                        type="file"
                        @change="onImageChange"
                        class="absolute left-0 top-0 bottom-0 right-0 opacity-0 cursor-pointer"
                    />
                    Choose Image
                </button>
            </div>
            <div class="flex justify-around ">
                <div class="w-full p-5">
                    <div>
                        <label for="model" class="p-5 block text-sm font-medium text-gray-700">
                            Model
                        </label>
                        <input
                            v-model="car.model"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label for="brand" class="p-5 block text-sm font-medium text-gray-700">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            v-model="car.brand"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label for="type" class="p-5 block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select id="type" name="type" v-model="car.type"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option
                                v-for="carType in carTypes"
                            >
                                {{ carType }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="transmission" class="p-5 block text-sm font-medium text-gray-700">
                            Transmission
                        </label>
                        <select
                            id="transmission"
                            name="transmission"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                            v-model="car.transmission"
                        >
                            <option>Automatic</option>
                            <option>Manual</option>
                        </select>
                    </div>

                </div>
                <div class="w-full p-5">
                    <div>
                        <label for="year" class="p-5 block text-sm font-medium text-gray-700">
                            Year
                        </label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            v-model="car.year"
                            min="2010"
                            max="2023"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label for="passengers" class="p-5 block text-sm font-medium text-gray-700">
                            Passengers
                        </label>
                        <input
                            type="number"
                            id="passengers"
                            name="passengers"
                            v-model="car.passengers"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label for="price" class="p-5 block text-sm font-medium text-gray-700">
                            Daily Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="$0.00"
                            v-model="car.price"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-80 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button class="w-80 bg-emerald-500 p-2 rounded-md text-white text-1xl">
                    Save
                </button>
            </div>
        </div>
    </form>
</template>
