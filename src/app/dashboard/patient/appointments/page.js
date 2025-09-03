"use client";

import { getAppointments } from "@/app/actions/patient/getAppointments";
import { statusUpdate } from "@/app/actions/statusUpdate";
import { useAuth } from "@/app/context/auth/authContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function AppointmentCard({ data, token, setIsUpdate }) {
  async function handelCancel(id) {
    const res = await statusUpdate(
      { status: "CANCELLED", appointment_id: id },
      token
    );
    if (res.success) {
      setIsUpdate((prevState) => !prevState);
    }
  }
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      {/* Left Part: Icon + Info */}
      <div className="flex items-center gap-3">
        <UserCircleIcon className="w-14 h-14 text-gray-400" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {data?.doctor?.name}
          </h3>
          <p className="text-sm text-gray-500">
            {data?.doctor?.specialization || "N/A"}
          </p>
          <p className="text-sm text-gray-500">📅 {data?.date}</p>
        </div>
      </div>

      {/* Right Part: Status & Cancel Button */}
      <div className="flex flex-col sm:items-end">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium mb-2 self-start sm:self-end
          `}
        >
          {data?.status}
        </span>

        {!(data?.status === "CANCELLED") && (
          <button
            onClick={() => handelCancel(data?.id)}
            className="bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition text-sm cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function Appointments() {
  const [appointmentsData, setAppointmentsData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  const { userInfo } = useAuth();
  useEffect(() => {
    (async function () {
      const data = await getAppointments(userInfo?.token);
      setAppointmentsData(data);
    })();
  }, [userInfo.token, isUpdate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-600 text-center">
        My Appointments({appointmentsData?.total})
      </h1>

      {/* Grid for multiple cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {appointmentsData?.data?.map((appointment) => (
          <AppointmentCard
            key={appointment?.id}
            data={appointment}
            token={userInfo?.token}
            setIsUpdate={setIsUpdate}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  );
}
