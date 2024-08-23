import ProductForm from "@/components/products/product-form";
import React from "react";

type Props = {};

function page() {
  return (
    <div className="bg-red-400 w-full h-56">
      <ProductForm isNew />
    </div>
  );
}

export default page;
