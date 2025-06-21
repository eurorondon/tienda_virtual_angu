import { Colors } from "../../utils/colors";

export default function Product(props) {
  const {
    name,
    description,
    price,
    priceMayor,
    url,
    offer,
    discountPercentage,
    tasaParalelo,
    tasaOficial,
  } = props;

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getAjustado = (valor) => ((valor ?? 0) * tasaParalelo) / tasaOficial;

  const precioConDescuento = price - price * (discountPercentage / 100);
  const precioAjustado = getAjustado(price);
  const precioMayorAjustado =
    priceMayor && priceMayor !== 0 ? getAjustado(priceMayor) : null;
  const precioConDescuentoAjustado = getAjustado(precioConDescuento);

  return (
    <div
      className="card text-start"
      style={{ borderRadius: "10px", minHeight: "10rem", marginLeft: "1px" }}
    >
      {offer && (
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            top: "5px",
            left: "5px",
          }}
        >
          <span style={{ fontSize: "15px" }}>{`${discountPercentage}%`}</span>
        </div>
      )}

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        {url ? (
          <>
            {/* Móvil */}
            <img
              className="mx-auto d-md-none"
              src={url}
              alt="product"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            />
            {/* Desktop */}
            <img
              className="mx-auto d-none d-md-block"
              src={url}
              alt="product"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            />
          </>
        ) : (
          <img
            src="https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
            width="100%"
            alt="Product"
            className="rounded-md"
          />
        )}
      </div>

      <div className="p-2">
        <h5 className="name" style={{ fontWeight: "bold" }}>
          {capitalizeFirstLetter(name)}
        </h5>

        {offer ? (
          <>
            <p style={{ fontWeight: "bold" }}>
              {precioConDescuentoAjustado.toFixed(2)} ${" "}
              <small style={{ fontSize: "0.75rem", color: "gray" }}>
                (ajustado)
              </small>
            </p>
            <p
              style={{
                textDecoration: "line-through",
                fontSize: "0.8rem",
                color: "gray",
              }}
            >
              {precioAjustado.toFixed(2)} $
            </p>
            {precioMayorAjustado && (
              <p style={{ fontSize: "0.85rem" }}>
                Mayor: {precioMayorAjustado.toFixed(2)} $
              </p>
            )}
          </>
        ) : (
          <>
            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Detal: {precioAjustado.toFixed(2)} ${" "}
              <small style={{ fontSize: "0.75rem", color: "gray" }}>
                (ajustado)
              </small>
            </p>
            {precioMayorAjustado && (
              <p style={{ fontSize: "0.85rem" }}>
                Mayor: {precioMayorAjustado.toFixed(2)} $
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
