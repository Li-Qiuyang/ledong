import axios from "axios";
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true
const axiosPackage = {
    install(Vue) {
        const instance = axios.create({ baseURL: `http://8.146.199.110:3000/` })
        // 添加请求拦截器
        instance.interceptors.request.use(
            config => {
                // 在发送请求前做什么
                config.headers['withCredentials'] = true
                return config
            },
            error => {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )
        // 添加响应拦截器
        instance.interceptors.response.use(
            response => {
                // 对响应数据做处理
                console.log(response)
                return response
            },
            error => {
                // 对响应错误做处理 
                if (error.response && error.response.status == 500) {
                    console.error('server error')
                }
                return Promise.reject(error)
            }
        )
        Vue.prototype.$axios = instance
    }
}
export default axiosPackage