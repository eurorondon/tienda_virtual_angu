import React from "react";
import { Link } from "react-router-dom";

function CategoriasMobile({ categories, handleCategories }) {
  const displayedCategories =
    window.innerWidth < 768 ? categories.slice(0, 4) : categories.slice(0, 5);

  return (
    <div className=" py-3  " style={{ backgroundColor: "#ffff" }}>
      <h5
        className="p-2 text-center "
        style={
          window.innerWidth < 768
            ? { fontWeight: "bold", fontSize: "1.2rem" }
            : { fontWeight: "bold", fontSize: "1.5rem" }
        }
      >
        Explora por categorias
      </h5>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          // backgroundColor: "#D8EAF2",
          margin: "10px 0px",
        }}
      >
        {displayedCategories.map((category, index) => (
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
                width: window.innerWidth < 768 ? "20vw" : "8rem",
                height: window.innerWidth < 768 ? "20vw" : "8rem",
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
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center  ",
          // backgroundColor: "#D8EAF2",
        }}
      >
        {categories?.slice(4, 7).map((category, index) => (
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
      </div> */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4"></div>
    </div>
  );
}

export default CategoriasMobile;
