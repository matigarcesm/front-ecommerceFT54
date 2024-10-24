
import { Toast } from "@/helpers/index"

const APIURL = process.env.NEXT_PUBLIC_API_URL;



export async function createOrder(products: number[], token: string) {

    try {
        const res = await fetch(`${APIURL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({products})
        })
        
            return res.json();
    

      
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            title: "Failder to create an order"
        }); 
        throw new Error(error)
        
    }
};

export async function getOrders( token: string) {

    try {
        const res = await fetch(`${APIURL}/users/orders`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        })
        
            return res.json();
    

      
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            title: "Failder to get orders"
        }); 
        throw new Error(error)
        
    }
};



