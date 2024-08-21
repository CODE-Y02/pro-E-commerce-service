"use client";

import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getCategory } from "@/utils/categories-api";
import { SeparatorHorizontal } from "lucide-react";

type Props = {
  product?: ProductInterface;
  isNew: boolean;
};

function ProductForm({ product }: Props) {
  const [productData, setProductData] = useState<Partial<ProductInterface>>({
    name: "",
    price: 0,
    imgUrl: "",
    stock: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgPreview, setImagePreview] = useState("");

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const fetchCategoryData = async () => {
    const cat = await getCategory({});
    if (cat) {
      setCategories(cat);
    }
  };

  useEffect(() => {
    if (product?._id) {
      setProductData(product);
      setImagePreview(product.imgUrl || "");
    }

    fetchCategoryData();
  }, [product]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(productData);
    setShowModal(true);
    const ans = confirm("Are you sure");

    if (ans) {
      setIsEditing(false);
    }
    setShowModal(false);
  };

  const handleChange = (e: any) => {
    setIsEditing(true);
    const { name, value, type, files } = e.target;
    let file = null;
    if (type === "file") file = files && files[0];

    if (productData) {
      setProductData({ ...productData, [name]: file ?? value });
      file && setImagePreview(URL.createObjectURL(file));
    } else {
      setProductData({ [name]: file ?? value });
    }
  };

  // const imgFilehandle = (e: any) => {
  //   if (e.target.files.length !== 0) {
  //     const img = URL.createObjectURL(e.target.files[0]);
  //     setProductData((oldData) => ({ ...oldData, imgUrl: img }));
  //   }
  // };

  return (
    <div className="bg-white border-2 border-gray-400 rounded-lg border-opacity-50 p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between gap-4 lg:gap-8 lg:p-4 items-center">
          <div className="flex flex-col  flex-1 gap-4 p-2">
            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5"> Name:</p>
              <input
                className="p-2 ring-2 flex-1"
                type="text"
                name="name"
                required
                value={productData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5"> Model Number:</p>
              <input
                className="p-2 ring-2"
                type="text"
                name="modelNumber"
                value={productData.modelNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5"> Price:</p>
              <input
                className="p-2 ring-2"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5">Stock :</p>
              <input
                className="p-2 ring-2 "
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5">Published :</p>
              <input
                className="p-2 ring-2"
                type="checkbox"
                name="published"
                checked={productData.published ?? false}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    published: !productData.published,
                  })
                }
              />
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5">Category :</p>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="p-2 ring-2 "
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center ">
              <p className="font-semibold text-lg lg:w-1/5">Description :</p>
              <textarea
                className="p-2 ring-2 flex-1 h-16"
                name="description"
                value={
                  productData.description
                    ? productData.description.join("\n\n")
                    : ""
                }
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value.split("\n\n"),
                  })
                }
              />
            </div>
          </div>

          <label className="flex flex-col px-2 py-4 shadow-lg shadow-slate-400 rounded-xl items-center justify-between h-fit bg-yellow-50 ">
            {imgPreview && (
              <Image
                src={imgPreview}
                alt={productData.name || product?.name || "name"}
                height={100}
                width={100}
              />
            )}
            <input
              className="p-2"
              type="file"
              name="imgUrl"
              onChange={handleChange}
            />
          </label>
        </div>

        <Button type="submit" className="mx-5 my-2">
          submit
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;
