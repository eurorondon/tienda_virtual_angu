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

  const MAX_TITLE_LENGTH = 17;
  const MAX_DESCRIPTION_LENGTH = 40;

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    const lowerCasedStr = str.toLowerCase();
    return lowerCasedStr.charAt(0).toUpperCase() + lowerCasedStr.slice(1);
  };

  const getAjustado = (valor) => ((valor ?? 0) * tasaParalelo) / tasaOficial;

  const precioConDescuento = price - price * (discountPercentage / 100);
  const precioAjustado = getAjustado(price);
  const precioMayorAjustado =
    priceMayor !== 0 && priceMayor !== null ? getAjustado(priceMayor) : null;
  const precioConDescuentoAjustado = getAjustado(precioConDescuento);

  return (
    <div
      className="card text-start"
      style={{ borderRadius: "10px", minHeight: "13rem" }}
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
          <img
            className="mx-auto"
            src={url}
            alt="product"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          />
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
        <h5
          className="name"
          style={{ fontWeight: "bold", fontSize: "0.85rem" }}
        >
          {capitalizeFirstLetter(name)}
        </h5>

        {offer ? (
          <>
            <div className="price d-flex flex-column gap-1">
              <p style={{ fontWeight: "bold" }}>
                {precioConDescuentoAjustado.toFixed(2)} USD{" "}
                <small style={{ fontSize: "0.75rem", color: "gray" }}>
                  (ajustado a oficial)
                </small>
              </p>
              <p
                style={{
                  textDecoration: "line-through",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                {precioAjustado.toFixed(2)} USD
              </p>
            </div>
            {precioMayorAjustado && (
              <p style={{ fontSize: "0.9rem" }}>
                Mayor: {precioMayorAjustado.toFixed(2)} $
              </p>
            )}
          </>
        ) : (
          <>
            <p className="" style={{ fontSize: "0.9rem" }}>
              Detal:{" "}
              <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                {precioAjustado.toFixed(2)} $
              </span>{" "}
              <small style={{ fontSize: "0.75rem", color: "gray" }}>
                (ajustado a oficial)
              </small>
            </p>
            {precioMayorAjustado && (
              <p style={{ fontSize: "0.9rem" }}>
                Mayor: {precioMayorAjustado.toFixed(2)} $
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
