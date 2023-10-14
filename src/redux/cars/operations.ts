import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-production-448a.up.railway.app/api/v1/',
});

export const fetchNewCars = createAsyncThunk(
  'cars/getNew',
  async ({page,limit}: { page: number; limit: number }, thunkAPI) => {
    try {
      
      const response = await instance(`main/newCars/${page}/${limit}`);
        console.log(response.data)
      return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

