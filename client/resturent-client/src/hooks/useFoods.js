import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFoods } from "../api/food.api";

const useFoods = () => {
  const [category, setCategory] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["foodsList"],
    queryFn: getAllFoods,
    staleTime: 1000 * 60 * 20, // 20 minutes
    cacheTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // derived filtered foods based on category
  const filteredFoods = useMemo(() => {
    if (!data) return [];
    if (category === "all") return data;
    return data.filter((food) => food.category === category);
  }, [data, category]);

  return {
    foods: data,
    filteredFoods,
    isLoading,
    error,
    category,
    setCategory,
  };
};

export default useFoods;
