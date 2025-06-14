import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import MyButton from "../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { newOrder } from "../utils/graphqlFunctions";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
// import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newOrderId, setnewOrderId] = useState("");
  window.scrollTo(0, 0);
  const { email, fullName, id, phoneNumber } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const shipping = useSelector((state) => state.shipping);

  const { cartItems } = useSelector((state) => state.cart);

  // Calcula el total de los subtotales
  // const totalSubtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );

  const totalSubtotal = cartItems.reduce((acc, item) => {
    const precio = item.qty >= 6 ? item.priceMayor : item.price;
    return acc + precio * item.qty;
  }, 0);

  // function mapOrderItems(orderItems) {
  //   return orderItems.map((item) => ({
  //     name: item.name,
  //     qty: item.qty,
  //     image: item.photo,
  //     price: item.price,
  //     priceMayor: item.priceMayor,
  //     id: item.product,
  //   }));
  // }

  function mapOrderItems(orderItems) {
    return orderItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.photo,
      price: item.qty >= 6 ? item.priceMayor : item.price,
      costo: item.costo,
      id: item.product,
    }));
  }
  console.log("cartItems", cartItems);
  const res = mapOrderItems(cartItems);

  const orderData = {
    user,
    orderItems: mapOrderItems(cartItems), // Mapea los elementos del carrito al formato requerido por el pedido GraphQL
    isPaid: false,
    totalPrice: totalSubtotal,
    shippingAddress: shipping ? shipping : {},
  };

  console.log("this is orderData", orderData);

  const productos = cartItems
    .map(
      (item) =>
        ` \n ✅ *${item.name}*   \n *Cantidad*: ${item.qty} \n *Precio*:${item.price}$ \n`
    )
    .join("");

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("No hay Items en el carrito");
      return;
    }

    try {
      const telefono = "+584245116397"; // Cambia a número dinámico si es necesario

      // Crear un mensaje legible para WhatsApp
      const mensaje =
        `👋🏼Hola, quiero hacer un pedido con los siguientes datos:📝\n\n` +
        `🛒 Productos:\n` +
        orderData.orderItems
          .map(
            (item, index) =>
              `☑${index + 1}. ${item.name} - Cantidad: ${item.qty} `
          )
          .join("\n");

      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(
        mensaje
      )}`;

      // Lógica adicional para crear la orden
      let OrderId;
      try {
        const response = await newOrder(orderData);
        OrderId = response.data.createOrder.id;
        console.log("respuesta de newOrder", response);
        setnewOrderId(response.data.createOrder.id);
      } catch (err) {
        console.error("hubo un error al crear la orden", err);
      }

      // Obtener el nombre del usuario y total
      const name = user.fullName;
      const telefonoUsuario = "04245116397"; // Aquí puedes usar un teléfono dinámico
      const productos = orderData.orderItems
        .map(
          (item, index) =>
            `☑${index + 1}. ${item.name} - Cantidad: ${item.qty} `
        )
        .join("\n");
      const totalSubtotal = orderData.totalPrice; // Suponiendo que 'subtotal' es el total de la compra

      // Crear el mensaje del correo
      const mensajeCorreo = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f7fc; /* Color de fondo suave */
              text-align: center;
              padding: 40px;
            }
            .container {
              background-color: #ffffff; /* Fondo blanco para la orden */
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
              width: 90%;
              margin: 0 auto;
              text-align: left;
            }
            h1 {
              color: #333333;
            }
            h2 {
              color: #555555;
            }
            .details {
              margin-bottom: 20px;
            }
            .items {
              margin-top: 10px;
              margin-bottom: 20px;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              color: #00A859;
            }
            .signature {
              margin-top: 40px;
              font-style: italic;
              color: #555555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🛒 Orden de Compra - Detalles 🛒</h1>
            <p>👋 <strong>Hola</strong>, mi nombre es <strong>${name}</strong> y mi correo es <strong>${email}</strong>.</p>
            <div class="details">
              <h2>🆔 ID de la Orden:</h2>
              <p style="font-size: 18px; font-weight: bold; color: #1a73e8;">
                ${OrderId}
              </p>
              <p style="font-size: 14px; color: #666;">
                (Puedes copiar este código para futuras referencias)
              </p>
            </div>
            <div class="details">
              <h2>📋 Artículos solicitados:</h2>
              <div class="items">
                ${productos} 
              </div>
            </div>
    
            <div class="details">
              <h2>💰 Total de la compra:</h2>
              <p class="total">${totalSubtotal}$</p>
            </div>
    
            <div class="details">
              <h2>📱 Número de teléfono:</h2>
              <p>${user.phoneNumber}</p>
            </div>
    
            <div class="signature">
              <p>Gracias por tu atención. Espero tu confirmación y el siguiente paso en el proceso de compra.</p>
              <p>Saludos cordiales,</p>
              <p><strong>${name}</strong></p>
            </div>
          </div>
        </body>
      </html>
    `;

      // Función para enviar el correo
      const sendEmailAdmin = async () => {
        setLoading(true);
        setMessage(""); // Limpiar mensaje previo

        // Datos que se enviarán en la solicitud
        const requestData = {
          subject: "Nuevo Pedido Realizado",
          message: mensajeCorreo,
          email: ["eurorondon03@gmail.com"], // Puede ser una lista de correos
          fromAddress: "no-reply@graficascaracas.com",
          pdf: "", // Base64 del PDF (opcional)
        };

        try {
          // Realizar la solicitud POST
          const response = await fetch(
            "https://vb8oil9qle.execute-api.us-east-1.amazonaws.com/send",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            }
          );

          const result = await response.json();

          if (response.ok) {
            setMessage("Correo enviado exitosamente.");
            toast.success("Orden de compra creada con éxito");
          } else {
            setMessage(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error("Detalles del error:", error); // Imprime detalles del error en la consola
          setMessage(`Error en la conexión: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };

      // Función para enviar el correo
      const sendEmailClient = async () => {
        setLoading(true);
        setMessage(""); // Limpiar mensaje previo

        // Datos que se enviarán en la solicitud
        const requestData = {
          subject: "Aqui esta tu Pedido Cliente",
          message: mensajeCorreo,
          email: [email], // Puede ser una lista de correos
          fromAddress: "eurorondon03@gmail.com",
          pdf: "", // Base64 del PDF (opcional)
        };

        try {
          // Realizar la solicitud POST
          const response = await fetch(
            "https://vb8oil9qle.execute-api.us-east-1.amazonaws.com/send",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            }
          );

          const result = await response.json();

          if (response.ok) {
            setMessage("Correo enviado exitosamente.");
          } else {
            setMessage(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error("Detalles del error:", error); // Imprime detalles del error en la consola
          setMessage(`Error en la conexión: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };

      navigate(`/orderscreen/${OrderId}`);

      await sendEmailAdmin(); // Enviar correo después de crear la orden
      await sendEmailClient();

      // navigate("/orderConfirmation");

      dispatch(clearCart());
    } catch (error) {
      console.error("Error al enviar la orden a WhatsApp:", error);
      toast.error("Hubo un problema al procesar la orden.");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div style={{ minHeight: "50vh" }}>
          <Loading />
        </div>
      </>
    );

  return (
    <>
      <Header />

      <div className="container mt-5">
        {/* <div className="row order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4  mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <span>
                  {"Cliente:"} {email}
                </span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row order-products justify-content-between">
          <div className="col-lg-8 ">
            <div>
              {cartItems?.length > 0 ? (
                cartItems.map((items) => (
                  <div className="order-product row" key={items.id}>
                    <div className="col-md-3 col-4 rounded " style={{}}>
                      <img
                        className=" "
                        src={items.photo}
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
                    <div className="mt-md-0 col-md-2 d-flex align-items-center justify-content-end gap-1">
                      <h6 style={{ fontWeight: "bold" }}>Sub Total: </h6>
                      <h6>
                        {(
                          (items.qty >= 6 ? items.priceMayor : items.price) *
                          items.qty
                        ).toFixed(2)}{" "}
                        $
                      </h6>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay artículos en esta orden.</p>
              )}
            </div>
          </div>

          <div className="col-lg-3 d-flex align-items-end flex-column  subtotal-order">
            <table className="table table-bordered">
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

            <MyButton
              variant="Green"
              title={"Realizar orden de compra"}
              onPress={handleCreateOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
