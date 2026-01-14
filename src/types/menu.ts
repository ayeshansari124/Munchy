export type MenuSize = {
  name: string;
  price: number;
};

export type MenuExtra = {
  _id: string;
  name: string;
  price: number;
};

export type MenuItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  basePrice: number;
  sizes?: MenuSize[];
  extras?: MenuExtra[];
};
