'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar el hook useRouter
import { IProduct, IUserSession } from "@/types";
import CartProduct from "@/components/CartProduct/CartProduct"; // Asegúrate de importar CartProduct
import { createOrder } from "@/helpers/orders.helper";
import { Toast } from "@/helpers";

const CartView: React.FC<{userData: IUserSession}> = ({userData}) => {
    const [cart, setCart] = useState<IProduct[]>([]);
    const [total, setTotal] = useState(0);
    const router = useRouter(); // Usar el hook useRouter para redirigir

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (storedCart) {
            let totalCart = 0;
            storedCart?.forEach((item: IProduct) => {
                totalCart += item.price;
            });
            setTotal(totalCart);
            setCart(storedCart);
        }
    }, []);

    const handleCheckout = async () => {
        try {
            const idProducts = cart?.map((product) => product.id); // Asegúrate de tener la variable cart definida
            if (!userData?.token) { // Verifica si userData y el token existen
                Toast.fire({
                    icon: "error",
                    title: "You must be logged in to complete the purchase"
                });
                return;
            }
    
            await createOrder(idProducts, userData.token); // Asegúrate de que createOrder acepte estos parámetros
    
            Toast.fire({
                icon: "success", // Asegúrate de que sea "success" en minúsculas
                title: "Purchase completed successfully"
            });
            setCart([])
            setTotal(0)
            router.push("/dashboard/orders")
            localStorage.setItem("cart", "[]")
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Failed to complete purchase"
            });
        }
    };
    
    // Función para eliminar un producto del carrito
    const handleRemoveProduct = (id: string | number) => {
        const updatedCart = cart.filter((product) => product.id !== Number(id)); // Convertir id a número para la comparación
        setCart(updatedCart); // Actualizar el estado
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizar el localStorage
        const newTotal = updatedCart.reduce((acc, product) => acc + product.price, 0); // Calcular nuevo total
        setTotal(newTotal); // Actualizar el total
    };

    // Función para manejar la redirección a la página de inicio
    const handleContinueShopping = () => {
        router.push("/"); // Redirigir a la página de inicio
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <div className="h-16"></div>

            <h1 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 pl-4">
                Product Cart
            </h1>

            {/* Si el carrito está vacío */}
            {cart.length === 0 ? (
                <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg lg:text-xl pl-4">
                    Your cart is currently empty. Browse our products and add items to your cart.
                </p>
            ) : (
                <>
                    {/* Listar los productos del carrito */}
                    {cart.map((product) => (
                        <CartProduct key={product.id} {...product} onRemove={handleRemoveProduct} />
                    ))}

                    {/* Mostrar el total */}
                    <p className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pl-4 mb-6">
                        Total: ${total.toFixed(2)}
                    </p>

                    <div className="pl-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base md:text-lg hover:bg-blue-600"
                            onClick={handleContinueShopping} // Redirigir al home
                        >
                            Continue Shopping
                        </button>

                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm sm:text-base md:text-lg hover:bg-green-600"
                            onClick={handleCheckout} // Redirigir al checkout
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}

            <div className="h-16"></div>
        </div>
    );
};

export default CartView;
