import { Type } from "./../types/Product.types";
import { Product } from "../types/Product.types";
import { clone } from "ramda";

export const calculateDurability = (product: Product, usedMileage: number) => {
  const refProduct = clone(product);
  // set 0 if null
  const minimumPeriod = refProduct.minimum_rent_period ?? 0;
  const previeosMileage = refProduct.mileage ?? 0;
  let decreasedDur = 0;

  if (refProduct.type === Type.Plain) {
    decreasedDur = decreasedDur + minimumPeriod;
  } else if (refProduct.type === Type.Meter) {
    decreasedDur = decreasedDur + minimumPeriod * 2;
    // decrease 2 points per 10 miles a day
    decreasedDur += Math.floor(calcMeterPerTenMiles(minimumPeriod) / 10) * 2;
  }
  refProduct.mileage = previeosMileage + calcMeterPerTenMiles(minimumPeriod);
  refProduct.durability = refProduct.durability - decreasedDur;
  return refProduct;
};

const calcMeterPerTenMiles = (rentalDuration: number) => {
  return rentalDuration * 10;
};
