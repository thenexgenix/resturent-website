import React from "react";
import MenuDetailsPage from "../components/ui/Menu/MenuDetailsPage";
import { useParams } from "react-router";

const MenuDetails = () => {
  const { productId } = useParams();
  //check if productId is valid
  if (!productId) {
    return (
      <div className="text-red-600 text-xl font-semibold w-full text-center ">
        Invalid product.
      </div>
    );
  }

  return (
    <>
      <section className="w-full mt-20">
        <MenuDetailsPage productId={productId}/>
      </section>
    </>
  );
};

export default MenuDetails;
