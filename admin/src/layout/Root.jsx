import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <main className="font-Poopins">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
