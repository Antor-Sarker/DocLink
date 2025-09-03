"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../context/auth/authContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { userInfo } = useAuth();
  const router = useRouter();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      //navigate login page and show error message
      router?.replace("/auth/login");
      toast.error("Login required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      //onliy access own roled page
      if (userInfo?.user?.role === allowedRoles) setComponent(children);
      else {
        router?.replace("/");
        toast.error("This is not your role.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  }, [allowedRoles, children, router, userInfo]);
  return component;
}
