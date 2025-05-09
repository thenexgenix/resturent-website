import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Cursor from "../components/ui/Cursor";

const Root = () => {
  return (
    <>
      <main className="font-Poopins">
        <Cursor />
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Root;
