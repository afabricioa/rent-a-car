import { defineStore } from "pinia";
import axiosClient from "../axios";

export const userStore = defineStore('user', {
    state(){
        return {
            user: {
                data: {},
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
        }
    }
})
