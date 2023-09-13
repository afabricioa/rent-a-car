import { defineStore } from "pinia";
import axiosClient from "../axios";

const carros = [
    {
        id: 1,
        model: 'Fusion',
        brand: 'Ford',
        type: 'Sport Sedan',
        year: 2020,
        passengers: 5,
        price: 90,
        transmission: 'Automatic',
        available: true,
        image: "https://diariodocomercio.com.br/wp-content/uploads/2019/02/Fusion.jpg"
    },
    {
        id: 2,
        model: 'Edge',
        brand: 'Ford',
        type: 'SUV',
        year: 2020,
        passengers: 7,
        price: 120,
        transmission: 'Automatic',
        available: true,
        image: "https://media.gazetadopovo.com.br/2016/07/6999988d140299e013a66bda789ecbea-gpLarge.jpg",
    },
    {
        id: 3,
        model: 'Cruze',
        brand: 'Chevrolet',
        type: 'Sport Sedan',
        year: 2022,
        passengers: 5,
        price: 70,
        transmission: 'Manual',
        available: true,
        image: "https://garagem360.com.br/wp-content/uploads/2023/03/Chevrolet-Cruze-LT-2023-4.jpg"
    },
]
export const carStore = defineStore('car', {
    state(){
        return {
            cars: []
        }
    },
    actions: {
        async getCars(){
            return axiosClient.get("/car")
                .then(({data}) => {
                    this.$patch({
                        cars: data.data
                    })
                })
        },
        async saveCar(data){
            let response;
            response = axiosClient.post("/car", data)
                        .then((res) => {
                            this.$patch({
                                cars: [...this.cars, res.data]
                            });
                            console.log(res)
                            return res.data;
                        });
            return response;
        }
    }
});
