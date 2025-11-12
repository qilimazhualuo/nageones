import { request } from '@/common/request'
import { useDataStore } from './store'

const baseUrl = 'http://113.201.2.132:11301/project'

const httpRequest = (options) => {
    const dataStore = useDataStore()
    const { token } = dataStore
    if (!options.url.includes('login')) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        }
    }
    return request(options)
}

export const loginApi = (data) => {
    return httpRequest({
        method: 'POST',
        url: `${baseUrl}/api/project/auth/login`,
        data,
    })
}

export const getScheduleApi = (data) => {
    return httpRequest({
        url: `${baseUrl}/api/project/team/JJe6dBze/resource_management/member_schedule_detail`,
        method: 'post',
        data,
    })
}
