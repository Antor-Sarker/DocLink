import Link from "next/link";
import { usePathname } from "next/navigation";

export function PatientMenuSmallScreen({setIsMenuOpen}){
    const pathName = usePathname()
    return(
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
          <Link
             href="/dashboard/patient/profile"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/dashboard/patient/profile"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            Doctor List
          </Link>
          <Link
            href="/dashboard/patient/appointments"
            className={`block px-4 py-2 text-gray-800 ${pathName==="/dashboard/patient/appointments"? "text-green-500": "text-gray-700"}`}
            onClick={()=>setIsMenuOpen(false)}
          >
            My Appointment
          </Link>
        </div>
    )
}