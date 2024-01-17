import axios from "axios";
axios.defaults.baseURL = 'https://api.pawo.space/api/v1/';

export const  getCarInfo=async(id:string)=>{
    const response = await axios.get(`transport/${id}?`)
    return response.data
}

export const  getCarDetails=async(id:string)=>{
    const response = await axios.get(`transport/details/${id}?`)
    return response.data
}