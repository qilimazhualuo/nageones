import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore(
    'onesInfo',
    () => {
        const token = ref('')

        const setToken = (val) => {
            token.value = val
        }

        const loginInfo = ref({
            email: '',
            password: '',
        })

        const userInfo = ref({})
        const setUserInfo = (val) => {
            userInfo.value = val
        }

        return { token, setToken, loginInfo, userInfo, setUserInfo }
    },
    {
        persist: {
            storage: localStorage,
            pick: ['token', 'loginInfo', 'userInfo'],
        },
    },
)
