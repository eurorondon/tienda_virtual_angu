import React from "react";
import Header from "../components/Header";

import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Ofertas from "../components/Ofertas/Ofertas";
import Destacados from "../components/Destacados/Destacados";
import CategoriesResultItemes from "../components/homeComponents/ShopSection/CategoriesResultItems";

export default function CategoriesResult() {
  return (
    <div
      className="pb-5 pb-md-0"
      style={{ backgroundColor: "#efefef", minHeight: "100vh" }}
    >
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Header />
      </div>
      {/* <Categorias /> */}
      <CategoriesResultItemes />
      <div style={{ margin: "70px" }}></div>

      <Ofertas />

      <div style={{ margin: "70px" }}></div>
      <Destacados />
    </div>
  );
}
