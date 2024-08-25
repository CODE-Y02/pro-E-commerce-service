"use client";

import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getCategory } from "@/utils/categories-api";

type Props = {
  product?: ProductInterface;
  isNew: boolean;
};

function ProductForm({ product, isNew }: Props) {
  // Initialize state with default values
  const [productData, setProductData] = useState<Partial<ProductInterface>>({
    name: "",
    price: 0,
    imgUrl: "",
    stock: 0,
    published: false,
    category: "",
    description: [], // Ensure description is always an array
  });

  const [imgPreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      const cat = await getCategory({});
      if (cat) {
        setCategories(cat);
      }
    };

    fetchCategoryData();
  }, []);

  // Update form data when `product` or `isNew` changes
  useEffect(() => {
    if (isNew) {
      // Reset form for new product
      setProductData({
        name: "",
        price: 0,
        imgUrl: "",
        stock: 0,
        published: false,
        category: "",
        description: [], // Default to an empty array
      });
      setImagePreview("");
    } else if (product?._id) {
      // Set form data from existing product
      setProductData({
        ...product,
        description: Array.isArray(product.description)
          ? product.description
          : [], // Ensure description is an array
      });
      setImagePreview(product.imgUrl || "");
    }
  }, [product, isNew]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNew) {
      // Create new product
    } else {
      // Update existing product
    }
  };

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      setProductData({ ...productData, [name]: file });
      setImagePreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  return (
    <div className="bg-white border-2 border-gray-400 rounded-lg border-opacity-50 p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between gap-4 lg:gap-8 lg:p-4 items-center">
          <div className="flex flex-col flex-1 gap-4 p-2">
            {/* Name Input */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Name:</p>
              <input
                className="p-2 ring-2 flex-1"
                type="text"
                name="name"
                required
                value={productData.name || ""} // Ensure controlled component
                onChange={handleChange}
              />
            </div>

            {/* Model Number Input */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Model Number:</p>
              <input
                className="p-2 ring-2"
                type="text"
                name="modelNumber"
                value={productData.modelNumber || ""} // Ensure controlled component
                onChange={handleChange}
              />
            </div>

            {/* Price Input */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Price:</p>
              <input
                className="p-2 ring-2"
                type="number"
                name="price"
                value={productData.price || ""} // Ensure controlled component
                onChange={handleChange}
              />
            </div>

            {/* Stock Input */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Stock:</p>
              <input
                className="p-2 ring-2"
                type="number"
                name="stock"
                value={productData.stock || ""} // Ensure controlled component
                onChange={handleChange}
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Published:</p>
              <input
                className="p-2 ring-2"
                type="checkbox"
                name="published"
                checked={productData.published || false} // Ensure controlled component
                onChange={handleChange}
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Category:</p>
              <select
                name="category"
                value={productData.category || ""} // Ensure controlled component
                onChange={handleChange}
                className="p-2 ring-2"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-wrap items-center">
              <p className="font-semibold text-lg lg:w-1/5">Description:</p>
              <textarea
                className="p-2 ring-2 flex-1 h-16"
                name="description"
                value={
                  Array.isArray(productData.description)
                    ? productData.description.join("\n\n")
                    : ""
                } // Ensure controlled component
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value.split("\n\n"),
                  })
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <label className="flex flex-col px-2 py-4 shadow-lg shadow-slate-400 rounded-xl items-center justify-between h-fit bg-yellow-50">
            {imgPreview && (
              <Image
                src={imgPreview}
                alt={productData.name || product?.name || "Image Preview"}
                height={100}
                width={100}
                style={{ width: "auto", height: "auto" }}
              />
            )}
            <input
              className="p-2"
              type="file"
              name="imgUrl"
              onChange={handleChange} // Handle file input
            />
          </label>
        </div>

        <Button type="submit" className="mx-5 my-2">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;
