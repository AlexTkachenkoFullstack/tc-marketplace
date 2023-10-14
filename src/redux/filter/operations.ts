import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-production-448a.up.railway.app/api/v1/',
});

// interface ResponseData{
//     transportId: number,
//     imgUrl: string,
//     transportBrand: string,
//     transportModel: string,
//     price: number,
//     mileage: number,
//     city: string,
//     transmission: string,
//     fuelType: string,
//     year: number,
//     created: string,
// }

export const fetchNewCars = createAsyncThunk(
  'cars/getNew',
  async ({page,limit}: { page: number; limit: number }, thunkAPI) => {
    try {
      const response = await instance(`main/newCars/${page}/${limit}`);
        console.log(response)
      return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

