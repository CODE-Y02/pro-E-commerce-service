"use server";

import { CategoryInterface, getCategoryInputType } from "@/types/category";

const API_ENDPOINT = "http://localhost:4000/graphql";

const CACHE_REVALIDATION_SECONDS = 60 * 60 * 6; // 6 hrs

export const getCategory = async (
  input: getCategoryInputType
): Promise<CategoryInterface[] | undefined> => {
  const body = {
    query: `
        query GetCategory($id: String, $name: String) {
            getCategory(id: $id, name: $name) {
                _id
                name
                description
            }
        }
    `,

    variables: input,
  };

  try {
    const res = await fetch(API_ENDPOINT, {
      body: JSON.stringify(body),
      method: "POST",
      // cache: "reload",
      // next: { revalidate: 5 },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer YOUR_AUTH_TOKEN", // Replace YOUR_AUTH_TOKEN with your actual token
      },
    });
    const data = await res.json();

    return data?.data?.getCategory;
  } catch (error) {
    console.log(error);
  }
};
