import React from "react";
import { Link } from "react-router-dom";

function CatTablet8({ categories, handleCategories }) {
  return (
    <div className="py-3" style={{ backgroundColor: "#040915" }}>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        {categories.slice(0, 4)?.map((category, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <Link
              to={`/categories/${category.categoryName}`}
              onClick={() => handleCategories()}
              style={{
                width: "120px",
                height: "120px",
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
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        {categories.slice(4, 8)?.map((category, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <Link
              to={`/categories/${category.categoryName}`}
              onClick={() => handleCategories()}
              style={{
                width: "120px",
                height: "120px",
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
      </div>
    </div>
  );
}

export default CatTablet8;
