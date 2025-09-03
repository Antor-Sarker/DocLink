import ProtectedRoute from "@/app/protectedRoute/protectedRoute";

export default function DoctorLayout({ children }) {
  return (
    <div className="w-full h-full">
      <ProtectedRoute allowedRoles={"DOCTOR"}>{children}</ProtectedRoute>
    </div>
  );
}
