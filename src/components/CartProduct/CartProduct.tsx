import { IProduct } from "@/types";
import React from "react";

interface CartProductProps extends IProduct {
    onRemove: (id: string) => void; 
}

const CartProduct: React.FC<CartProductProps> = ({ image, name, price, id, onRemove }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
                <img src={image} alt={name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                    <h2 className="font-bold text-lg">{name}</h2>
                    <p className="text-gray-600">${price}</p>
                </div>
            </div>
            <button
    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
    onClick={() => onRemove(String(id))}
>
    Remove
</button>
        </div>
    );
};

export default CartProduct;
