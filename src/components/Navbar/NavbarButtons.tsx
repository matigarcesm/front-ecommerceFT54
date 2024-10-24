'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const NavbarButtons: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();


    const checkLoginStatus = () => {
        const userData = Cookies.get("userData");
        return userData ? true : false;
    };

    useEffect(() => {
        setIsLoggedIn(checkLoginStatus());
    }, [pathname]);

    const handleLogout = async () => {
        Cookies.remove("userData");
        setIsLoggedIn(false);
        await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Logged out successfully"
        });
        router.push("/");
    };

    return (
        <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4">
            {/* Mostrar Profile/Cart si el usuario está logueado */}
            {isLoggedIn ? (
                <>
                    <Link href="/dashboard">
                        <button className="bg-transparent text-blue-500 border border-blue-500 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-all duration-300">
                            Profile
                        </button>
                    </Link>
                    <Link href="/cart">
                        <button className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition-all duration-300">
                            Cart
                        </button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition-all duration-300"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <button className="bg-transparent text-blue-500 border border-blue-500 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-all duration-300">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition-all duration-300">
                            Register
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default NavbarButtons;
