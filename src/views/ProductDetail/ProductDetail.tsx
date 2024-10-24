
import Button from "@/components/Button/Button";
import { IProduct } from "@/types";
import { cookies } from "next/headers";
import React from "react";

const ProductDetail: React.FC<IProduct> = (props) => {
  console.log(props)
  const{name, image, description, stock, price} = props
  const cookieStore = cookies();
  const userData = JSON.parse(cookieStore.get('userData')?.value ?? "{}");






  return (
    <div className="flex items-center justify-center p-8 min-h-screen bg-white">
      
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
       
        <div className="w-full md:w-1/2">
          <img
            className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            src={image}
            alt={`${name} product image`}
          />
        </div>

      
        <div className="p-6 w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{name}</h1>
          <p className="text-gray-700 mb-6">{description}</p>
          <div className="flex items-center justify-between mb-6">
            <p className="text-2xl font-semibold text-slate-900">${price}</p>
            <p className={`text-sm font-medium ${stock > 0 ? "text-slate-900" : "text-red-500"}`}>
              {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
            </p>
          </div>
          <Button userData={userData} product={props} >
            Add to Cart
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
