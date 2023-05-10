"use client";

import {
  categoryAtom,
  filterAtom,
  ingredientsAtom,
  openFilterAtom,
  selectedValueAtom,
} from "@/recoil/atom";
import { useGetFilteredItemListQuery } from "@/services/api";
import { useRecoilState } from "recoil";
import React from "react";
import Image from "next/image";

const Viewer = () => {
  const [open, setOpen] = useRecoilState(openFilterAtom);

  const [filter] = useRecoilState(filterAtom);
  const [selectedValue] = useRecoilState(selectedValueAtom);

  const [category, setCategory] = useRecoilState(categoryAtom);
  const [ingredients, setIngredients] = useRecoilState(ingredientsAtom);

  const { data } = useGetFilteredItemListQuery(filter, category);

  return (
    <div
      className={`grid grid-cols-12 gap-12 py-12 px-24 overflow-auto lg:ml-[448px]
      }`}
    >
      {(data?.drinks || []).map(
        (drink: {
          idDrink: string;
          strDrink: string;
          strDrinkThumb: string;
        }) => (
          <div
            key={drink.idDrink}
            className="col-span-6 sm:col-span-4 2xl:col-span-3 card w-full bg-base-100 shadow-xl"
          >
            <figure className="relative w-full h-0 pb-[100%]">
              <Image
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                fill
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{drink.strDrink}</h2>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Viewer;
