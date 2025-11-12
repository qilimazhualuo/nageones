import { request } from '@/common/request'
import { useDataStore } from './store'

const httpRequest = (options) => {
    const dataStore = useDataStore()
    const { token, loginInfo } = dataStore
    if (!options.url.includes('login')) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        }
    }
    options.url = `${loginInfo.baseUrl}${options.url}`
    return request(options)
}

export const loginApi = (data) => {
    return httpRequest({
        method: 'POST',
        url: `/api/project/auth/login`,
        data,
    })
}

export const getScheduleApi = (data) => {
    return httpRequest({
        url: `/api/project/team/JJe6dBze/resource_management/member_schedule_detail`,
        method: 'post',
        data,
    })
}
