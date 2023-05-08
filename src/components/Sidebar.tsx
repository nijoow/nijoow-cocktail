"use client";

import React, { useState } from "react";
import Filter from "./Filter";
import { useRecoilState } from "recoil";
import { openSidebarAtom } from "@/recoil/atom";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useRecoilState(openSidebarAtom);
  console.log(openSidebar);
  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full max-w-xs bg-red-50 transition-all h-full ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col">
        <button
          type="button"
          className="lg:hidden btn btn-circle swap swap-rotate "
          onClick={() => setOpenSidebar(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            className="fill-white"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </button>
        <Filter />
      </div>
    </div>
  );
};

export default Sidebar;
