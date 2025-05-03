import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./../layout/Root";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Root />} />
        <Route path={"/porduct-list"} element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
