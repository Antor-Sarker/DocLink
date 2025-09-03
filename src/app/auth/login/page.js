"use client";
import { login } from "@/app/actions/auth/login";
import { useAuth } from "@/app/context/auth/authContext";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useAuth();
  const router = useRouter();

  async function handelFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const userData = await login(formData);

    if (userData?.success) {
      localStorage.setItem("authInfo", JSON.stringify(userData?.data));
      setUserInfo(userData?.data);
      router.push(
        `/dashboard/${formData?.get("role").toLocaleLowerCase()}/profile`
      );
    } else {
      setLoading(false);
      setError("Invalid credentials!");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl text-gray-700 font-semibold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handelFormSubmit}>
          {/* Email */}
          <div className="text-red-500 text-center text-lg">{error}</div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
              <AtSymbolIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                className="w-full outline-none text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                className="w-full outline-none text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            {/* {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>} */}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Login as
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
              <UserCircleIcon className="w-5 h-5 text-gray-400 mr-2" />
              <select
                name="role"
                className="w-full outline-none text-sm bg-transparent"
                required
              >
                <option value="">Select Role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="PATIENT">Patient</option>
              </select>
            </div>
          </div>

          {/* handel LogIn */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Login{loading && "...."}
          </button>
        </form>
      </div>
    </div>
  );
}
