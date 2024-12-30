"use client";
import { useSession, signOut } from "next-auth/react"; 
import Image from "next/image";
import logo from '../../assest/logo.png'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";


const Navbar = () => {
  const { data: session } = useSession(); 
  const pathname = usePathname(); 
  const [open, setOpen] = useState(false); 
  const menuRef = useRef(null); 


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

  
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login", 
    });
  };

  return (
    <div>
      <div className="hidden md:flex justify-between items-center h-14 bg-[#FFEB3B] px-4">
        <div><Image src={logo} width={50} height={50} alt="logo" className="rounded-full w-auto h-auto" /></div>
        <div>
          <ul className="flex justify-center items-center gap-20">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "bg-white rounded-md" : ""
                } px-4 py-2 hover:border-b-2 border-white`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/view-transactions"
                className={`${
                  pathname === "/view-transactions" ? "bg-white rounded-md" : ""
                } px-4 py-2 `}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className={`${
                  pathname === "/set-budget" ? "bg-white rounded-md" : ""
                } px-4 py-2 hover:border-b-2 border-white`}
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className={`${
                  pathname === "/expense-insights" ? "bg-white rounded-md" : ""
                } px-4 py-2 hover:border-b-2 border-white`}
              >
                Expense Insight
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {session?.user?.email ? (
            <button
              onClick={handleLogout} 
              className="border border-white rounded-md p-1"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="border border-white rounded-md p-1"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        <div className="bg-[#FFEB3B] h-12 flex items-center justify-between text-center px-2">
          <div onClick={() => setOpen(!open)} className="lg:hidden btn btn-ghost">
            {open ? (
              <IoCloseCircleSharp className="text-2xl" />
            ) : (
              <IoMenu className="text-2xl" />
            )}
          </div>
          <Link href="/" className=" text-lg font-bold ">
            Finance Book
          </Link>
          <div><Image src={logo} width={40} height={40} alt="logo" className="rounded-full w-auto h-auto" /></div>
        </div>

        <ul
          ref={menuRef}
          className={`${
            open ? "top-12 -left-1" : "top-12 -left-60"
          } duration-1000 absolute text-black menu-sm ml-2 z-[1] p-2 bg-[#FFEB3B] space-y-5 w-44 py-4 rounded-sm border border-green-500`}
        >
           <li>
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "border-b-2 border-gray-50" : ""
                } px-4 py-2 `}
              >
                Dashboard
              </Link>
            </li>

           <li>
              <Link
                href="/view-transactions"
                className={`${
                  pathname === "/view-transactions" ? "border-b-2 border-gray-50" : ""
                } px-4 py-2 `}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className={`${
                  pathname === "/set-budget" ? "border-b-2 border-gray-50" : ""
                } px-4 py-2 `}
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className={`${
                  pathname === "/expense-insights" ? "border-b-2 border-gray-50" : ""
                } px-4 py-2 `}
              >
                Expense Insight
              </Link>
            </li>
          <li>
            {session?.user?.email ? (
              <button
                onClick={handleLogout} 
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="border border-white px-2 py-1 rounded-md hover:bg-white"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
