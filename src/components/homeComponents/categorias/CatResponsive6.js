import React from "react";
import { Link } from "react-router-dom";

function CatResponsive6({ categories, handleCategories }) {
  return (
    <div
      className=" py-3"
      style={{ backgroundColor: "#040915", color: "white" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          // backgroundColor: "#D8EAF2",
          margin: "10px 0px",
        }}
      >
        {categories?.slice(0, 3).map((category, index) => (
          <div
            className=""
            key={index}
            style={{ margin: "5px", textAlign: "center" }}
          >
            <div
              className=" mx-auto"
              // to={`/categories/${category.categoryName}`}
              onClick={() => handleCategories(category)}
              style={{
                width: "20vw",
                height: "20vw",
                borderRadius: "50%",
                backgroundColor: "#CCCCCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  category.photo
                    ? category.photo[0].url
                    : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                }
                alt={category.categoryName}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <span className="" style={{ fontSize: "0.8rem" }}>
              {category.categoryName}
            </span>
            <div className="" style={{ marginTop: "" }}>
              {category.name}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly  ",
          // backgroundColor: "#D8EAF2",
        }}
      >
        {categories?.slice(3, 6).map((category, index) => (
          <div key={index} style={{ margin: "5px", textAlign: "center" }}>
            <div
              className="mx-auto"
              // to={`/categories/${category.categoryName}`}
              onClick={() => handleCategories(category)}
              style={{
                width: "20vw",
                height: "20vw",
                borderRadius: "50%",
                backgroundColor: "#CCCCCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  category.photo
                    ? category.photo[0].url
                    : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                }
                alt={category.categoryName}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <span style={{ fontSize: "0.8rem" }}>{category.categoryName}</span>
            <div style={{ marginTop: "" }}>{category.name}</div>
          </div>
        ))}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4"></div>
    </div>
  );
}

export default CatResponsive6;
