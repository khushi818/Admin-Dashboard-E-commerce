import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface productState {
  loading: boolean;
  data:
    | {
        productName: string;
        productDescription: string;
        productPrice: number;
        productScndPrice: number;
        productSize?: string;
        productCategory: string;
        productStock?: number;
        productImage: {};
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
} as productState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  // extraReducers: () => {
  //   builder.addCase(
  //     createProduct.fulfilled,
  //     (state, action: PayloadAction<productState>) => {
  //       state.loading = false;
  //       console.log(action.payload);
  //       state.data = { ...action.payload };
  //     }
  //   );

  //   builder.addCase(getAllProduct.fulfilled, (state) => {
  //     state.loading = false;
  //   });
  //   builder.addMatcher(
  //     isAnyOf(createProduct.pending),
  //     (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     }
  //   );

  //   builder.addMatcher(
  //     isAnyOf(createProduct.rejected),
  //     (state, action: PayloadAction<any>) => {
  //       state.error = action.payload;
  //     }
  //   );
  // },
  // }
});

export default productSlice;
