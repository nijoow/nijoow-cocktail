"use client";

import React, { useEffect, useState } from "react";
import { useGetFilterListQuery } from "@/services/api";
import { FilterType } from "@/types/types";
import AutoComplete from "@/components/AutoComplete";
import { useRecoilState } from "recoil";
import { filterAtom, selectedValueAtom } from "@/recoil/atom";

const Tab = ({
  type,
  setValue,
}: {
  type: FilterType;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  return (
    <button
      type="button"
      className={`tab tab-lifted w-full ${type === filter ? "tab-active" : ""}`}
      onClick={() => {
        setFilter(type);
        setValue("");
      }}
    >
      {type}
    </button>
  );
};

const Filter = () => {
  const [filter] = useRecoilState(filterAtom);
  const [, setSelectedValue] = useRecoilState(selectedValueAtom);
  const [value, setValue] = useState<string>("");
  const { data } = useGetFilterListQuery(filter);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex w-full overflow-auto">
        <Tab type={"Categories"} setValue={setValue} />
        <Tab type={"Ingredients"} setValue={setValue} />
        <Tab type={"Alcoholic"} setValue={setValue} />
        <Tab type={"Glasses"} setValue={setValue} />
      </div>
      <div className="flex w-full h-8">
        {filter === "Categories" && (
          <AutoComplete
            options={data?.drinks.map(
              (drink: { strCategory: string }) => drink.strCategory
            )}
            value={value}
            setValue={setValue}
          />
        )}
        {filter === "Ingredients" && (
          <AutoComplete
            options={data?.drinks.map(
              (drink: { strIngredient1: string }) => drink.strIngredient1
            )}
            value={value}
            setValue={setValue}
          />
        )}
        {filter === "Alcoholic" && (
          <AutoComplete
            options={data?.drinks.map(
              (drink: { strAlcoholic: string }) => drink.strAlcoholic
            )}
            value={value}
            setValue={setValue}
          />
        )}
        {filter === "Glasses" && (
          <AutoComplete
            options={data?.drinks?.map(
              (drink: { strGlass: string }) => drink.strGlass
            )}
            value={value}
            setValue={setValue}
          />
        )}
        <button
          className="btn btn-sm "
          type="button"
          onClick={() => setSelectedValue(value)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
