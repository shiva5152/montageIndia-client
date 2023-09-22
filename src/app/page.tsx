"use client";
import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Home() {
  const Pathname = usePathname();
  if (Pathname === "/") {
    console.log("path name is this ");
  }

  const { logout } = useAuth();
  return (
    <div className="bg-[#fbfbfb] h-screen">
      <button onClick={logout}></button>
    </div>
  );
}
