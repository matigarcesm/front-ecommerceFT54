'use client'
import { login } from "@/helpers/auth.helper";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginErrors, ILoginProps } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toast } from "@/helpers";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

const LoginView = () => {
    const router  = useRouter()

    const initialState = {
        email: "",
        password: ""
    }

    const [dataUser, setDataUser] = useState<ILoginProps>(initialState)
    const [errors, setErrors] = useState<ILoginErrors>(initialState)
    const [visible, setVisible] = useState(true)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const response = await login(dataUser);
    
        if (response && response.token) {
            // Desestructuramos solo si response tiene un token
            const { token, user } = response;
            Cookies.set('userData', JSON.stringify({ token, user }), { expires: 7 });
            Toast.fire({
                icon:"success",
                title: "Login successfully"

            })
    
            Toast.fire({
                icon: "success",
                title: "Login successful"
            });
    
            // Redirigir o manejar el éxito del login
        } else {
            Toast.fire({
                icon: "error",
                title: "Failed to login"
            });
        }
        router.push("/")
    };
    
    



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value} = event.target
       setDataUser({
            ...dataUser,
            [name]: value
       })
    }

    useEffect(() => {
        const errors = validateLoginForm(dataUser)
        setErrors(errors)
    }, [dataUser])
 
    return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Apple</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor='email_address' className="block text-gray-700">Email</label>
                        <input
                            id="email_address"
                            type="email" 
                            name="email"
                            value={dataUser.email}
                            placeholder="johndoe@mail.com"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor='password' className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type={ `${visible ? "password" : "text"}` } 
                            name="password"
                            value={dataUser.password}
                            placeholder="********"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        <button onClick={() => setVisible(!visible)}>See</button>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Sign in
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            ¡Regístrate aquí!
                        </Link>
                    </p>
                </div>
            </div>
       </div>
    )
}

export default LoginView
