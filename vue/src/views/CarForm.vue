<script setup>
import { ref } from 'vue';

    const car = ref({
        model:'',
        brand: '',
        type: '',
        year: null,
        passengers: 0,
        price: 0,
        transmission: '',
        available: true,
        image: ''
    });

    const carTypes = ['Hatch', 'Sedan', 'Sedan Sport', 'SUV', 'Compact'];
</script>

<template>
    <form>
        <div class="flex justify-around p-10 shadow sm:rounded-md sm:overflow-hidden">
            <div class="w-full bg-gray-500 p-5">
                <div class="flex justify-center p-5">
                    <label>
                        Model
                    </label>
                    <input v-model="car.model"/>
                </div>

                <div class="flex justify-center p-5">
                    <label>
                        Brand
                    </label>
                    <input v-model="car.brand"/>
                </div>

                <div class="flex justify-center p-5">
                    <label>
                        Type
                    </label>
                    <select>
                        <option v-for="carType in carTypes">{{ carType }}</option>
                    </select>
                </div>
                <div class="flex justify-center p-5">
                    <select>
                        <option>Automatic</option>
                        <option>Manual</option>
                    </select>
                </div>

            </div>
            <div class="w-full">
                <input type="number" min="2010" max="2023" v-model="car.year"/>
                <input v-model="car.passengers"/>
                <input v-model="car.price"/>
            </div>
        </div>
    </form>
</template>
