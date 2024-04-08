import axios from 'axios';

axios.defaults.baseURL = 'https://api.pawo.space/api/v1/';

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/',
});

const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const setAuth = () => {
  const jsonString = localStorage.getItem('persist:userRoot');
  const authToken =
    jsonString && JSON.parse(jsonString).token.replace(/^"(.*)"$/, '$1');
  if (authToken !== 'null') {
    setAuthHeader(authToken);
  }
};

export const getCarInfo = async (id: string) => {
  setAuth();

  const response = await instance.get(`transport/${id}?`);
  return response.data;
};
export const getUserDetails = async (id: string) => {
  setAuth();
  const response = await instance.get(`transport/user-details/${id}?`);
  return response.data;
};

export const getUserContacts = async (id: string) => {
  try {
    const response = await instance.get(`transport/user-contacts/${id}?`);
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні данних юзера', error);
  }
};

export const getCarDetails = async (id: string) => {
  setAuth();
  const response = await instance.get(`transport/details/${id}?`);
  return response.data;
};

export const getCarTypes = async () => {
  const response = await instance.get(`main/types`);
  return response.data;
};

export const getCarTypeParam = async (id: string) => {
  setAuth();
  try {
    const response = await instance.get(
      `catalog/get-param?transportTypeId=${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні данних по типу авто', error);
  }
};
export const getAdvertisement = async (id: string) => {
  setAuth();
  try {
    const response = await instance.get(
      `user-page/my-transports/get-details/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const postNewAdvertisement = async (formData: FormData) => {
  setAuth();
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.post(
      'main/advertisements',
      formData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Помилка в даних!', error);
  }
};
export const putEditAdvertisement = async (id: string, formData: FormData) => {
  setAuth();
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.put(
      `user-page/my-transports/update-details/${id}`,
      formData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Помилка в даних!', error);
  }
};

export const putDeleteAdvertisement = async (id: string) => {
  setAuth();
  try {
    const response = await instance.put(
      `user-page/my-transports/${id}/update-status/DELETED`,
    );
    return response.data;
  } catch (error) {
    console.error('Помилка в даних!', error);
  }
};
export const deletePhotoAdvertisement = async (
  id: string,
  callback: () => void,
) => {
  setAuth();
  try {
    const response = await instance.delete(
      `user-page/my-transports/delete-files/?galleryId=${id}`,
    );
    callback();
    return response.data;
  } catch (error) {
    console.error('Помилка при видаленні даних!', error);
  }
};
