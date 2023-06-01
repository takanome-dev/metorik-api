import _axios from 'axios'

const axios = _axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: false, // <-- Add this if you want to use cookies in your request (e.g. for authentication)
})

/**
 * Add a request interceptor
 *
 * ## Example
 *
 * Add an authorization header to all requests
 */
axios.interceptors.request.use((config) => {
    // * Do something before request is sent
    return config
})

/**
 * Add a response interceptor
 *
 * ## Example
 *
 * Handle 401 errors
 */
axios.interceptors.response.use((response) => {
    // * Do something with response data
    return response
})

export default axios
