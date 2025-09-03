"use client";
import createAppointmet from "@/app/actions/patient/createAppointment";
import { useAuth } from "@/app/context/auth/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bounce, toast } from "react-toastify";

export default function AppointmentBookModal({
  modalData,
  setIsOpenBookModal,
}) {
  const [bookDate, setBookDate] = useState(new Date().toISOString());
  const { userInfo } = useAuth();
  const router = useRouter();

  async function handleConfirmAppointment() {
    const appointmentInfo = {
      doctorId: modalData?.id,
      date: bookDate.split("T")[0],
    };

    const res = await createAppointmet(appointmentInfo, userInfo?.token);
    if (res) {
      toast.success("Appointment booked successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      // navigate my appoinment page
      router?.push("/dashboard/patient/appointments");
    } else {
      toast.error("please try aging later!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsOpenBookModal(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur*/}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 z-50">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsOpenBookModal(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Book Appointment
        </h2>

        {/* Doctor Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Doctor Name
          </label>
          <input
            disabled
            type="text"
            value={modalData?.name}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* specializations */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            specializations
          </label>
          <input
            disabled
            type="text"
            value={modalData?.specialization}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <DatePicker
            selected={bookDate}
            onChange={(date) => setBookDate(date.toISOString())}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => setIsOpenBookModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAppointment}
            className="px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
