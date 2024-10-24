import React from "react";
import Card from "@/components/Card/Cards";
import { getProductsDB } from "@/helpers/products.helper";
import Link from "next/link";


const CardList = async () => {
  const products =  await getProductsDB()

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 justify-center pt-24">
      { 
        products && 
        products?.map((product) => {
         return (
          <Link key={product.id} href={`/product/${product.id}`} >
        <Card {...product} />
        </Link>

         )         
})}
      
    </div>
  );
}

export default CardList;
