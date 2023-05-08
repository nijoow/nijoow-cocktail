"use client";

import React from "react";
import { useRecoilState } from "recoil";
import { openSidebarAtom } from "@/recoil/atom";

const SidebarButton = () => {
  const [, setOpenSidebar] = useRecoilState(openSidebarAtom);

  return (
    <button
      type="button"
      className="btn btn-circle swap swap-rotate"
      onClick={() => setOpenSidebar(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
        className="fill-white"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
    </button>
  );
};

export default SidebarButton;
