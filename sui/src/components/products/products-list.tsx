"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { PaginationInterface, ProductInterface } from "@/types/product";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard, { ProductCardProps } from "./product-card";
import { getProducts } from "@/utils/products-apis";
import { Button } from "../ui/button";

function ProductsList() {
  const [productsData, setProductsData] = useState<
    ProductInterface[] | undefined
  >([]);
  const [pagination, setPagination] = useState<PaginationInterface>({
    count: 0,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 0,
    limit: 10,
    currentPage: 1,
  });

  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    const response = await getProducts({ limit: 12, page });

    if (!response) return;

    const {
      products,
      count,
      hasNextPage,
      hasPrevPage,
      totalPages,
      limit: currentLimit,
      currentPage,
    } = response;

    setPagination({
      count,
      hasNextPage,
      hasPrevPage,
      totalPages,
      limit: currentLimit,
      currentPage,
    });
    setProductsData(products);
  }, [page]); // Add pagination as dependency

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);

  return (
    <div className="flex flex-col flex-1 gap-4 ">
      <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4 flex-1">
        {productsData?.map((product) => (
          <ProductCard
            key={product._id.toString()}
            {...(product as ProductCardProps)}
          />
        ))}
      </div>

      {/* pagination */}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {pagination?.hasPrevPage && (
              <Button
                className="w-24 px-2 py-1"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{pagination?.currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            {pagination?.hasNextPage && (
              <Button
                className="w-24 px-2 py-1"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ProductsList;
