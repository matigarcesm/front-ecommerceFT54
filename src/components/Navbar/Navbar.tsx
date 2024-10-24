import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import NavbarButtons from "./NavbarButtons";

const Navbar = () => {
  const cookieStore = cookies();
  const userData = JSON.parse(cookieStore.get('userData')?.value ?? "{}");
  console.log(userData);

  return (
    <nav className="bg-white shadow-md w-full flex items-center justify-between px-4 py-3 fixed top-0 z-50">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/Apple-Logo-PNG.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </div>
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/category/iphone">
          <span className="text-sm sm:text-base md:text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200">
            iPhone
          </span>
        </Link>
        <Link href="/category/macbook">
          <span className="text-sm sm:text-base md:text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200">
            MacBook
          </span>
        </Link>
        <Link href="/category/headphones">
          <span className="text-sm sm:text-base md:text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200">
            Headphones
          </span>
        </Link>
        <Link href="/category/accessories">
          <span className="text-sm sm:text-base md:text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200">
            Accessories
          </span>
        </Link>
      </div>

      {/* Botones de Login / Register o Profile / Cart */}
      <div className="flex items-center space-x-4">
        <NavbarButtons userData={userData || { token: "" }} />
      </div>
    </nav>
  );
};

export default Navbar;





