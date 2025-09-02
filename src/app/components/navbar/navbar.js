"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DoctorMenuBigScreen } from "./navMenu/doctors/bigScreen";
import { DoctorMenuSmallScreen } from "./navMenu/doctors/smallScreen";
import { PatientMenuBigScreen } from "./navMenu/patients/bigScreen";
import { PatientMenuSmallScreen } from "./navMenu/patients/smallScreen";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState("patient");
  const pathName = usePathname();

  return (
    <nav className="fixed w-full z-10 bg-white p-4 flex items-center justify-between shadow-lg">
      {/* Left: Title & Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Hamburger button for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        {/* App Title */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          DocLink
        </Link>
      </div>

      {/* Center: only visible on large screen*/}
      {role === "patient" ? <PatientMenuBigScreen /> : <DoctorMenuBigScreen />}

      {/* Right: Login & Register or LogOut Buttons (always visible) */}
      <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className="text-white bg-green-500 hover:bg-green-600 font-semibold py-1 px-4 rounded-full transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-1 px-4 rounded-full transition duration-300 transform hover:scale-105"
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu (collapsible) */}
      {isMenuOpen &&
        (role === "patient" ? (
          <PatientMenuSmallScreen setIsMenuOpen={setIsMenuOpen} />
        ) : (
          <DoctorMenuSmallScreen setIsMenuOpen={setIsMenuOpen} />
        ))}
    </nav>
  );
}
