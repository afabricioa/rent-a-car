import { defineStore } from "pinia";
import axiosClient from "../axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const carStore = defineStore('car', {
    state(){
        return {
            cars: [],
            showCar: {}
        }
    },
    actions: {
        async getCars(category){
            this.startLoading();
            return axiosClient.get("/car", {
                params: {
                    category: category
                }
            })
                .then(({data}) => {
                    this.$patch({
                        cars: data.data
                    });
                    this.stopLoading();
                });
        },
        async saveCar(data){
            this.startLoading();
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
            this.stopLoading();
            return response;
        },
        async getCar(id){
            this.startLoading();
            return axiosClient.get(`/car/${id}`)
                    .then(({data}) => {
                        this.$patch({
                            showCar: data.data
                        });
                        this.stopLoading();
                        return data;
                    })

        },
        async deleteCar(id){
            this.startLoading();
            return axiosClient.delete(`/car/${id}`).then(() => {
                this.stopLoading();
            });
        },
        async startLoading(){
            Loading.init({
                backgroundColor: 'rgba(0,0,0,0.9)',
                svgColor: '#5C697D'
            });
            Loading.dots();
        },
        async stopLoading(){
            Loading.remove();
        }
    }
});
