import axios from 'axios';

axios.defaults.baseURL = 'https://api.pawo.space/api/v1/';

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/',
});

export const setAuthHeaderForHide = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getCarInfo = async (id: string) => {
  const response = await axios.get(`transport/${id}?`);
  return response.data;
};
export const getUserDetails = async (id: string) => {
  const response = await axios.get(`transport/user-details/${id}?`);
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

export const getCarDetails = async (id: string) => {
  const response = await axios.get(`transport/details/${id}?`);
  return response.data;
};

export const getCarTypes = async () => {
  const response = await axios.get(`main/types`);
  return response.data;
};

export const getCarTypeParam = async (id: string) => {
  try {
    const response = await axios.get(`catalog/get-param?transportTypeId=${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні данних по типу авто', error);
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
      'Content-Length': 1000000000000000,
    },
  };
  instance
    .post('main/advertisements', formData, config)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
};
