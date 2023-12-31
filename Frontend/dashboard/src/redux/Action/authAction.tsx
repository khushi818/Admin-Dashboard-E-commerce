import axios from "axios";
import { BASE_URL } from "../../url";
import { createAsyncThunk } from "@reduxjs/toolkit";

type auth = {
  email: string;
  password: string;
};

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (authData: auth, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(authData);
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/auth/signin`,
        authData,
        config
      );
      console.log(data);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signoutAdmin = createAsyncThunk(
  "auth/Signout",
  async ({}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(`${BASE_URL}/api/v1/auth/signout`, config);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
