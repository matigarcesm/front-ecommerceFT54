'use client'
import { Toast } from "@/helpers"
import { IProduct, IUserSession } from "@/types"

interface ButtonProps {
    children: React.ReactNode;
    userData: IUserSession;
    product: IProduct;
}

const Button: React.FC<ButtonProps> = ({ children, userData, product }) => {
    const handleClick = () => {
        if (!userData.token) {
            Toast.fire({
                icon: "info",
                title: "You must be logged in to add products"
            });
        } else {
            const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

            // Verificar si el producto ya existe en el carrito
            const productExist = cart?.some((item: IProduct) => item.id === product.id);

            if (productExist) {
                Toast.fire({
                    icon: "warning",
                    title: "This product already exists in your cart"
                });
                return; // Salimos si el producto ya existe
            }

            // Si el producto no existe, lo agregamos al carrito
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            Toast.fire({
                icon: "success",
                title: "Product added to your cart"
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
            {children}
        </button>
    );
}

export default Button;
