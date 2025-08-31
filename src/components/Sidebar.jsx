// src/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai"; // Home icon
import { BiBook } from "react-icons/bi";        // Show Schools icon

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <AiOutlineHome className="text-black" /> },
    { href: "/showSchools", label: "Show Schools", icon: <BiBook className="text-black" /> },
  ];

  return (
    <aside className="w-64 bg-gray-500 flex flex-col p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold  mb-4">School Management</h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              pathname === link.href ? "bg-blue-400" : "hover:bg-gray-200"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
