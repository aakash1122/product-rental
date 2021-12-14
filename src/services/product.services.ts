import { filter, find, propEq } from "ramda";
import { Product } from "../types/Product.types";

export const getProductByCode = (code: string, allProducts: Product[]) => {
  const product = find(propEq("code", code), allProducts);
  return product;
};

export const getAvailabeProducts = (allProducts: Product[]) => {
  const isAvailable = propEq("availability", true);
  const products = filter(isAvailable, allProducts);
  return products;
};

export const getBookedProducts = (allProducts: Product[]) => {
  const isAvailable = propEq("availability", false);
  const products = filter(isAvailable, allProducts);
  return products;
};
