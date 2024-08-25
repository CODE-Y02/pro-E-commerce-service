export interface PaginationInterface {
  limit?: number;
  currentPage?: number;
  totalPages: number;
  count: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface ProductInterface {
  _id: string;
  name: string;
  modelNumber: string;
  description?: string | null;
  color?: string | null;
  imgUrl?: string | null;
  price: number;
  size?: string | null;
  stock: number;
  category: string;
  reviews?: [string] | null;
  rating?: number | null;
  published?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface getProductsResponseInterface extends PaginationInterface {
  products: ProductInterface[];
}

export enum PRODUCT_SORT_OPTION {
  rating_desc,
  rating_asc,
  price_low_to_high,
  price_high_to_low,
  date_add,
  date_add_desc,
}

export type getProductsInputType = {
  id?: string | null;
  name?: string | null;
  modelNumber?: string | null;
  published?: boolean | null;
  category?: string | null;
  filters?: {
    includeOutOfStock?: boolean | null;
    minRating?: number | null;
    priceMax?: number | null;
    priceMin?: number | null;
  };
  sortBy?: PRODUCT_SORT_OPTION;
  limit?: number | 10;
  page?: number | 1;
};

export type updateProductInputType = {
  id: string;
  category?: string;
  description?: string;
  imgUrl?: string;
  modelNumber?: string;
  name?: string;
  price?: number;
  published?: boolean;
  stock?: number;
};

export type createProductInputType = {
  name: string;
  modelNumber: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  published?: boolean | false;
  imgUrl?: string;
};
