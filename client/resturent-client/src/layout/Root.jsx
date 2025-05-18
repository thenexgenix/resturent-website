import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Cursor from "../components/ui/Cursor";
import Footer from "../components/Footer";
import ScrollTop from "../components/scrollTop";

const Root = () => {
  return (
    <>
      <main className="font-Belleza overflow-hidden">
        <ScrollTop />
        <Cursor />
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Root;
