import React from "react";
import { Link } from "react-router-dom";
import { Colors } from "../../../utils/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function CategoriasMobileButtom({ categories, handleCategories }) {
  return (
    <div
      className="py-3  "
      style={{ backgroundColor: "#ffff", padding: "10px" }}
    >
      <h5
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Explora por categorias
      </h5>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            window.innerWidth < 768 ? "repeat(5, 1fr)" : "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {categories.slice(0, 9)?.map((category, index) => (
          <div
            className=""
            key={index}
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => handleCategories(category)}
              style={{
                width: window.innerWidth < 768 ? "13vw" : "13vw",
                height: window.innerWidth < 768 ? "13vw" : "13vw",
                borderRadius: "50vw",
                backgroundColor: Colors.Csecondary,
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
            <div>{category.name}</div>
          </div>
        ))}
        {/* Agregamos los elementos en blanco para llenar la última fila si es necesario */}
        {/* {blankItems} */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to={"/categories"}
            style={{
              width: window.innerWidth < 768 ? "13vw" : "12vw",
              height: window.innerWidth < 768 ? "13vw" : "12vw",
              borderRadius: "50%",
              backgroundColor: Colors.Csecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <AddCircleIcon sx={{ fontSize: "2.5rem" }} />
          </Link>
          <span style={{ fontSize: "0.8rem" }}>{"Ver más"}</span>
        </div>
      </div>
    </div>
  );
}

export default CategoriasMobileButtom;
