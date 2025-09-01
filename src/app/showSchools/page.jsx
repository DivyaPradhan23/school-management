"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
  fetch("/api/schools")
    .then((res) => res.json())
    .then((data) => setSchools(data.schools || [])); // <-- fixed here
}, []);


 return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Schools</h1>
        <Link
          href="/addSchool"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          + Add School
        </Link>
      </div>

      {/* Grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={`/schoolImages/${school.image}`}
              alt={school.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              {school.name}
            </h2>
            <p className="text-gray-600 text-sm">{school.address}</p>
            <p className="text-gray-500 text-sm mb-2">{school.city}</p>

            <button className="mt-auto bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

}
