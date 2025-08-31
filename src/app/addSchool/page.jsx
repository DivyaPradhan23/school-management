"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const router = useRouter(); // initialize router
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        reset(); // clear form fields
        router.push("/showSchools"); // redirect after save
      } else {
        console.error("Error saving school");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
          Add School
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          encType="multipart/form-data"
        >
          {/* Row 1: School Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              School Name
            </label>
            <input
              type="text"
              placeholder="Enter school name"
              {...register("name", { required: "Name is required" })}
              className="border border-gray-300 p-3 w-full  text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Row 2: Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              {...register("address", { required: "Address is required" })}
              className="border border-gray-300 p-3 w-full text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Row 3: City & State */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-600">City</label>
              <input
                type="text"
                placeholder="Enter city"
                {...register("city", { required: "City is required" })}
                className="border border-gray-300 p-3 w-full text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-600">State</label>
              <input
                type="text"
                placeholder="Enter state"
                {...register("state", { required: "State is required" })}
                className="border border-gray-300 p-3 w-full text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: Contact & Email */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-600">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Enter contact number"
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // exactly 10 digits
                    message: "Contact number must be 10 digits",
                  },
                })}
                className="border border-gray-300 p-3 w-full text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}

            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-600">Email ID</label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="border border-gray-300 p-3 w-full text-gray-800 placeholder-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.email_id && (
                <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>
              )}
            </div>
          </div>

          {/* Row 5: Image */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="border border-gray-300 p-2 w-full  text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded w-full shadow-md transition duration-200"
          >
            {loading ? "Saving..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
