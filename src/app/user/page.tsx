"use client";
import { UserComponent } from "./User";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Loader from "@/components/Loder";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (currentUser === "loading") {
    return <Loader />;
  }

  if (!currentUser) {
    void router.push("login");
  }

  return <UserComponent currentUser={currentUser} />;
}
