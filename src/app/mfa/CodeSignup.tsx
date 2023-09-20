import { Code } from "../login/Code";
import { User } from "@firebase/auth";
import { enrollUser } from "@/config/auth";
import { useRouter } from "next/navigation";
// import {  } from "@/utils/notify";

type Props = {
  currentUser: User;
  verificationCodeId: string;
};

export function CodeSignup({ currentUser, verificationCodeId }: Props) {
  const router = useRouter();

  async function getCode(code: string) {
    const response = await enrollUser(currentUser, verificationCodeId, code);

    if (response) {
      await router.push("/user");
    } else {
      alert("Something went wrong.");
    }
  }

  return <Code getCode={getCode} />;
}
