import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawData from "../../data.json";
import { calculateDurability } from "../../services/rental.services";
import { saveDataToLocalstorage } from "./../../services/localstorage.services";
import { Product } from "./../../types/Product.types";

type ProductAndmileage = { product: Product; mileage: number };

export interface RentalState {
  data: Product[];
}

const initialState: RentalState = {
  data: rawData as Product[],
};

export const rentalSlice = createSlice({
  name: "rentalSlice",
  initialState,
  reducers: {
    loadInitialData: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
    },
    bookProduct: (state, { payload }: PayloadAction<string>) => {
      let products = state.data.map((product) => {
        if (product.code === payload) {
          // update
          return {
            ...product,
            availability: false,
          };
        }
        return product;
      });
      state.data = products;
      saveDataToLocalstorage(products);
    },
    returnProduct: (state, { payload }: PayloadAction<ProductAndmileage>) => {
      const { product, mileage } = payload;
      let modifiedProduct = calculateDurability(product, mileage);
      let products = state.data.map((savedData) => {
        if (savedData.code === product.code) {
          // update
          return {
            ...modifiedProduct,
            availability: true,
          };
        }
        return savedData;
      });
      state.data = products;
      saveDataToLocalstorage(products);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadInitialData, bookProduct, returnProduct } =
  rentalSlice.actions;

export default rentalSlice.reducer;
