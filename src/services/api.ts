import axios from "axios";
import { useQueries, useQuery } from "react-query";
import { FilterEnum, FilterType } from "@/types/types";

const getFilterListApi = async (type: FilterType) => {
  const { data } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?${FilterEnum[type]}=list`
  );
  return data;
};

export const useGetFilterListQuery = (type: FilterType) => {
  const { data, isLoading } = useQuery(["FilterList", type], () =>
    getFilterListApi(type)
  );
  return { data, isLoading };
};

export const getFilteredItemListApi = async (
  type: FilterType,
  value: string
) => {
  const { data } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${FilterEnum[type]}=${value}`
  );
  return data;
};

export const useGetFilteredItemListQuery = (
  type: FilterType,
  value: string
) => {
  const { data, isLoading } = useQuery(["FilteredItemList", type, value], () =>
    getFilteredItemListApi(type, value)
  );
  return { data, isLoading };
};

export const useGetIngredientsQuerys = (queries: any[]) => {
  const result = useQueries(queries);
  return result;
};

const getCocktailDetailApi = async (id: string) => {
  const { data } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return data;
};

export const useGetCocktailDetailApi = (id: string) => {
  const { data, isLoading } = useQuery(
    ["CocktailDetail", id],
    () => getCocktailDetailApi(id),
    { refetchOnWindowFocus: true }
  );
  return { data, isLoading };
};
