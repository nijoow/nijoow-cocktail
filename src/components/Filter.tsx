"use client";

import React, { useEffect, useState } from "react";
import { useGetFilterListQuery } from "@/services/api";
import { FilterType } from "@/types/types";
import Autocomplete from "@/components/AutoComplete";

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
  const [value, setValue] = useState("");

  const { data } = useGetFilterListQuery(filter);

  useEffect(() => {
    setValue("");
  }, [filter]);
  return (
    <>
      <div className="tabs">
        <Tab type={"Categories"} filter={filter} setFilter={setFilter} />
        <Tab type={"Ingredients"} filter={filter} setFilter={setFilter} />
        <Tab type={"Alcoholic"} filter={filter} setFilter={setFilter} />
        <Tab type={"Glasses"} filter={filter} setFilter={setFilter} />
      </div>
      <div>
        {filter === "Categories" && (
          <Autocomplete
            value={value}
            setValue={setValue}
            options={data?.drinks.map(
              (drink: { strCategory: string }) => drink.strCategory
            )}
          />
        )}
        {filter === "Ingredients" && (
          <Autocomplete
            value={value}
            setValue={setValue}
            options={data?.drinks.map(
              (drink: { strIngredient1: string }) => drink.strIngredient1
            )}
          />
        )}
        {filter === "Alcoholic" && (
          <Autocomplete
            value={value}
            setValue={setValue}
            options={data?.drinks.map(
              (drink: { strAlcoholic: string }) => drink.strAlcoholic
            )}
          />
        )}
        {filter === "Glasses" && (
          <Autocomplete
            value={value}
            setValue={setValue}
            options={data?.drinks?.map(
              (drink: { strGlass: string }) => drink.strGlass
            )}
          />
        )}
      </div>
    </>
  );
};

export default Filter;
