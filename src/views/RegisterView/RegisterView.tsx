'use client'
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/types";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Importamos el Link
import { register } from "@/helpers/auth.helper";
import { Toast } from "@/helpers";
import { useRouter } from "next/navigation";

const RegisterView = () => {
    const router = useRouter()

    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    }

    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState)
    const [errors, setErrors] = useState<IRegisterErrors>(initialState)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await register(dataUser)
    
        // Validar que todos los campos estén completos
        const { email, password, name, address, phone } = dataUser;
    
        if (!email || !password || !name || !address || !phone) {
            Toast.fire({
                icon: "error",
                title: "All fields are required."
            });
            return; // Detener el proceso si falta algún campo
        }
    
        // Si todos los campos están completos, proceder con el registro
        await register(dataUser);
        Toast.fire({
            icon: "success",
            title: "Registered successfully"
        });
        router.push("/login");
    };
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = event.target
       setDataUser({
            ...dataUser,
            [name]: value
       })
    }

    useEffect(() => {
        const errors = validateRegisterForm(dataUser)
        setErrors(errors)
    }, [dataUser])
 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 pb-12">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register in Apple</h1>

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
                            type="password"
                            name="password"
                            value={dataUser.password}
                            placeholder="********"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor='name' className="block text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={dataUser.name}
                            placeholder="John Doe"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor='address' className="block text-gray-700">Address</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={dataUser.address}
                            placeholder="Providencia, Santiago"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor='phone' className="block text-gray-700">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={dataUser.phone}
                            placeholder="56973090260"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                    </div>

                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Register
                    </button>
                </form>

                {/* Aquí agregamos el enlace para redirigir al login */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            ¡Inicia sesión aquí!
                        </Link>
                    </p>
                </div>
            </div>
       </div>
    )
}

export default RegisterView;
