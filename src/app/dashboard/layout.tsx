import React from "react";
import Link from "next/link";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/dashboard">Profile</Link>
        <Link href="/dashboard/orders">Orders</Link>
      </nav>
      <main>
        {children}
      </main>
    </>
  );
}
