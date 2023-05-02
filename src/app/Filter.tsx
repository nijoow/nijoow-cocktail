"use client";

import React, { useEffect, useState } from "react";
import { useGetFilterListQuery } from "@/services/api";
import { FilterType } from "@/types/types";

const Tab = ({
  type,
  filter,
  setFilter,
}: {
  type: FilterType;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <button
      type="button"
      className={`tab tab-lifted ${type === filter ? "tab-active" : ""}`}
      onClick={() => {
        setFilter(type);
      }}
    >
      {type}
    </button>
  );
};

const Filter = () => {
  const [filter, setFilter] = useState<FilterType>("Categories");
  const { data } = useGetFilterListQuery(filter);

  console.log(data?.drinks);
  return (
    <>
      <div className="tabs">
        <Tab type={"Categories"} filter={filter} setFilter={setFilter} />
        <Tab type={"Ingredients"} filter={filter} setFilter={setFilter} />
        <Tab type={"Alcoholic"} filter={filter} setFilter={setFilter} />
        <Tab type={"Glasses"} filter={filter} setFilter={setFilter} />
      </div>
      <div>
        {filter === "Categories" &&
          data?.drinks?.map(
            (drink: { strCategory: string }) => drink.strCategory
          )}
        {filter === "Ingredients" &&
          data?.drinks?.map(
            (drink: { strIngredient1: string }) => drink.strIngredient1
          )}
        {filter === "Alcoholic" &&
          data?.drinks?.map(
            (drink: { strAlcoholic: string }) => drink.strAlcoholic
          )}
        {filter === "Glasses" &&
          data?.drinks?.map((drink: { strGlass: string }) => drink.strGlass)}
      </div>
    </>
  );
};

export default Filter;
