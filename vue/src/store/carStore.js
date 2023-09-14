import { defineStore } from "pinia";
import axiosClient from "../axios";

export const carStore = defineStore('car', {
    state(){
        return {
            cars: [],
            showCar: {}
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
            if(data.id){
                response = axiosClient.put(`/car/${data.id}`, data)
                    .then((res) => {
                        this.$patch({
                            showCar: res.data
                        });

                        return res.data;
                    });
            }else{
                response = axiosClient.post("/car", data)
                    .then((res) => {
                        this.$patch({
                            cars: [...this.cars, res.data]
                        });

                        return res.data;
                    });
            }

            return response;
        },
        async getCar(id){
            return axiosClient.get(`/car/${id}`)
                    .then(({data}) => {
                        this.$patch({
                            showCar: data.data
                        });
                        return data;
                    })

        },
        async deleteCar(id){
            return axiosClient.delete(`/car/${id}`);
        }
    }
});
