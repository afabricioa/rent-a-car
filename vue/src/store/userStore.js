import { defineStore } from "pinia";
import axiosClient from "../axios";

export const userStore = defineStore('user', {
    state(){
        return {
            user: {
                data: JSON.parse(sessionStorage.getItem('USER')),
                token: sessionStorage.getItem('TOKEN')
            },
            licenses: ['A', 'B', 'C', 'D', 'E']
        }
    },
    actions: {
        async register(data){
            console.log(data)
            return axiosClient.post('/register', data)
                .then(({data}) => {
                    this.$patch({
                        user: {
                            data: data.user,
                            token: data.token
                        }
                    });
                    sessionStorage.setItem('TOKEN', data.token);
                    return data;
                })
        },
        async login(credentials){
            return axiosClient.post('/login', credentials)
                .then(({data}) => {
                    console.log(data)
                    this.$patch({
                        user: {
                            data: data.user,
                            token: data.token
                        }
                    })
                    sessionStorage.setItem('USER', JSON.stringify(data.user));
                    sessionStorage.setItem('TOKEN', data.token);
                    return data;
                })
        },

        async logout(){
            return axiosClient.post('/logout')
                .then(response => {
                    this.$patch({
                        user: {
                            data: {},
                            token: null
                        }
                    });
                    sessionStorage.clear();
                    return response;
                })
        }
    }
})
