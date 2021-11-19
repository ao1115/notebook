import axios from 'axios'
import baseURL from './config-baseURL'
//https://note-server.hunger-valley.com
axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com' //服务端地址放在这里，发请求的时候只需要写它后面的url就可以
axios.defaults.withCredentials = true; //表示允许跨域
export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus: function (status) {
                return status >= 200 && status < 300 || status === 400// 默认值
            },
        }
        if (type.toLowerCase() === 'GET') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(error => {
            reject({ meg: '网络异常' })
        })
    })
}