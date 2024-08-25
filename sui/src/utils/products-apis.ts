"use server";

import {
  createProductInputType,
  getProductsInputType,
  getProductsResponseInterface,
  // ProductInterface,
  updateProductInputType,
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

    // console.log(data);

    return data?.data?.getProducts;
  } catch (error) {
    console.log(error);
  }
};

// Define the GraphQL query and mutation strings
const UPDATE_PRODUCT_MUTATION = `
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
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
  }
`;

const CREATE_PRODUCT_MUTATION = `
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
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
  }
`;

// Function to update a product
export const updateProduct = async (input: updateProductInputType) => {
  const body = {
    query: UPDATE_PRODUCT_MUTATION,
    variables: { input },
  };

  console.log("\n UPDATING  \n", input);

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with your auth token
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    console.log("\n UPDATE DONE  \n", data);

    return data?.data?.updateProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw the error after logging it
  }
};

// Function to create a new product
export const createProduct = async (input: createProductInputType) => {
  const body = {
    query: CREATE_PRODUCT_MUTATION,
    variables: { input },
  };

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with your auth token
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    console.log("product created ");

    return data?.data?.createProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Re-throw the error after logging it
  }
};
