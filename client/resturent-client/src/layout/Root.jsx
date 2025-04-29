import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
    <p>hello world</p>
      <Outlet />
    </>
  );
};

export default Root;
