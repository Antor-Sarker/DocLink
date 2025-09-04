"use client";
import { getAppointments } from "@/app/actions/manageAppointment/getAppointments";
import { statusUpdate } from "@/app/actions/statusUpdate";
import { useAuth } from "@/app/context/auth/authContext";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ManageAppointment() {
  const [appointmentsData, setAppointmentsData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { userInfo } = useAuth();

  useEffect(() => {
    (async function () {
      const data = await getAppointments(userInfo?.token);
      setAppointmentsData(data);
    })();
  }, [setAppointmentsData, userInfo?.token, isUpdate]);

  async function handleStatusChange(updateStatus, id) {
    const res = await statusUpdate(
      { status: updateStatus, appointment_id: id },
      userInfo?.token
    );
    console.log(res);
    if (res?.success) {
      setIsUpdate((prevState) => !prevState);
    }
  }

  return (
    <div className="w-full px-4 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {appointmentsData?.data?.map((appointment) => (
          <div
            key={appointment?.id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{appointment?.patient?.name}</h3>
              <CheckBadgeIcon
                status={appointment?.status}
                className={`w-6 h-6 rounded ${
                  appointment?.status === "PENDING" && " text-yellow-300"
                } ${appointment?.status === "COMPLETED" && " text-green-300"} ${
                  appointment?.status === "CANCELLED" && "text-red-300"
                }`}
              />
            </div>
            <p className="text-sm text-gray-600">
              Email: {appointment?.patient?.email}
            </p>
            <p className="text-sm text-gray-600">
              Schedule: {appointment?.date?.split("T")[0]}
            </p>
            <p className="text-sm text-gray-600">
              Current Status: <span className=" text-blue-600">
                {appointment?.status}
                </span>
            </p>

            {/* Update status option for Doctor */}
            <div
              className={`mt-3 flex gap-2 rounded-xl ${
                appointment?.status === "PENDING" &&
                "bg-yellow-100 text-yellow-800 border border-yellow-300"
              } ${
                appointment?.status === "COMPLETED" &&
                "bg-green-100 text-green-800 border border-green-300"
              } ${
                appointment?.status === "CANCELLED" &&
                "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              <select
                className="w-full rounded-xl border px-3 py-2 text-sm"
                defaultValue={appointment?.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value, appointment?.id)
                }
              >
                <option value="PENDING" className="">
                  Pending
                </option>

                <option value="CANCELLED" className="">
                  Cancelled
                </option>
                <option value="COMPLETED" className="">
                  Completed
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
