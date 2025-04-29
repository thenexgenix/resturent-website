import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "../layout/Root";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
