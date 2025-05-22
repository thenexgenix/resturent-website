import { useQuery } from "@tanstack/react-query";
import { getFoodById } from "../api/food.api";

const useDetailsFoods = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["foodDetails", id],
    queryFn: () => getFoodById(id),
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 20,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    error,
    data,
  };
};
