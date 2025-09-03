import ProtectedRoute from "@/app/protectedRoute/protectedRoute";

export default function PatientLayout({ children }) {
  return (
    <div className="w-full h-full">
      <ProtectedRoute allowedRoles={"PATIENT"}>{children}</ProtectedRoute>
    </div>
  );
}
