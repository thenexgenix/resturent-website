import React from "react";
import CartItems from "./../components/ui/cart/CartItems";
import CartCalcualtion from "./../components/ui/cart/CartCalcualtion";

const Cart = () => {
  const { cartItems, addToCart } = useFoodAndCartStore();

  return (
    <>
      <section>
        <div>
          <h1> your Cart</h1>
          <div>
            {/* CartItems component will be rendered here */}
            <CartItems />
          </div>
          <div>
            <h2>Cart Calculation</h2>
            {/* CartCalcualtion component will be rendered here */}
            <CartCalcualtion />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
