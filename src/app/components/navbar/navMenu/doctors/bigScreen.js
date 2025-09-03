import Link from "next/link";
import { usePathname } from "next/navigation";

export function DoctorMenuBigScreen() {
  const pathName = usePathname();
  return (
    <div className="hidden md:flex flex-grow justify-center space-x-8">
      <Link
        href="/dashboard/doctor/manageAppointment"
        className={`text-lg ${
          pathName === "/dashboard/doctor/manageAppointment"
            ? "text-green-500"
            : "text-gray-700"
        } hover:text-green-600 transition duration-300`}
      >
        Manage Appointment
      </Link>

      <Link
        href="/dashboard/doctor/profile"
        className={`text-lg ${
          pathName === "/dashboard/doctor/profile"
            ? "text-green-500"
            : "text-gray-700"
        } hover:text-green-600 transition duration-300`}
      >
        Profile
      </Link>
    </div>
  );
}
