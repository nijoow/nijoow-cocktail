"use client";

import React, { useEffect, useState } from "react";

type FilterType = "All" | "Ingredient" | "Alcoholic" | "Category" | "Glass";

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
  const [filter, setFilter] = useState<FilterType>("All");

  return (
    <>
      <div className="tabs">
        <Tab type={"All"} filter={filter} setFilter={setFilter} />
        <Tab type={"Ingredient"} filter={filter} setFilter={setFilter} />
        <Tab type={"Alcoholic"} filter={filter} setFilter={setFilter} />
        <Tab type={"Category"} filter={filter} setFilter={setFilter} />
        <Tab type={"Glass"} filter={filter} setFilter={setFilter} />
      </div>
      <div>asd</div>
    </>
  );
};

export default Filter;
