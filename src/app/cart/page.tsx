import { IUserSession } from "@/types";
import CartView from "@/views/CartView/CartView";
import React from "react";
import { cookies } from 'next/headers'


const Cart = () => {
    const cookieStore = cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get('userData')?.value ?? "{}")
    return (
        <CartView userData={userData} />
    )
}

export default Cart