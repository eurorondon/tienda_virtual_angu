import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./../components/Header";
import MyButton from "../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { singleOrder } from "../utils/graphqlFunctions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { Colors } from "../utils/colors";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const MyOrderScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  window.scrollTo(0, 0);
  const { email, fullName, phoneNumber } = useSelector((state) => state.user);
  const [orderItems, setOrderItems] = React.useState([]);
  const [totalSubtotal, setTotalSubtotal] = React.useState(0);
  const [isPaid, setIsPaid] = React.useState(false);
  const [date, setDate] = React.useState("");

  const user = useSelector((state) => state.user);

  const { data, isLoading } = useQuery(["singleOrder", id], () =>
    singleOrder(id)
  );

  function formatDateToSpanish(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );
    return formattedDate;
  }

  console.log(data);

  React.useEffect(() => {
    setOrderItems(data?.orderItems || []);
    setTotalSubtotal(data?.totalPrice || 0);
    setIsPaid(data?.isPaid || false);
    if (data?.createdAt) {
      const dateFormated = formatDateToSpanish(data.createdAt);
      setDate(dateFormated);
    }
  }, [data]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-4">
          <div className="center mb-2">
            <span>{date}</span>
          </div>
          <div className="row order-detail ">
            <div className="col-lg-4 col-sm-12 mb-0 mb-lg-0 ">
              <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center gap-2">
                <div className="d-flex align-items-center gap-2 ">
                  <span>
                    <strong>N Orden:</strong> {data?.id?.slice(-12)}
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText(data?.id?.slice(-12));
                      toast.info("Número de orden copiado al portapapeles");
                      // alert("¡Número de orden copiado al portapapeles!"); // Alerta simple
                    }}
                    title="Copiar al portapapeles"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row order-products justify-content-between">
            <div className="col-lg-8 ">
              <div>
                {orderItems?.length > 0 ? (
                  orderItems.map((items) => (
                    <div className="order-product row" key={items.id}>
                      <div className="col-md-3 col-4 rounded " style={{}}>
                        <img
                          className=" "
                          src={items.image}
                          alt="product"
                          style={{ borderRadius: "10%" }}
                        />
                      </div>
                      <div className="col-md-5 col-4 d-flex align-items-center">
                        <Link to={`/`}>
                          <h6>{items.name}</h6>
                          <h6> {items.price} $</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-4 col-md-2 d-flex align-items-center flex-column justify-content-center">
                        <h4>Cantidad</h4>
                        <h6>{items.qty}</h6>
                      </div>
                      <div className=" mt-md-0 col-md-2 d-flex align-items-center justify-content-end  gap-1">
                        <h6 style={{ fontWeight: "bold" }}>Sub Total: </h6>
                        <h6> {items.price * items.qty} $</h6>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay artículos en esta orden.</p>
                )}
              </div>
            </div>

            <div className="col-lg-3 d-flex align-items-end flex-column   ">
              <table className="table table-bordered ">
                <tbody>
                  <tr>
                    <td>
                      <strong>Products</strong>
                    </td>
                    <td>{totalSubtotal} $</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Envio</strong>
                    </td>
                    <td>0 $</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IVA</strong>
                    </td>
                    <td>0 $</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>{totalSubtotal} $</td>
                  </tr>
                </tbody>
              </table>

              {!isPaid && (
                <div className="col-12 my-3">
                  {/* <MyButton title={"Pagar con Transferencia"} /> */}
                  <div
                    className="p-2"
                    style={{
                      backgroundColor: Colors.Active,
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    <h5>Pagar con Transferencia </h5>
                  </div>

                  <div
                    className="mt-0 p-3 border rounded"
                    style={{ background: "#f9f9f9" }}
                  >
                    {/* <h5>Datos para Transferencia:</h5> */}
                    <p>
                      <strong>Banco:</strong> Banco Nacional
                    </p>

                    <p>
                      <strong>N de cuenta:</strong> 0102-0123-4567-8901
                    </p>
                    <p>
                      <strong>Titular:</strong> Juan Pérez
                    </p>
                    <p>
                      <strong>Cédula:</strong> V-12.345.678
                    </p>
                    <p>
                      <strong>Monto a transferir:</strong> {totalSubtotal} $
                    </p>
                    <p className="mt-3" style={{ fontSize: "14px" }}>
                      Una vez realizada la transferencia, por favor envía el
                      comprobante por WhatsApp al{" "}
                      <a
                        href="https://wa.me/584140000000"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +58 414-0000000
                      </a>{" "}
                      indicando tu nombre completo y el número de orden.
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span>
                          <strong>N Orden:</strong> {data?.id?.slice(-12)}
                        </span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            navigator.clipboard.writeText(data?.id?.slice(-12));
                            toast.info(
                              "Número de orden copiado al portapapeles"
                            );
                            // alert("¡Número de orden copiado al portapapeles!"); // Alerta simple
                          }}
                          title="Copiar al portapapeles"
                          style={{
                            width: "40px", // Ancho fijo
                            height: "40px", // Alto fijo (cuadrado)
                            padding: "0", // Eliminar el relleno para mantener el tamaño cuadrado
                            display: "flex", // Flexbox para centrar el contenido
                            alignItems: "center", // Centrar el contenido verticalmente
                            justifyContent: "center", // Centrar el contenido horizontalmente
                          }}
                        >
                          <Copy size={20} />{" "}
                          {/* Ajusta el tamaño del icono para que quede centrado */}
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrderScreen;
