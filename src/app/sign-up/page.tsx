"use client";
import { SignUp } from "./SignUp";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loder";

export default function SignUpPage() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (currentUser === "loading") {
    return <Loader />;
  }

  if (currentUser) {
    void router.push("/user");
  }

  return <SignUp />;
}
