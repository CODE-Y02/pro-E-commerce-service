import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable from "@/components/tables/DataTable";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// const paymentsData = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
// ];
const columns = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      const current = row.original;
      // console.log("IMG ROW ", current);

      return <img src={current.img} width={100} height="auto" />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const current = row.original;
      console.log("Rating", row);

      return <div className="">{current.rating.rate}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // console.log("row  >> ", row);
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fecthProducts = async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products?limit=1&offset=1`
      );

      const formatted = data?.map(
        ({ category, image: img, price, rating, title: name, id }) => {
          return {
            name,
            img,
            price,
            id,
            rating,
            category,
          };
        }
      );

      setProducts(formatted);
    };
    fecthProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2 border-2 border-red-400 w-full">
      {/* Cat */}
      <div className="border-2 border-red-400 ">categories</div>

      <div className="border-2 border-red-400">
        {/* nav for product */}

        <div className="flex gap-2 p-2 justify-between mx-4 my-2 border-2 border-green-400">
          <form
            className="flex p-1 items-center bg-white rounded-md text-black"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="Search" className="px-1 py-1" />
            <FaSearch
              color="black"
              className="opacity-25 mx-1 h-4 w-4 cursor-pointer"
              onClick={() => alert("serch")}
            />
          </form>
          <div className="flex gap-2"> filter opts</div>
        </div>

        {/* product list */}
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default Shop;
