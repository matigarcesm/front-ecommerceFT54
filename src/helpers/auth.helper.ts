import { ILoginProps, IRegisterProps } from "@/types";
import { Toast } from "@/helpers/index"

const APIURL = process.env.NEXT_PUBLIC_API_URL;



export async function register(userData: IRegisterProps) {

    try {
        const res = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(res.ok) {
            return res.json();
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to register"
            }); 
        }

      
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            title: "Failder to register"
        }); 
        throw new Error(error)
        
    }
};

export async function login(userData: ILoginProps) {

    try {
        const res = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(res.ok) {
            return res.json();
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to login"
            }); 
        }

      
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            title: "Failed to login"
        }); 
        throw new Error(error)
        
    }
};
