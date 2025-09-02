import Link from "next/link";
import { usePathname } from "next/navigation";

export function PatientMenuBigScreen() {
  const pathName = usePathname();
  return (
    <div className="hidden md:flex flex-grow justify-center space-x-8">
      <Link
        href="/"
        className={`text-lg ${
          pathName === "/" ? "text-green-500" : "text-gray-700"
        } hover:text-green-600 transition duration-300`}
      >
        Doctor List
      </Link>
      <Link
        href="/dashboard/patient/appointments"
        className={`text-lg ${
          pathName === "/dashboard/patient/appointments"
            ? "text-green-500"
            : "text-gray-700"
        } hover:text-green-600 transition duration-300`}
      >
        My Appointments
      </Link>

      <Link
        href="/dashboard/patient/profile"
        className={`text-lg ${
          pathName === "/dashboard/patient/profile"
            ? "text-green-500"
            : "text-gray-700"
        } hover:text-green-600 transition duration-300`}
      >
        Profile
      </Link>
    </div>
  );
}
