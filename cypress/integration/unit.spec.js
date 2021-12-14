/// <reference types="cypress" />

import { calculateDurability, calculateFee } from "../../src/App";
import { Type } from "../../src/types/Product.types";

const prod = {
  code: "m5",
  name: "Boom lift 20",
  type: Type.plain,
  availability: true,
  needing_repair: false,
  durability: 1200,
  max_durability: 8000,
  mileage: 600,
  price: 500,
  minimum_rent_period: 1,
};

describe("test fee calculation", () => {
  it("should return 2500", () => {
    expect(calculateFee({ ...prod }, 5)).equal(2500);
  });
  it("apply discount of 500 and return 2000", () => {
    expect(calculateFee({ ...prod, discount: 500 }, 5)).equal(2000);
  });
  it("return null for not passing minimum rent duration with dicount", () => {
    expect(
      calculateFee({ ...prod, discount: 500, minimum_rent_period: 10 }, 9)
    ).equal(null);
  });
  it("return null for not passing minimum rent duration without discount", () => {
    expect(calculateFee({ ...prod, minimum_rent_period: 30 }, 9)).equal(null);
  });
});

describe("durability", () => {
  describe("tests plain type", () => {
    it("deceases durability to 95 and increase mileage to 1050", () => {
      expect(
        calculateDurability({ ...prod, type: Type.Plain, durability: 100 }, 5)
          .durability
      ).equal(95);
      expect(
        calculateDurability(
          { ...prod, type: Type.Plain, durability: 100, mileage: 1000 },
          5
        ).mileage
      ).equal(1050);
    });
  });

  describe("tests meter type", () => {
    it("increase mileage to 70 and decrease durability to 80 ", () => {
      expect(
        calculateDurability({ ...prod, type: Type.Meter, durability: 100 }, 5)
          .durability
      ).equal(80);
      expect(
        calculateDurability(
          { ...prod, type: Type.Meter, durability: 100, mileage: 20 },
          5
        ).mileage
      ).equal(70);
    });
  });
});
