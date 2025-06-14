import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../utils/graphqlFunctions";
import { useQuery } from "@tanstack/react-query";
import Header from "../../Header";
import Loading from "../../Loading";
import { Package2Icon as Package2X } from "lucide-react";

function GridCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState([]);
  const {
    data: dataCategories,
    error,
    isLoading,
  } = useQuery(["AllCategoriesGridScreen"], getCategories, {
    // refetchOnMount: false,
    // refetchInterval: false,
    // refetchOnWindowFocus: false,
    // refetchIntervalInBackground: false,
  });
  useEffect(() => {
    if (dataCategories) {
      setCategories(dataCategories);
    }
  }, [dataCategories]);

  const handleCategories = (category) => {
    window.scroll(0, 0);
    navigate(`/categories/${category.categoryName}`);
  };

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Header />
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div>
            <Loading />
          </div>
        </div>
      ) : (
        <>
          {categories.length < 1 && (
            <div
              className="d-flex flex-column justify-content-center align-items-center min-vh-50 p-4 rounded mx-auto"
              style={{ minHeight: "60vh" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <Package2X
                  size={56}
                  className="mb-4"
                  style={{ color: "gray" }}
                />
                <h3 className="font-semibold mb-2 text-secondary">
                  No hay categorias disponibles
                </h3>
                <p className="text-muted-foreground max-w-md mb-6 text-secondary">
                  Lo sentimos, actualmente no hay categorias disponibles. Por
                  favor, vuelva a consultar más tarde.
                </p>
              </div>
            </div>
          )}

          {categories.length > 0 && (
            <div
              className="my-5 container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {categories.map((category) => (
                <div
                  onClick={() => handleCategories(category)}
                  key={category.id}
                  className="shadow p-2 d-flex flex-column justify-content-start align-items-center"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <div className="rounded">
                    <img
                      src={
                        category.photo
                          ? category.photo[0].url
                          : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                      }
                      alt={category.categoryName}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                    />
                    <span>{category.categoryName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GridCategories;
