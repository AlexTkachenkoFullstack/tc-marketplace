import axios from 'axios';

axios.defaults.baseURL = 'https://api.pawo.space/api/v1/';

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/',
});

export const setAuthHeaderForHide = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getCarInfo = async (id: string,authToken:string) => {
  setAuthHeaderForHide(authToken);
  const response = await instance.get(`transport/${id}?`);
  return response.data;
};
export const getUserDetails = async (id: string,authToken:string) => {
  setAuthHeaderForHide(authToken);
  const response = await instance.get(`transport/user-details/${id}?`);
  return response.data;
};

export const getUserContacts = async (id: string, token: string) => {
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
};

export const getCarDetails = async (id: string,authToken:string) => {
  setAuthHeaderForHide(authToken);
  const response = await instance.get(`transport/details/${id}?`);
  return response.data;
};

export const getCarTypes = async () => {
  const response = await axios.get(`main/types`);
  return response.data;
};

export const getCarTypeParam = async (id: string,authToken:string) => {
  setAuthHeaderForHide(authToken);
  try {
    const response = await instance.get(`catalog/get-param?transportTypeId=${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні данних по типу авто', error);
  }
};
export const getAdvertisement = async (
  id:string,
  authToken: string,
) => {
  setAuthHeaderForHide(authToken); 
  try {
    const response = await instance.get(`user-page/my-transports/get-details/${id}`)   
    return response.data
  } catch (error) {
    console.error('Помилка в отриманні даних!', error)
  }
};
export const postNewAdvertisement = async (
  formData: FormData,
  authToken: string,
) => {
  setAuthHeaderForHide(authToken);
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.post('main/advertisements', formData, config)   
    return response.data
  } catch (error) {
    console.error('Помилка в даних!', error)
  }
};
export const putEditAdvertisement = async (
  id:string,
  formData: FormData,
  authToken: string,
) => {
  setAuthHeaderForHide(authToken);
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.put(`user-page/my-transports/update-details/${id}`, formData, config)   
    return response.data
  } catch (error) {
    console.error('Помилка в даних!', error)
  }
};

export const putDeleteAdvertisement = async (
  id:string, 
  authToken: string,
) => {
  setAuthHeaderForHide(authToken);
 
  try {
    const response = await instance.put(`user-page/my-transports/${id}/update-status/DELETED`)   
    return response.data
  } catch (error) {
    console.error('Помилка в даних!', error)
  }
};