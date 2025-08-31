"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => setTotal(data.total || 0));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-600">Dashboard</h1>
      <Link
        href="/showSchools"
        className="inline-block bg-gray-500 text-white px-6 py-4 rounded-lg shadow hover:bg-blue-400 text-center"
      >
        <div className="text-lg font-semibold">Total Schools</div>
        <div className="text-4xl font-bold">{total}</div>
      </Link>

    </div>
  );
}
