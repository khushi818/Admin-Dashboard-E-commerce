import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginAdmin, signoutAdmin } from "../Action/authAction";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  loading: boolean;
  data:
    | {
        status: string;
        token: "";
      }
    | {};
  error: any | {};
  isAuthentication: boolean;
}

const initialState = {
  loading: false,
  data: {},
  error: null,
  isAuthentication: false,
} as authState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log(builder);
    builder.addCase(
      loginAdmin.fulfilled,
      (state, action: PayloadAction<authState>) => {
        state.loading = false;
        state.isAuthentication = true;
        console.log(action.payload);
        state.data = { ...action.payload };
      }
    );
    builder.addCase(signoutAdmin.fulfilled, (state) => {
      state.isAuthentication = false;
    });
    builder.addMatcher(
      isAnyOf(loginAdmin.pending, signoutAdmin.pending),
      (state) => {
        state.loading = true;
        // state.isAuthentication = false;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(loginAdmin.rejected, signoutAdmin.rejected),
      (state, action: PayloadAction<any>) => {
        state.isAuthentication = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice;
