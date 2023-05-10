import { FilterType } from "@/types/types";
import { atom } from "recoil";

export const openFilterAtom = atom({ key: "OpenFilter", default: false });

export const categoryAtom = atom<string>({ key: "Category", default: "" });

export const ingredientsAtom = atom<string[]>({
  key: "Ingredients",
  default: [],
});

export const filterAtom = atom<FilterType>({
  key: "Filter",
  default: "Categories",
});

export const selectedValueAtom = atom({ key: "SelectedValue", default: "" });
