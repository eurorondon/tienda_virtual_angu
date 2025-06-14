import React from "react";
import { Colors } from "../../utils/colors";
import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../../utils/graphqlFunctions";

const Portada = () => {
  const { data } = useQuery(["Settings"], getAllSettings);
  if (window.innerWidth < 576)
    return (
      <div
        className="   "
        style={{ backgroundColor: Colors.Ccuarto, borderRadius: "3%" }}
      >
        <div className="">
          <picture>
            {" "}
            <source
              media="(max-width: 576px)"
              srcSet={data[0]?.coverImage[1]?.url || "./images/banner.png"}
            />{" "}
            <source
              media="(min-width: 577px)"
              srcSet={data[0]?.coverImage[0]?.url || "./images/banner.png"}
            />{" "}
            <img
              src={data[0]?.coverImage[0]?.url || "./images/banner.png"}
              alt="cover"
              className="img-fluid"
            />{" "}
          </picture>
          {/* <div className="row " style={{ minHeight: "11rem" }}>
            <div className="col-8  py-2 col-sm-6 d-flex  justify-content-center aling-items-center container ">
              <div className=" ">
                <div className="text-start">
                  <h1
                    className="mb-4"
                    style={{ fontWeight: "bolder", fontSize: "1.5rem" }}
                  >
                    Grafico Caracas
                  </h1>
                </div>
                <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Buenos precios
                </h5>
                <button
                  className="btn  mt-3 text-white "
                  style={{
                    position: "absolute",
                    zIndex: "",
                    backgroundColor: Colors.Cprimary,
                    fontWeight: "bold",
                  }}
                >
                  Disfruta nuestras ofertas !
                </button>
              </div>
            </div>
            <div className="col-4  ">
              <div className="d-flex justify-content-center aling-items-center  ">
                {Array.isArray(data) &&
                data.length > 0 &&
                data[0]?.coverImage?.length > 0 ? (
                  <img
                    src={
                      data[0].coverImage[0]?.url ||
                      "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                    }
                    alt="cover"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                    alt="default cover"
                    className="img-fluid"
                  />
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );

  return (
    <div
      className="  rounded twhiteext- "
      style={{ backgroundColor: Colors.Ccuarto }}
    >
      <picture>
        {" "}
        <source
          media="(max-width: 576px)"
          srcSet={data[0]?.coverImage[1]?.url || "./images/banner.png"}
        />{" "}
        <source
          media="(min-width: 577px)"
          srcSet={
            data[0]?.coverImage[0]?.url || "./images/bannerEscritorio2.png"
          }
        />{" "}
        <img
          src={data[0]?.coverImage[0]?.url || "./images/bannerEscritorio2.png"}
          alt="cover"
          className="img-fluid"
        />{" "}
      </picture>
      {/* <div
        className={
          window.innerWidth < 768
            ? "mx-5  "
            : " container d-flex justify-content-center "
        }
      >
        <div
          className="d-flex  justify-content-center flex-column-reverse flex-md-row"
          style={
            window.innerWidth < 1200 ? { width: "100%" } : { width: "70%" }
          }
        >
          <div className="    d-flex flex-column justify-content-center align-items-center  container ">
            <div className=" ">
              <div className="text-start">
                <h2 style={{ fontWeight: "bold" }}>Grafico Caracas</h2>
              </div>
              <h4>Los mejores precios en articulos de imprecion</h4>
             
            </div>
          </div>
          <div className=" m-auto ">
            <div className="d-flex  justify-content-start  align-items-center ">
              {Array.isArray(data) && data.length > 0 && (
                <img
                  src={
                    Array.isArray(data) &&
                    data.length > 0 &&
                    Array.isArray(data[0]?.coverImage) &&
                    data[0]?.coverImage.length > 0 &&
                    data[0]?.coverImage[0]?.url
                      ? data[0].coverImage[0].url
                      : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                  }
                  alt="cover"
                  style={{ maxWidth: "20rem" }}
                />
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Portada;
