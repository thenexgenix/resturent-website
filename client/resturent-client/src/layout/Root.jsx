import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Cursor from "../components/ui/Cursor";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <main className="font-Belleza">
        <Cursor />
        <Navbar />
        <Outlet />
        <Footer/>
      </main>
    </>
  );
};

export default Root;
