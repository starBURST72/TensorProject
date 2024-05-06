import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import React from "react";





const Layout: React.FC = () => {

  return (
    <>
      <Header />
      <Outlet />

    </>
  );
}

export default Layout