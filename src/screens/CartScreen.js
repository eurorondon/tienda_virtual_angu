import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../graphql/queries";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";
import { toast } from "react-toastify";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 1;

  const client = generateClient();

  // Calcular el total según qty
  const total = cartItems
    .reduce((a, i) => a + i.qty * (i.qty >= 6 ? i.priceMayor : i.price), 0)
    .toFixed(2);

  // Generar mensaje para WhatsApp
  const productos = cartItems
    .map((item) => {
      const precioUnitario = item.qty >= 6 ? item.priceMayor : item.price;
      return `\n ✅ *${item.name}*\n *Cantidad:* ${item.qty}\n *Precio:* ${precioUnitario}$`;
    })
    .join("\n");

  const mensaje = `👋 Hola Deseo comprar estos artículos: 💭\n${productos}\n\nPara pagar un total de 🔜 *${total}$*`;

  const checkOutHandler = () => {
    if (!user) {
      toast.info("Inicia sesión para finalizar tu compra");
      navigate("/auth");
    } else {
      // navigate("/orderscreen");
      navigate("/envio");
    }
  };

  const { data } = useQuery([`Product ${id}`], async () => {
    try {
      const productsData = await client.graphql({
        query: getProduct,
        variables: { id },
      });
      return productsData;
    } catch (err) {
      console.error("Error fetching product", err.errors);
      throw err;
    }
  });

  console.log("dataaaaaaaaaaaa", data);

  useEffect(() => {
    if (data) {
      dispatch(
        addToCart({
          product: data.data.getProduct.id,
          name: data.data.getProduct.name,
          costo: data.data.getProduct.costo,
          price: data.data.getProduct.price,
          priceMayor: data.data.getProduct.priceMayor,
          countInStock: data.data.getProduct.countInStock,
          qty,
          photo: data.data.getProduct.photo[0].url,
        })
      );
    }
  }, [data]);

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      <div className="container">
        {cartItems.length === 0 ? (
          <div
            className="d-flex align-items-center"
            style={{
              minHeight: "60vh",
              justifyContent: "center",
            }}
          >
            <div className="alert alert-info text-center mt-3">
              Tu carrito está vacío
              <Link className="btn btn-success mx-5 px-5 py-3" to="/">
                Comprar Ahora!
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="alert alert-info text-center mt-3">
              Total de Productos:
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>

            {cartItems.map((item, index) => {
              const precioUnitario =
                item.qty >= 6 ? item.priceMayor : item.price;
              return (
                <div className="cart-iterm row" key={index}>
                  <div
                    onClick={() => removeFromCartHandle(item.product)}
                    className="remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.photo} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4 style={{ textTransform: "uppercase" }}>
                        {item.name}
                      </h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>CANTIDAD</h6>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            product: item.product,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start d-flex flex-column justify-content-center col-sm-7">
                    <h6>PRECIO</h6>
                    <h4>${precioUnitario}</h4>
                  </div>
                </div>
              );
            })}

            <div className="total">
              <span className="sub">Total:</span>
              <span className="total-price">${total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6">
                <button>Agregar más Productos</button>
              </Link>
              <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                <button onClick={checkOutHandler}>Verificar Compra</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
