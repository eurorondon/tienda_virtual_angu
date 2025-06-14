import { Colors } from "../../utils/colors";
export default function Product(props) {
  const MAX_TITLE_LENGTH = 17; // El número máximo de caracteres permitidos en el título
  const MAX_DESCRIPTION_LENGTH = 40; // El número máximo de caracteres permitidos en la descripción\

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div
      className="card text-start"
      style={{
        border: "none",
        borderRadius: "0",
        minHeight: "10rem",
        marginLeft: "5px",
      }}
    >
      {props.offer && (
        <div
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            left: "10px",
            top: "10px",
            // zIndex: "10px",
            position: "absolute",
          }}
        >
          <span
            className=""
            style={{ fontSize: "15px" }}
          >{`${props.discountPercentage}%`}</span>
        </div>
      )}
      {/* <div className="mx-auto" style={{ maxWidth: "14rem" }}>
        <img
          className="mx-auto"
          src={props.url}
          alt="product image"
          style={{
            width: "95%",
            height: "150px",
            objectFit: "scale-down",
          }}
        />
      </div> */}
      <div
        className=" d-flex justify-content-center align-items-center  "
        style={{ width: "100%", padding: "5px" }}
      >
        {props.url ? (
          <img
            className="mx-auto"
            src={props.url}
            alt="product "
            style={{
              width: "100%",
              // height: "150px",
              objectFit: "scale-down",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          />
        ) : (
          <img
            src={
              "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
            }
            width={"100%"}
            // height={180}
            alt="Product"
            className="rounded-md"
          />
        )}
      </div>

      <div className="px-2" style={{ backgroundColor: "" }}>
        <h5 className="name" style={{ fontWeight: "bold", color: "" }}>
          {capitalizeFirstLetter(props.name)}
        </h5>
        {/* <div>
          {props.description ? (
            <p className="description">
              {props.description.length > MAX_DESCRIPTION_LENGTH
                ? props.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                : props.description}
            </p>
          ) : (
            <p className="description"> Sin Descripcion</p>
          )}
        </div> */}

        <div
          className="price      "
          style={{
            display: "flex",
            // justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: Colors.Cprimary,
              fontWeight: "bold",
              // fontSize: "14px",
              marginRight: "20px",
            }}
          >
            {props.price - props.price * (props.discountPercentage / 100)}${" "}
          </p>
          <p
            style={{
              textDecoration: "line-through",
              fontSize: "16px",
              color: "gray",
            }}
          >
            {props.price}$
          </p>
        </div>
      </div>
    </div>
  );
}
