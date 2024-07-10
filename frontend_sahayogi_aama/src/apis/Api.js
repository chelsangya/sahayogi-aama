import axios from "axios";

const Api = axios.create({
    withCredentials:true,
    baseURL: "http://localhost:5500",
    headers:{
        'Content-Type':'multipart/form-data'
    }
})

// make seperate header for authorization
const token = localStorage.getItem('token')
const config = {
    headers : {
        'authorization': `Bearer ${token}`
    }
}

export const registerUserApi= (formData) => Api.post('/api/user/create',formData)

export const loginUserApi= (data) => Api.post('/api/user/login',data)

export const getAamaDetailsApi = () => Api.get('/api/aama/get')

export const addAamaApi = (formData) => Api.post('/api/aama/create', formData)

export const updateAamaVerification = (formData) => Api.put('/api/aama/updateVerification', formData)

export const getAamaDetailsById = (id) => Api.get(`/api/aama/getById/${id}`,id)

export const createBooking = (formData) => Api.post('/api/booking/create', formData, config)

export const getAllBookingApi = () => Api.get('/api/booking/all', config)

export const createFavouriteApi = (formData) => Api.post('/api/favourite/create', formData, config)

export const deleteBookingByIdApi = (id) => Api.delete(`/api/booking/delete/${id}`, config)

export const getFavListApi = () => Api.get('/api/favourite/all', config)

export const editUserPassword = (id, formData) => Api.put(`/api/user/editPassword/${id}`, formData ,config)

export const editUserApi = (formData) => Api.put(`/api/user/editProfile`, formData, config)

export const deleteFavApi = (id) => Api.delete(`/api/favourite/delete/${id}`, config)

export const deleteAamaById = (id) => Api.delete(`/api/aama/delete/${id}`)

export const updateAamaApi = (id, formData) => Api.put(`/api/aama/update/${id}`, formData)