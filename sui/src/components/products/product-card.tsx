import { InfoIcon } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export type ProductCardProps = {
  name: string;
  modelNumber: string;
  description?: [string];
  imgUrl?: string;
  price: number;
  stock: number;
  _id: string;
};

const ProductCard = ({
  name,
  modelNumber,
  description,
  imgUrl,
  price,
  stock,
  _id,
}: ProductCardProps) => {
  return (
    <div className="shadow-lg shadow-slate-500 rounded-lg gap-2 w-48 h-80 flex flex-col items-center p-2 bg-white">
      <div className="relative w-full flex justify-between items-center">
        <TooltipProvider>
          <h2 className="truncate w-full text-lg font-semibold">{name}</h2>

          <Tooltip>
            <TooltipTrigger>
              <Link href={`/products/${_id}`}>
                <InfoIcon className="cursor-pointer text-blue-600" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Add link tag for /products/1 */}
      </div>

      <div className="flex justify-between w-full ">
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
      </div>

      {imgUrl && (
        <div className="relative h-full w-full flex justify-center items-center z-0">
          <Image
            // className="ring-2 object-contain"
            src={imgUrl}
            alt={name}
            // width={100}
            // height={100}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
          <p className="absolute bottom-5 bg-green-400 bg-opacity-70 ">
            Model {modelNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
