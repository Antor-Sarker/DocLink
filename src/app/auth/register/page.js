"use client";
import registerUser from "@/app/actions/auth/register";
import {
  BeakerIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [tab, setTab] = useState("patient"); // "patient" | "doctor"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    photo_url: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const isDoctor = tab === "doctor";
  const route = useRouter();
  // validation rules
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }
    if (isDoctor && !form.specialization) {
      newErrors.specialization = "Specialization is required";
    }
    if (form.photo_url && !/^https?:\/\/.+\..+/.test(form.photo_url)) {
      newErrors.photo_url = "Enter a valid URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle change form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //prevent submit for invalid form
    if (!validate()) return;

    setLoading(true);

    const payload = isDoctor
      ? {
          name: form.name,
          email: form.email,
          password: form.password,
          specialization: form.specialization,
          photo_url: form.photo_url,
        }
      : {
          name: form.name,
          email: form.email,
          password: form.password,
          photo_url: form.photo_url,
        };

    // call register api from server Action for security
    const res = await registerUser(payload, isDoctor);
    if (res) route.replace("/auth/login");
    //error message
    else setIsSuccess(res);

    //clear form
    setForm({
      name: "",
      email: "",
      password: "",
      specialization: "",
      photo_url: "",
    });

    //not loading
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-600">
          Create an account
        </h1>

        {/* Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setTab("patient")}
            className={`py-2 cursor-pointer rounded-lg text-sm md:text-base transition ${
              tab === "patient"
                ? "bg-white shadow font-medium"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            type="button"
          >
            Patient
          </button>
          <button
            onClick={() => setTab("doctor")}
            className={`py-2 rounded-lg cursor-pointer text-sm md:text-base transition ${
              tab === "doctor"
                ? "bg-white shadow font-medium"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            type="button"
          >
            Doctor
          </button>
        </div>

        {!isSuccess && (
          <div className="text-red-500 text-center py-3">
            Registration Failed! please try again
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
              <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">{errors?.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">{errors?.password}</p>
            )}
          </div>

          {/* Specialization (Doctor only) */}
          {isDoctor && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
                <BeakerIcon className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                >
                  <option value="">Select specialization</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurology">Neurology</option>
                </select>
              </div>
              {errors.specialization && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.specialization}
                </p>
              )}
            </div>
          )}

          {/* Photo URL (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL <span className="text-gray-400">(optional)</span>
            </label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2">
              <PhotoIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="url"
                name="photo_url"
                value={form.photo_url}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.photo_url && (
              <p className="text-red-500 text-xs mt-1">{errors.photo_url}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-300 cursor-pointer"
          >
            {loading
              ? "Creating account..."
              : `Register as ${tab === "doctor" ? "Doctor" : "Patient"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
