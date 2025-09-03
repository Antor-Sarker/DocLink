"use client";
import { useAuth } from "@/app/context/auth/authContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  const { userInfo } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        {/* User HeroIcon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
            <UserCircleIcon className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {userInfo?.user?.name}
          </h2>
          <p className="text-gray-500">{userInfo?.user?.email}</p>
          <p className="text-gray-500 capitalize">{userInfo?.user?.role}</p>
          {userInfo?.user?.specialization && (
            <p className="text-gray-500">{userInfo?.user?.specialization}</p>
          )}
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">User ID:</span>
            <span>{userInfo?.user?.id}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{userInfo?.user?.email}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{userInfo?.user?.role}</span>
          </div>
          {userInfo?.user?.specialization && (
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Specialization:</span>
              <span>{userInfo?.user?.specialization}</span>
            </div>
          )}
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
