import { getProducts } from "@/utils/products-apis";
import React from "react";

import ProductsList from "@/components/products/products-list";

async function ProductsPage() {
  return (
    <>
      <ProductsList />
    </>
  );
}

export default ProductsPage;
