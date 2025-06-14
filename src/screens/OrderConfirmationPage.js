import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center  bg-light"
        style={{ minHeight: "75vh" }}
      >
        <div className="text-center">
          <h1 className="text-success mb-3">✅ ORDEN CREADA CON ÉXITO</h1>
          <p className="text-muted mb-4">
            Hemos enviado un correo electrónico con los datos de tu orden.
          </p>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
