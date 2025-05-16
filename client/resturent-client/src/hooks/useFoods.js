import { useQuery } from "@tanstack/react-query";
import { getAllFoods } from "../api/food.api";

const useFoods = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["foodsList"],
    queryFn: getAllFoods,
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 20,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    error,
    data
  };
};

export default useFoods;
