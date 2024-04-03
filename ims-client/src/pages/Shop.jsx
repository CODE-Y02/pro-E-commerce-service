import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable from "../components/DataTable";

const Shop = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fecthProducts = async () => {
      const { data } = await axios.get(`https://fakestoreapi.com/products`);

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
    <div className="flex flex-col gap-2 p-2 border-2 border-red-400 w-full h-screen">
      <div className="border-2 border-red-400 ">categories</div>
      <div className="border-2 border-red-400 ">
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
        <DataTable tableHeading={tableHeading} tableRows={products} />
      </div>
    </div>
  );
};

export default Shop;
