import axios from 'axios';
import { paramsSerializer } from 'utils/paramsSerializer';

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

export const getCarTypeParam = async (id: number) => {
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
  console.log('click');
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

export const fetchUserInfo = async () => {
  setAuth();
  try {
    const { data } = await instance(`user-page`);
    return data;
  } catch (error) {
    console.error('Помилка при отриманні даних!', error);
  }
};

export const getUserInfo = async () => {
  setAuth();
  try {
    const response = await instance.get('user-page');
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const putUserInfo = async (formData: FormData) => {
  setAuth();
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.put('user-page', formData, config);
    return response.data;
  } catch (error) {
    console.error('Помилка в даних!', error);
  }
};
export const deletePhotoUserInfo = async (callback: () => void) => {
  setAuth();
  try {
    const response = await instance.delete('user-page/delete-photo');
    callback();
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};

export const getHiddenUsersData = async () => {
  setAuth();
  try {
    const response = await instance.get('user-page/hidden/users');
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const getHiddenTransportsData = async () => {
  setAuth();
  try {
    const response = await instance.get('user-page/hidden/transports');
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const putUnHideUser = async (id: number) => {
  setAuth();
  try {
    const response = await instance.put(`user-page/unhide-all/user/${id}`);

    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const putUnHideTransport = async (id: number) => {
  setAuth();
  try {
    const response = await instance.put(`user-page/unhide/transport/${id}`);

    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const getUserProfile = async (id:number) => {
  setAuth();
  try {
    const response = await instance.get(`user-page/${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
};
export const getFavoritesCars = async () => {
  setAuth();
  try {
    const response = await instance.get('main/favorite-transports');
    return response.data;
  } catch (error) {
    console.error('Помилка в отриманні даних!', error);
  }
}; 
//https://api.pawo.space/api/v1/main/favorite-transports

export const fetchModelSList = async (id: number, brandId: number[]) => {
  setAuth();
  const searchParams = {
    transportBrandsId: brandId,
  };
   try {
     const config = {
       params: searchParams,
       paramsSerializer,
     };
     const response = await instance(
       `/catalog/get-param?transportTypeId=${id}`,
       config,
     );
     return response.data.transportModelDTOS || [];
   } catch (err) {
    console.error('Помилка в отриманні даних!', err);
   }
};