import { getFilterBySpecialization } from "@/app/actions/doctorList/getFilterBySpecialization";
import { getSpecializations } from "@/app/actions/doctorList/getSpecializations";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Filter({ setDoctorsInfo }) {
  const [specializations, setSpecializations] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await getSpecializations();
      setSpecializations(res?.data);
    })();
  }, []);

  // filter from server action
  async function handeFilter(option) {
    const data = await getFilterBySpecialization(option);
    setDoctorsInfo(data);
  }

  return (
    <div className="flex w-full sm:w-auto items-center gap-3">
      <div className="flex items-center border border-gray-400 text-gray-700 rounded-2xl px-3 py-2 shadow-gray-200 shadow-sm bg-yellow-100">
        <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
        <select
          onChange={(e) => handeFilter(e.target.value)}
          className="outline-none text-sm bg-transparent cursor-pointer"
        >
          <option value="all">All Specializations</option>
          {specializations?.map((name, index) => (
            <option key={index} value={name} className="hover:bg-amber-200">
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
