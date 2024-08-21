"use server";

import {
  getProductsInputType,
  getProductsResponseInterface,
} from "@/types/product";

const API_ENDPOINT = "http://localhost:4000/graphql";

export const getProducts = async (
  input: getProductsInputType
): Promise<getProductsResponseInterface | undefined> => {
  const body = {
    query: `
    query GetProducts($input: searchProductInput) {
      getProducts(input: $input) {
        products {
          _id
          name
          modelNumber
          description
          color
          imgUrl
          price
          size
          stock
          category
          reviews
          rating
          published
          createdAt
          updatedAt
        }
        count
        currentPage
        limit
        totalPages
        hasNextPage
        hasPrevPage
      }
    }`,
    variables: { input },
  };

  // console.log(input);

  try {
    const res = await fetch(API_ENDPOINT, {
      body: JSON.stringify(body),
      method: "POST",

      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer YOUR_AUTH_TOKEN", // Replace YOUR_AUTH_TOKEN with your actual token
      },
    });
    const data = await res.json();

    return data?.data?.getProducts;
  } catch (error) {
    console.log(error);
  }
};
