"use client";

import React, { useEffect, useState } from "react";
import { useGetFilterListQuery } from "@/services/api";
import { FilterType } from "@/types/types";
import AutoComplete from "@/components/AutoComplete";
import { useRecoilState } from "recoil";
import { categoryAtom, ingredientsAtom, openFilterAtom } from "@/recoil/atom";
import CloseIcon from "./CloseIcon";

const Filter = () => {
  const { data: categoiresData } = useGetFilterListQuery("Categories");
  const { data: ingredientsData } = useGetFilterListQuery("Ingredients");
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [ingredients, setIngredients] = useRecoilState(ingredientsAtom);

  const [open, setOpen] = useRecoilState(openFilterAtom);

  return (
    <>
      <button
        className="btn btn-sm m-4 self-start"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Filter
      </button>
      <div
        className={`z-50 w-full max-w-md gap-2 bg-gray-950 h-full flex flex-col p-4 fixed top-0 left-0 mx-auto transition-all duration-500 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-xl">Filter</span>
          <button
            className="visible lg:hidden flex items-center justify-center "
            type="button"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className={"h-8 w-8 stroke-whte "} />
          </button>
        </div>
        <div className="h-[1px] w-full bg-white/30" />
        <span className="mt-2">Categories</span>
        {categoiresData && (
          <AutoComplete
            key={"Categories"}
            options={categoiresData.drinks.map(
              (drink: { strCategory: string }) => drink.strCategory
            )}
            value={category}
            setValue={setCategory}
          />
        )}
        <span className="mt-4">Ingredients</span>
        {ingredientsData && (
          <AutoComplete
            key={"Ingredients"}
            options={ingredientsData.drinks.map(
              (drink: { strIngredient1: string }) => drink.strIngredient1
            )}
            value={ingredients}
            setValue={setIngredients}
          />
        )}
        <div className="flex flex-col gap-2 ">
          {ingredients.map((ingredient: string) => (
            <div key={ingredient} className="flex items-center">
              <button
                className="flex items-center justify-center"
                type="button"
                onClick={() =>
                  setIngredients(
                    ingredients.filter((item) => item !== ingredient)
                  )
                }
              >
                <CloseIcon className={"h-5 w-5 stroke-red-600 "} />
              </button>
              <span>{ingredient}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
