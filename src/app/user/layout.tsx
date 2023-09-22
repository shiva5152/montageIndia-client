import React from "react";
import Navbar from "@/components/navbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen">
      <section className="w-[18%] bg-white">
        <Navbar />
      </section>
      <section
        className={`
                 w-[82%] bg-[#fbfbfb] h-screen`}
      >
        {children}
      </section>
    </div>
  );
};

export default layout;
