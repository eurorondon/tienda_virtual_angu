import React from "react";
import { Link } from "react-router-dom";
import { Colors } from "../../../utils/colors";

function CategoriaPc({ categories, handleCategories }) {
  if (categories.length <= 8)
    return (
      <div
        className="py-2"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#040915",
          color: "white",
        }}
      >
        {categories?.map((category, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <Link
              to={`/categories/${category.categoryName}`}
              onClick={() => handleCategories(category)}
              style={{
                width: "100px",
                height: "100px",
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
            </Link>
            <h6 className="mt-1">{category.categoryName}</h6>
          </div>
        ))}
      </div>
    );

  return (
    <div
      className="py-2 mb-3"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {categories.slice(0, 7)?.map((category, index) => (
        <div key={index} style={{ margin: "10px", textAlign: "center" }}>
          <Link
            to={`/categories/${category.categoryName}`}
            onClick={() => handleCategories(category)}
            style={{
              width: "100px",
              height: "100px",
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
          </Link>
          <h6 className="mt-1">{category.categoryName}</h6>
          <div style={{ marginTop: "10px" }}>{category.name}</div>
        </div>
      ))}
      <div style={{ margin: "10px", textAlign: "center" }}>
        <Link
          to={`/categories`}
          // onClick={() => handleCategories(category)}
          style={{
            width: "100px",
            height: "100px",
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
              "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
            }
            alt={"test"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Link>
        <h6 className="mt-1">{"Ver mas"}</h6>
      </div>
    </div>
  );
}

export default CategoriaPc;
