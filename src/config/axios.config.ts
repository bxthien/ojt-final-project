// import axios from 'axios'

// export const refreshTokenAPI = async (refreshToken) => {
//     return await axiosClient.put(`${API_ROOT}/v1/users/refresh_token`, {
//       refreshToken
//     })
//   }

// let axiosClient = axios.create()
// axiosClient.defaults.timeout = 1000 * 60 * 10

// axiosClient.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken')
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// let refreshTokenPromise = null
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('accessToken')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('userInfo')

//       location.href = '/login'
//     }

//     const originalRequest = error.config
//     if (error.response?.status === 410 && originalRequest) {
//       if (!refreshTokenPromise) {
//         const refreshToken = localStorage.getItem('refreshToken')
//         refreshTokenPromise = refreshTokenAPI(refreshToken)
//           .then((res) => {
//             const { accessToken } = res.data
//             localStorage.setItem('accessToken', accessToken)
//             axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`
//           })
//           .catch(() => {
//             localStorage.removeItem('accessToken')
//             localStorage.removeItem('refreshToken')
//             localStorage.removeItem('userInfo')

//             location.href = '/login'
//           })
//           .finally(() => {
//             refreshTokenPromise = null
//           })
//       }

//       return refreshTokenPromise.then(() => {
//         return axiosClient(originalRequest)
//       })
//     }

//     if (error.response?.status !== 410) {
//       toast.error(error.response?.data?.message || error?.message)
//     }
//     return Promise.reject(error)
//   }
// )

// export default axiosClient
