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
  <div className="p-6 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-600">Schools</h1>
        <Link
          href="/addSchool"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add School
        </Link>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-500 text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Image</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id} className="text-gray-600 hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{school.name}</td>
              <td className="py-2 px-4 border-b">{school.address}</td>
              <td className="py-2 px-4 border-b">{school.city}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
