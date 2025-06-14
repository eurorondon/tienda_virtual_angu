import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShippingInfo } from "../features/shipping/shippingSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MyButton from "../components/MyButton";
import MyText from "../components/MyText";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !city) {
      // Aunque los campos ya tienen `required`, esto asegura control completo si decides hacer validaciones personalizadas.
      return;
    }

    dispatch(setShippingInfo({ address, city, postalCode, country }));
    navigate("/orderscreen");
  };

  const handlePickup = () => {
    navigate("/orderscreen");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <MyText>DIRECCIÓN DE ENVÍO</MyText>

          <input
            type="text"
            placeholder="Ingresa la dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ingresa la ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Código postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {/* 
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          */}

          {/* Botón de enviar (submit) */}
          <MyButton
            title={"Continuar"}
            type="submit" // 👈 clave para que se active validación
            variant="terciario"
          />

          {/* Botón de omitir (no submit) */}
          <MyButton
            title={"Omitir"}
            variant="primary"
            onClick={handlePickup}
            className="mt-2"
          />
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
