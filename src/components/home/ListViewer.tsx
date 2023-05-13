"use client";

import { categoryAtom, ingredientsAtom } from "@/recoil/atom";
import {
  getFilteredItemListApi,
  useGetFilteredItemListQuery,
  useGetIngredientsQuerys,
} from "@/services/api";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function checkForMatchingIdDrink(arr: any[], targetId: string) {
  if (arr.length === 0) return true;

  return arr.reduce(
    (isIncluded, targetArr) =>
      targetArr?.find((item: any) =>
        !(item.idDrink === targetId) ? false : isIncluded
      ),
    true
  );
}

const ListViewer = () => {
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

  const filteredCocktail = cocktails.filter((drink: any) =>
    checkForMatchingIdDrink(ingredientsCocktails, drink.idDrink)
  );
  useEffect(() => {
    if (!data) return;

    setCocktails(data?.drinks);
  }, [data]);

  return (
    <div
      className={` grid grid-cols-12 lg:py-12 px-4 py-4 gap-4 lg:gap-12 lg:px-24 overflow-auto lg:ml-[448px] w-auto`}
    >
      {filteredCocktail.map(
        (drink: {
          idDrink: string;
          strDrink: string;
          strDrinkThumb: string;
        }) => (
          <Link
            href={`/detail/${drink.idDrink}`}
            key={drink.idDrink}
            className="w-full col-span-12 shadow-xl xs:col-span-6 sm:col-span-4 2xl:col-span-3 card bg-base-100"
          >
            <figure className="relative w-full h-0 pb-[100%]">
              <Image
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                fill
                sizes="100%"
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{drink.strDrink}</h2>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default ListViewer;
