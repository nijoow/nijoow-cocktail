"use client";

import { useGetCocktailDetailApi } from "@/services/api";
import React from "react";
import Image from "next/image";
import Loading from "../Loading";
const array = Array.from(Array(15), (v, i) => i + 1);

const DetailViewer = ({ id }: { id: string }) => {
  const { data } = useGetCocktailDetailApi(id);
  const drink = data?.drinks[0] || null;
  console.log(drink);

  return (
    <div className="flex justify-center w-full h-full overflow-auto">
      {!drink ? (
        <div className="self-center">
          <Loading />
        </div>
      ) : (
        <div
          key={drink.idDrink}
          className="w-full max-w-xl shadow-xl h-fit card bg-base-100"
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
          <div className="p-4 xs:p-8 card-body">
            <h2 className="text-2xl card-title">{drink.strDrink}</h2>
            <div className="flex gap-2">
              <div className="badge badge-outline">{drink.strCategory}</div>
              <div className="badge badge-outline">{drink.strAlcoholic}</div>
            </div>
            <div className="h-[1px] w-full bg-white/30 my-1" />
            <span>Ingredients</span>
            <div className="flex flex-wrap p-2 border border-white rounded-md gap-x-4">
              {array.map((value) => {
                const ingredient = drink[`strIngredient${value}`];
                return ingredient ? (
                  <span key={ingredient}>{ingredient}</span>
                ) : (
                  <></>
                );
              })}
            </div>
            <div className="flex flex-col gap-1">
              {drink.strInstructions &&
                drink.strInstructions
                  .split(". ")
                  .map((line: string, index: number) => (
                    <span key={index}>
                      {index + 1}. {line}
                    </span>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailViewer;
