import axios from "axios";
axios.defaults.baseURL = 'https://api.pawo.space/api/v1/';

export const  getCarInfo=async(id:string)=>{
    const response = await axios.get(`transport/${id}?`)
    return response.data
}


export const  getUserDetails=async(id:string)=>{
    const response = await axios.get(`transport/user-details/${id}?`)
    return response.data
}

export const  getUserContacts=async(id:string, token:string)=>{
    
    try {
        const response = await axios.get(`transport/user-contacts/${id}?`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Помилка в отриманні данних юзера', error);
      }
}