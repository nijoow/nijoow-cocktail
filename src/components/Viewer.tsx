"use client";

import {
  categoryAtom,
  filterAtom,
  ingredientsAtom,
  openFilterAtom,
  selectedValueAtom,
} from "@/recoil/atom";
import {
  getFilteredItemListApi,
  useGetFilteredItemListQuery,
  useGetIngredientsQuerys,
} from "@/services/api";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function checkForMatchingIdDrink(arr: any[], targetId: string) {
  for (let i = 0; i < arr.length; i++) {
    const matchingElement = arr[i]?.find(
      (item: any) => item.idDrink === targetId
    );
    if (matchingElement) {
      return true;
    }
  }
  return false;
}

const Viewer = () => {
  const [cocktails, setCocktails] = useState([]);

  const [category] = useRecoilState(categoryAtom);
  const [ingredients] = useRecoilState(ingredientsAtom);

  const { data } = useGetFilteredItemListQuery("Categories", category);
  const queries = ingredients.map((ingredient) => ({
    queryKey: ingredient,
    queryFn: () => getFilteredItemListApi("Ingredients", ingredient),
  }));

  const ingredientsCocktails = useGetIngredientsQuerys(queries).map(
    ({ data }: any) => data?.drinks
  );

  useEffect(() => {
    if (!data) return;
    if (ingredientsCocktails.length === 0) {
      setCocktails(data?.drinks);
      return;
    }
    const nextCocktails = data?.drinks.filter((drink: any) =>
      checkForMatchingIdDrink(ingredientsCocktails, drink.idDrink)
    );
    setCocktails(nextCocktails);
  }, [data, ingredients]);

  return (
    <div
      className={`grid grid-cols-12 gap-12 py-12 px-24 overflow-auto lg:ml-[448px]
      }`}
    >
      {cocktails.map(
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
