import { invoke } from '@tauri-apps/api/core'

export const request = ({ url, method = 'get', params = {}, data = {}, headers = {}, timeout = 5000 }) => {
    return new Promise((resolve, reject) => {
        url = url.includes('http') ? url : `${baseUrl}${url}`
        const options = { method, params, body: data, headers }
        if (method === 'get' || method === 'GET') {
            delete options.body
        }
        invoke('http_request', { url: url, options }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}