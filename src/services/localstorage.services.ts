import { Product } from "./../types/Product.types";

export const saveDataToLocalstorage = (data: Product[]) => {
  window.localStorage.setItem("rentalData", JSON.stringify(data));
};

export const readDataFromLocalstorage = () => {
  return window.localStorage.getItem("rentalData");
};
