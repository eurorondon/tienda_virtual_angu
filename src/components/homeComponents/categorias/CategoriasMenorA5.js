import React from "react";
import { Link } from "react-router-dom";

function CategoriasMenorA5({ categories, handleCategories }) {
  if (categories?.length <= 1 || categories?.length > 5) {
    return null;
  }

  return (
    <div>
      <div className="py-4" style={{ backgroundColor: "#040915" }}>
        <div className="mx-5">
          <div className="row gap-3 ">
            {categories?.map((category) => (
              <div
                className="col   d-flex justify-content-center align-items-center gap-4"
                style={{
                  borderRadius: "2rem",
                  maxHeight: "350px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <div className="  ">
                  <div className="">
                    <h5 className="mb-2">{category.categoryName}</h5>
                    <Link
                      onClick={() => handleCategories()}
                      to={`/categories/${category.categoryName} `}
                    >
                      <button className="btn btn-primary">Ver mas</button>
                    </Link>
                  </div>
                </div>

                <div
                  className=" "
                  style={{ maxWidth: "10rem", minWidth: "10rem" }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriasMenorA5;
