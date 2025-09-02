import Link from "next/link";
import { usePathname } from "next/navigation";

export function DoctorMenuSmallScreen({setIsMenuOpen}){
    const pathName = usePathname()
    return(
         <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
          <Link
             href="/dashboard/doctor/profile"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/dashboard/doctor/profile"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/dashboard/doctor/appointmentList"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/dashboard/doctor/appointmentList"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            Appointment List
          </Link>
          <Link
            href="/dashboard/doctor/manageAppointment"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/dashboard/doctor/manageAppointment"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            Manage Appointment
          </Link>
        </div>
    )
}