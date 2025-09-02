"use client";
import { searchDoctors } from "@/app/actions/doctorList/searchDoctors";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Search({ setDoctorsInfo }) {
  const [inputValue, setInputValue] = useState("");
  const [debounceInput, setDebounceInput] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (inputValue === "") setDebounceInput("empty");
      else setDebounceInput(inputValue);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [inputValue]);

  //search doctors
  useEffect(() => {
    if (!debounceInput.trim()) return;
    (async function () {
      const result = await searchDoctors(debounceInput);
      setDoctorsInfo(result);
    })();
  }, [debounceInput, setDoctorsInfo]);

  return (
    <div className="flex w-full sm:w-1/2 items-center border border-gray-400 rounded-2xl px-3 py-2 shadow-sm">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search Doctors..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full outline-none text-gray-700"
      />
    </div>
  );
}
