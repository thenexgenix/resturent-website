import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Orderpage from "../pages/Orderpage";
import Loader from "../components/Loader";
import Login from "./../pages/Login";
import Register from "../pages/Register";

const Routers = () => {
  // const [ispageLoading, setIsPageLoading] = useState(true);

  // if (ispageLoading)
  //   return (
  //     <Loader
  //       ispageLoading={ispageLoading}
  //       setIsPageLoading={setIsPageLoading}
  //     />
  //   );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<Orderpage />} />
          {/* <Route path="/order/:id" element={<Orderpage />} /> */}
          {/* login and register routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
