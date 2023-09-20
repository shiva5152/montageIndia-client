"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

import { CreateMultiFactorAuthentication } from "./CreateMultiFactorAuthentication";
import Loader from "@/components/Loder";

export default function MFAPage() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (currentUser === "loading") {
    return <Loader />;
  }

  if (!currentUser) {
    void router.push("/login");
  }

  return <CreateMultiFactorAuthentication currentUser={currentUser} />;
}
