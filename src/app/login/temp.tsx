import React from "react";

const temp = () => {
  return (
    <div>
      <div className="w-full justify-center   h-full flex flex-col items-center p-4">
        <div className="w-[16rem] mt-[5rem] mb-[3rem] text-center rounded-lg">
          <p className="font-bold text-[1.7rem]">CyberSecurity.Jobs</p>
        </div>

        <p className=" text-gray-400">
          Welcome back, Please enter Your details
        </p>
        {/* switch */}
        <div>
          <div className="w-full flex gap-1 p-[0.2rem] bg-[#d2f34c]  rounded-[1rem] cursor-pointer shadow">
            <p
              onClick={handleModeToggle}
              className={`${
                mode ? "bg-white cursor-auto font-bold" : "text-gray-800"
              } transition ease-linear  px-[4rem] py-3 rounded-[0.7rem] `}
            >
              SignIn
            </p>
            <p
              onClick={handleModeToggle}
              className={`${
                !mode ? "bg-white cursor-auto font-bold" : "text-gray-800"
              } transition ease-linear  px-[4rem] py-3 rounded-[0.7rem] `}
            >
              SignUp
            </p>
          </div>
        </div>
        {/* input */}
        <div className="border-gray-200 border-2 rounded-lg flex justify-center items-center px-4 py-2 mt-5">
          <div className="pr-4 border-r-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="mx-4 flex flex-col">
            <label className="text-[0.65rem] font-semibold text-gray-400">
              Email Address
            </label>
            <input
              className="border-none pt-0 font-semibold focus:border-none rounded-sm py-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
              type="email"
              value={email}
              autoComplete="off"
              onChange={handleOnchange}
              placeholder="Enter"
            />
          </div>

          <div
            className={
              isValidEmail(email)
                ? "bg-green-400 border-2 border-green-400 rounded-full"
                : "border-[#838589] border-2 rounded-full"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke={!isValidEmail(email) ? "#838589" : "white"}
              className="w-6 h-6  p-[0.35rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
        {/* password */}
        <div className="border-gray-200 border-2 rounded-lg flex justify-center items-center px-4 py-2 mt-5">
          <div className="pr-4 border-r-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div className="mx-4 flex flex-col">
            <label className="text-[0.65rem] font-semibold text-gray-400">
              Password
            </label>
            <input
              className="border-none pt-0 font-semibold focus:border-none rounded-sm py-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
              type={showPass ? "password" : "text"}
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter"
            />
          </div>

          <div onClick={() => setShowPass((p) => !p)}>
            {showPass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#838589"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#838589"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </div>
        </div>
        {user && !user.emailVerified && (
          <p className="border-gray-200 md:w-[50%] text-center text-[0.9rem] font-light  italic border-2 rounded-lg flex justify-center items-center px-4 py-2 mt-5">
            Your account has been successfully created, Please verify your email
            and reload this page to proceed further.
          </p>
        )}
        <div className="mt-5">
          <button
            disabled={user ? true : false}
            className="px-[9.3rem] text-black font-semibold rounded-lg py-3  bg-[#d2f34c] text-center"
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
        <div className="flex w-[50%] gap-2 m-5 ">
          <p className="border-t-[2px] border-gray-400 mt-3 w-[28%]"></p>
          <p className="text-gray-500 font-medium"> Or Continue With </p>
          <p className="border-t-[2px] border-gray-400 mt-3 w-[28%]"></p>
        </div>
        <div className="flex w-full md:w-[50%] mx-4">
          <button
            onClick={handleGoogleLogin}
            className="flex px-4 py-2 justify-center items-center cursor-pointer w-full border-2 rounded-lg"
          >
            <Image
              height={40}
              width={40}
              className="object-contain rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg"
              alt="google"
            />
            <p className="text-[1.3rem] ml-5"> Google</p>
          </button>
        </div>
      </div>
      {/* <div className="w-[50%] h-full bg-white flex items-center justify-center">
        <div className="w-[90%]  rounded-md">
          <Image
            src={"/job-portal.jpg"}
            className="object-contain  mx-auto rounded-lg"
            alt="pdfGpt"
            width={600}
            height={600}
          />
        </div>
      </div> */}
    </div>
  );
};

export default temp;
