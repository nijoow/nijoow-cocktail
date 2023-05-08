import { FilterType } from "@/types/types";
import { atom } from "recoil";

export const openSidebarAtom = atom({ key: "OpenSidebar", default: true });

export const filterAtom = atom<FilterType>({
  key: "Filter",
  default: "Categories",
});

export const selectedValueAtom = atom({ key: "SelectedValue", default: "" });
