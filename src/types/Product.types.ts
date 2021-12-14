export interface Product {
  code: string;
  name: string;
  type: Type;
  availability: boolean;
  needing_repair: boolean;
  durability: number;
  max_durability: number;
  mileage: number | null;
  price: number;
  minimum_rent_period: number;
  discount?: number;
}

export enum Type {
  Meter = "meter",
  Plain = "plain",
}
