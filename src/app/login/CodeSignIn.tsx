import { MultiFactorResolver } from "@firebase/auth";
import { Code } from "./Code";
import { verifyUserEnrolled } from "@/config/auth";
import { useRouter } from "next/navigation";
// import { notify } from "@/utils/notify";

type Props = {
  verificationId: string;
  resolver: MultiFactorResolver;
};
export function CodeSignIn({ verificationId, resolver }: Props) {
  const router = useRouter();

  async function getCode(code: string) {
    const response = await verifyUserEnrolled(
      {
        verificationId,
        resolver,
      },
      code
    );

    if (response) {
      await router.push("/");
    } else {
      alert("Something went wrong.");
    }
  }
  return <Code getCode={getCode} />;
}
