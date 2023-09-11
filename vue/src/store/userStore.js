import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state(){
        return {
            user: {
                data: {},
                token: null
            },
            licenses: ['A', 'B', 'C', 'D', 'E']
        }
    }
})
