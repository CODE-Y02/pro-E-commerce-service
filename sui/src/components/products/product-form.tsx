"use client";

import { CategoryInterface } from "@/types/category";
import {
  createProductInputType,
  ProductInterface,
  updateProductInputType,
} from "@/types/product";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useReducer,
  ChangeEvent,
  FormEvent,
} from "react";
import { Button } from "../ui/button";
import { getCategory } from "@/utils/categories-api";
import { createProduct, updateProduct } from "@/utils/products-apis";

// Action Types
type Action =
  | { type: "SET_PRODUCT_DATA"; payload: Partial<ProductInterface> }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_CATEGORIES"; payload: CategoryInterface[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Initial State Type
interface State {
  productData: Partial<ProductInterface>;
  imgPreview: string;
  categories: CategoryInterface[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: State = {
  productData: {
    name: "",
    price: 0,
    imgUrl: "",
    stock: 0,
    published: false,
    category: "",
    description: [],
  },
  imgPreview: "",
  categories: [],
  loading: false,
  error: null,
};

// Reducer Function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCT_DATA":
      return {
        ...state,
        productData: { ...state.productData, ...action.payload },
      };
    case "SET_IMAGE_PREVIEW":
      return { ...state, imgPreview: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

type Props = {
  product?: ProductInterface;
  isNew: boolean;
};

const ProductForm: React.FC<Props> = ({ product, isNew }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCategoryData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const cat = await getCategory({});
      dispatch({ type: "SET_CATEGORIES", payload: cat || [] });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching categories." });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  useEffect(() => {
    if (isNew) {
      dispatch({ type: "SET_PRODUCT_DATA", payload: initialState.productData });
      dispatch({ type: "SET_IMAGE_PREVIEW", payload: "" });
    } else if (product?._id) {
      dispatch({
        type: "SET_PRODUCT_DATA",
        payload: {
          ...product,
          description: Array.isArray(product.description)
            ? product.description
            : [],
        },
      });
      dispatch({ type: "SET_IMAGE_PREVIEW", payload: product.imgUrl || "" });
    }
  }, [product, isNew]);

  const createOrUpdateProduct = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      if (isNew) {
        await createProduct(state.productData as createProductInputType);
      } else if (product?._id) {
        await updateProduct({
          id: product._id,
          ...state.productData,
        } as updateProductInputType);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error creating/updating product.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [isNew, product, state.productData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createOrUpdateProduct();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      dispatch({
        type: "SET_PRODUCT_DATA",
        payload: { imgUrl: URL.createObjectURL(file) },
      });
      dispatch({
        type: "SET_IMAGE_PREVIEW",
        payload: URL.createObjectURL(file),
      });
    } else if (type === "checkbox") {
      dispatch({ type: "SET_PRODUCT_DATA", payload: { [name]: checked } });
    } else {
      dispatch({ type: "SET_PRODUCT_DATA", payload: { [name]: value } });
    }
  };

  const { productData, imgPreview, categories, loading, error } = state;

  return (
    <div className="bg-white border-2 border-gray-400 rounded-lg border-opacity-50 p-2">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between gap-4 lg:gap-8 lg:p-4 items-center">
          <div className="flex flex-col flex-1 gap-4 p-2">
            <FormInput
              label="Name"
              name="name"
              value={productData.name || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Model Number"
              name="modelNumber"
              value={productData.modelNumber || ""}
              onChange={handleChange}
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={productData.price || ""}
              onChange={handleChange}
            />
            <FormInput
              label="Stock"
              name="stock"
              type="number"
              value={productData.stock || ""}
              onChange={handleChange}
            />
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Published:</p>
              <input
                className="p-2 ring-2"
                type="checkbox"
                name="published"
                checked={productData.published || false}
                onChange={handleChange}
              />
            </div>
            <FormSelect
              label="Category"
              name="category"
              value={productData.category || ""}
              onChange={handleChange}
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
            />
            <FormTextarea
              label="Description"
              name="description"
              value={
                Array.isArray(productData.description)
                  ? productData.description.join("\n\n")
                  : ""
              }
              onChange={(e) => {
                dispatch({
                  type: "SET_PRODUCT_DATA",
                  payload: { description: e.target.value.split("\n\n") },
                });
              }}
            />
          </div>
          <ImageUpload imgPreview={imgPreview} onChange={handleChange} />
        </div>
        <Button type="submit" className="mx-5 my-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

// Extracted Components

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div className="flex flex-wrap items-center">
    <p className="font-semibold text-lg lg:w-1/5">{label}:</p>
    <input
      className="p-2 ring-2 flex-1"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div className="flex flex-wrap items-center">
    <p className="font-semibold text-lg lg:w-1/5">{label}:</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 ring-2"
    >
      <option value="" disabled>
        Select a category
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="flex flex-wrap items-center">
    <p className="font-semibold text-lg lg:w-1/5">{label}:</p>
    <textarea
      className="p-2 ring-2 flex-1 h-16"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

interface ImageUploadProps {
  imgPreview: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imgPreview, onChange }) => (
  <label className="flex flex-col px-2 py-4 shadow-lg shadow-slate-400 rounded-xl items-center justify-between h-fit bg-yellow-50">
    {imgPreview && (
      <Image
        src={imgPreview}
        alt="Image Preview"
        height={100}
        width={100}
        style={{ width: "auto", height: "auto" }}
      />
    )}
    <input className="p-2" type="file" name="imgUrl" onChange={onChange} />
  </label>
);

export default ProductForm;
