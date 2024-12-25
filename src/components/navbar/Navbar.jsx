"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
// import dynamic from 'next/dynamic';

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle click outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickLink = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div>
      <div className="hidden md:flex justify-between items-center h-14 bg-[#E0AFFE] px-4">
        <div>Logo</div>
        <div>
          <ul className="flex justify-center items-center gap-20">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "bg-white rounded" : ""
                } px-4 py-2  hover:border-b-2 border-white`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className={`${
                  pathname === "/set-budget" ? "bg-white rounded" : ""
                } px-4 py-2 hover:border-b-2 border-white`}
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className={`${
                  pathname === "/expense-insights" ? "bg-white rounded" : ""
                } px-4 py-2 hover:border-b-2 border-white`}
              >
                Expense Insight
              </Link>
            </li>
          </ul>
        </div>
        <div>Login</div>
      </div>
      <div>
        {/* FOR MOBILE VIEW  */}
        <div className="md:hidden ">
          <div className="bg-[#E0AFFE] h-12 flex  items-center text-center px-2">
            <div
              onClick={() => setOpen(!open)}
              className="lg:hidden btn btn-ghost "
            >
              {open ? (
                <IoCloseCircleSharp className="text-2xl" />
              ) : (
                <IoMenu className="text-2xl" />
              )}
            </div>
            <Link href="/" className=" text-lg  font-bold ml-14">
              Finance Tracker
            </Link>
          </div>

          <ul
            ref={menuRef}
            className={` ${
              open ? "top-12 -left-1" : "top-12 -left-60"
            } duration-1000 absolute text-black menu-sm ml-2 z-[1] p-2 bg-[#E0AFFE] space-y-5 w-44 py-4 rounded-sm border border-green-500`}
          >
            <li>
              <Link
                href="/"
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
                onClick={handleClickLink}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
              >
                Expense Insights
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
