"use client";
import { getFilterAppointments } from "@/app/actions/manageAppointment/filterAppointment";
import { useAuth } from "@/app/context/auth/authContext";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentFilter({ setAppointmentsData, filterBy }) {
  const [bookDate, setBookDate] = useState(new Date().toISOString());
  const { userInfo } = useAuth();
  //filter from server action
  async function handeFilterbyStatus(status) {
    const data = await getFilterAppointments(
      userInfo?.token,
      status === "ALL" ? "ALL" : `status=${status}`
    );

    setAppointmentsData(data);
  }

  //filter from server action
  async function handeFilterbyDate(date) {
    const data = await getFilterAppointments(
      userInfo?.token,
      `date=${date.split("T")[0]}`
    );
    setAppointmentsData(data);
  }

  return (
    <div className="flex w-full sm:w-auto items-center gap-3">
      {filterBy === "status" ? (
        // Filter by Status
        <div className="flex items-center border border-gray-400 text-gray-700 rounded-2xl px-3 py-2 shadow-gray-200 shadow-sm bg-yellow-100">
          <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />

          <select
            className="outline-none text-sm bg-transparent cursor-pointer"
            defaultValue={"ALL"}
            onChange={(e) => handeFilterbyStatus(e.target.value)}
          >
            <option value="ALL" className="">
              All Status
            </option>
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
      ) : (
        // filter by Date
        <div>
          <DatePicker
            selected={bookDate}
            onChange={(date) => handeFilterbyDate(date.toISOString())}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
