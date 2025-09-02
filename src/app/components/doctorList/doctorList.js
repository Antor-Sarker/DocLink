"use client";
import { getDoctorList } from "@/app/actions/doctorList/getDoctorList";
import { CalendarDateRangeIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Pagination from "../pagination/pagination";
import Filter from "./filter";
import Search from "./search";

export default function DoctorList() {
  const [doctorsInfo, setDoctorsInfo] = useState(null);
  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    (async function () {
      // Secure data fetching with Server Action
      const data = await getDoctorList(page);
      setDoctorsInfo(data);
    })();
  }, [page]);

  console.log(doctorsInfo);
  console.log(doctorsInfo?.data);

  function handelPageChange(num) {
    if (num < 1 || num > doctorsInfo?.totalPages) return;
    else {
      //update page state
      setPage(num);
      // Scroll to the top of the section or page
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <div className="" ref={sectionRef}>
      <div className="w-full bg-white shadow-sm sticky top-[64px] z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Search box */}
          <Search setDoctorsInfo={setDoctorsInfo} />

          {/* Filters */}
          <Filter />
        </div>
      </div>
      <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {doctorsInfo?.data?.map((doctor) => (
          <div
            key={doctor?.id}
            className="bg-white shadow-md shadow-gray-600 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 mb-3">
              <UserIcon className="w-10 h-10 text-gray-500" />
            </div>

            <h3 className="text-lg font-semibold">{doctor?.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {doctor?.specialization}
            </p>
            <button className="flex items-center gap-2 bg-[#58786e] text-white px-4 py-2 rounded-xl hover:bg-[#3bb68f] transition cursor-pointer">
              <CalendarDateRangeIcon className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* pagination for change page number */}
      {/*when doctos not found show message ande hide pagination */}
      {doctorsInfo.data.length === 0 ? (
        <div className="text-red-500 text-center text-xl">
          Doctors not found!
        </div>
      ) : (
        <Pagination
          currentPage={doctorsInfo?.page}
          totalPages={doctorsInfo?.totalPages}
          handelPageChange={handelPageChange}
        />
      )}
    </div>
  );
}
