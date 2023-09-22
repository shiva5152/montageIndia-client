// import { At, GoogleLogo, Password } from "phosphor-react";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
type Props = {
  loginWithGoogle: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
};

export function Login({ loginWithGoogle, loginWithEmailAndPassword }: Props) {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // const { signup, login } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email.current && password.current) {
      loginWithEmailAndPassword(email.current.value, password.current.value);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center p-7">
      <div className="bg-white md:w-[500px] rounded-xl p-8">
        <h2 className="mt-20 mb-8 text-3xl font-bold text-center text-gray-800">
          Welcome back
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative flex items-center">
              {/* <At className="w-6 h-6 absolute left-4 inset-y-0 my-auto" /> */}
              <input
                ref={email}
                type="email"
                name="email"
                placeholder="Email"
                className="focus:outline-none
                                        block w-full rounded-xl placeholder-gray-500
                                        bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
                                        duration-300 invalid:ring-2 invalid:ring-red-400
                                        focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div className="space-y-4 my-6">
            <div className="relative flex items-center">
              {/* <Password className="w-6 h-6 absolute left-4 inset-y-0 my-auto" /> */}
              <input
                ref={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="focus:outline-none block w-full rounded-xl placeholder-gray-500 bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black rounded-xl flex h-11 w-full items-center justify-center px-6"
          >
            <span className="text-base font-light text-white">Login</span>
          </button>
          <p className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
            Don't have an account ?
            <Link href="/sign-up" className="text-black">
              {" "}
              Sign up
            </Link>
          </p>
        </form>
        <div>
          <p className="text-center mb-8">Or</p>
          <button
            onClick={loginWithGoogle}
            className="rounded-xl flex gap-x-4 mb-8 text-black h-11 w-full items-center justify-center px-6 border border-gray-500"
          >
            <Image
              height={40}
              width={40}
              className="object-contain rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg"
              alt="google"
            />
            <span className="relative text-base font-light">with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
