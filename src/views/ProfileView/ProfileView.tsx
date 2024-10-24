import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { IUserSession } from "@/types";

const ProfileView = () => {
  const cookieStore = cookies();
  const userData: IUserSession = JSON.parse(cookieStore.get("userData")?.value ?? "{}");

  return (
    <div className="max-w-3xl mx-auto p-8 pt-24">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>

          <Link href="/dashboard/orders">
            <h1 className="text-2xl font-bold -bluetext-600 cursor-pointer hover:underline">
              Your Orders
            </h1>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Name: </span>
              {userData.user.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Address: </span>
              {userData.user.address}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Phone: </span>
              {userData.user.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
