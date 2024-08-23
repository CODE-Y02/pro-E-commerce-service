import ProductForm from "@/components/products/product-form";
import { getProducts } from "@/utils/products-apis";
import React from "react";

type ProductPagePropsTypes = {
  params: {
    productId: string;
  };
  searchParams: {
    edit: boolean;
  };
};

async function ProductPage({ params, searchParams }: ProductPagePropsTypes) {
  console.log(params.productId);
  const productRes = await getProducts({ id: params.productId });

  if (!productRes?.products.length)
    return <div className="">No Product found</div>;

  const product = productRes.products[0];

  // await new Promise((resolve, reject) => setTimeout(resolve, 5000));

  // console.debug(category);

  return (
    <div className="">
      <ProductForm product={product} isNew={false} />
      {/* <p>{params.id}</p>
      <p>{product.name}</p>
      <Image
        src={product.imgUrl || ""}
        height={200}
        width={200}
        alt={product.name}
      />
      <p>{category.name}</p>
      <p>{product.price}</p> */}
    </div>
  );
}

export default ProductPage;
