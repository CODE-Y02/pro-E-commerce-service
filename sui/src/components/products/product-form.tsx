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
import Spinner from "../spinner";

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
    description: "",
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
      const categories = await getCategory({});
      dispatch({ type: "SET_CATEGORIES", payload: categories || [] });
    } catch {
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
          description: product.description || "",
        },
      });
      dispatch({ type: "SET_IMAGE_PREVIEW", payload: product.imgUrl || "" });
    }
  }, [product, isNew]);

  const createOrUpdateProduct = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const {
        _id,
        category,
        description,
        imgUrl,
        published,
        name,
        price,
        stock,
        modelNumber,
      } = state.productData;
      if (isNew) {
        await createProduct({
          category,
          description,
          imgUrl,
          published,
          name,
          price,
          stock,
          modelNumber,
        } as createProductInputType);
      } else if (product?._id) {
        await updateProduct({
          id: _id,
          category,
          description,
          imgUrl,
          published,
          name,
          price,
          stock,
          modelNumber,
        } as updateProductInputType);
      }
      alert("Success!");
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Error creating/updating product.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [isNew, product?._id, state.productData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrUpdateProduct();
  };

  const handleChange = (e: any): void => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      dispatch({ type: "SET_PRODUCT_DATA", payload: { imgUrl: fileUrl } });
      dispatch({ type: "SET_IMAGE_PREVIEW", payload: fileUrl });
    } else if (type === "checkbox") {
      dispatch({ type: "SET_PRODUCT_DATA", payload: { [name]: checked } });
    } else if (type === "number") {
      dispatch({
        type: "SET_PRODUCT_DATA",
        payload: { [name]: Number(value) },
      });
    } else {
      dispatch({ type: "SET_PRODUCT_DATA", payload: { [name]: value } });
    }
  };

  const { productData, imgPreview, categories, loading, error } = state;

  return (
    <div className="bg-white border-2 border-gray-400 rounded-lg border-opacity-50 p-2">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500 opacity-40">
          <div className="text-white flex flex-col items-center gap-4">
            <Spinner />
            <p>Loading...</p>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 lg:gap-8 lg:p-4">
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
              value={String(productData.price || "")}
              onChange={handleChange}
            />
            <FormInput
              label="Stock"
              name="stock"
              type="number"
              value={String(productData.stock || "")}
              onChange={handleChange}
            />
            <div className="flex items-center">
              <p className="font-semibold text-lg lg:w-1/5">Published:</p>
              <input
                type="checkbox"
                name="published"
                checked={productData.published || false}
                onChange={handleChange}
                className="p-2 ring-2"
              />
            </div>
            <FormSelect
              label="Category"
              name="category"
              value={productData.category || ""}
              onChange={handleChange}
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name || "",
              }))}
            />
            <FormTextarea
              label="Description"
              name="description"
              value={productData.description || ""}
              onChange={handleChange}
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
  <div className="flex items-center">
    <p className="font-semibold text-lg lg:w-1/5">{label}:</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="p-2 ring-2 flex-1"
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
  <div className="flex items-center">
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
  <div className="flex items-center">
    <p className="font-semibold text-lg lg:w-1/5">{label}:</p>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 ring-2 flex-1"
    />
  </div>
);

interface ImageUploadProps {
  imgPreview: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imgPreview, onChange }) => (
  <div className="flex flex-col items-center">
    {imgPreview && (
      <div className="relative w-full h-72">
        <Image
          src={imgPreview}
          alt="Product Image Preview"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    )}
    <label className="text-center p-2 mt-2 w-full border-2 border-gray-400 border-opacity-50 rounded-lg cursor-pointer">
      Upload Image
      <input
        type="file"
        name="imgUrl"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
  </div>
);

export default ProductForm;
