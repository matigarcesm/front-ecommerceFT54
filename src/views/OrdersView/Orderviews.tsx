import React from "react";
import { cookies } from 'next/headers'
import { IOrder, IUserSession } from "@/types";
import { getOrders } from "@/helpers/orders.helper";

const OrdersView = async () => {
    const cookieStore = cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get("userData")?.value ?? "{}");
    const orders: IOrder[] = await getOrders(userData.token);
    
   

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <h1 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                Your Orders
            </h1>
            {orders && orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="border-b border-gray-300 pb-4 mb-4">
                        <p className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                            Status: <span className="text-gray-800">{order.status.toUpperCase()}</span>
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                            Date: <span className="text-gray-800">{new Date(order.date).toLocaleString()}</span>
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                    You have no orders at the moment.
                </p>
            )}
        </div>
    );
}

export default OrdersView;
