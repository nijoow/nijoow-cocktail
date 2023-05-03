import { FilterType } from "@/types/types";
import { atom } from "recoil";

export const filterAtom = atom<FilterType>({
  key: "Filter",
  default: "Categories",
});
export const selectedValueAtom = atom({ key: "SelectedValue", default: "" });
