"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navbar = () => {
  const [showProduct, setShowProduct] = useState(false);
  return (
    <nav className="flex flex-col p-4">
      <div className="mb-8">
        <Image src={"/logo.png"} width={150} height={150} alt="montageIndia" />
      </div>
      <ul className="flex flex-col gap-3">
        <li className="w-full hover:text-orange-400  p-1 px-2 ">
          <Link href={"/"}>Dashboard</Link>
        </li>
        <li
          onClick={() => setShowProduct(true)}
          className="w-full  p-1 px-2 flex cursor-pointer flex-col gap-2"
        >
          <span className="hover:text-orange-400">Product</span>
          {showProduct && (
            <>
              <Link className="ml-3 hover:text-orange-400 " href={"/image"}>
                Image
              </Link>
              <Link className="ml-3 hover:text-orange-400 " href={"/video"}>
                Video
              </Link>
              <Link className="ml-3 hover:text-orange-400 " href={"/audio"}>
                Audio
              </Link>
            </>
          )}
        </li>
        <li className="w-full hover:text-orange-400  p-1 px-2 ">
          <Link href={"/order"}>Order</Link>
        </li>
        <li className="w-full hover:text-orange-400  p-1 px-2 ">
          <Link href={"/users"}>Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
