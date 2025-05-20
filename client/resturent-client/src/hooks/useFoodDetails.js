import { useQuery } from "@tanstack/react-query";
import { getFoodById } from "../api/food.api";

const useFoodDetails = (id) => {
  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ["foodDetails", id],
    queryFn: () => getFoodById(id),
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 20,
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return { data, isLoading, error, isError, isSuccess };
};

export default useFoodDetails;
