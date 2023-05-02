import axios from "axios";
import { useQuery } from "react-query";
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
