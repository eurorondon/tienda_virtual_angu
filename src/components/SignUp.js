import React, { useState } from "react";
import MyButton from "./MyButton";
import MyInputs from "./MyInputs";
import MyText from "./MyText";
import { Colors } from "../utils/colors";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthState,
  setConfirmPassword,
  setEmail,
  setFullName,
  setLoading,
  setPassword,
  setPhoneNumber,
} from "../features/auth/AuthSlice";
import { signUp } from "aws-amplify/auth";
import Header from "./Header";
import { Margin } from "@mui/icons-material";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    email,
    password,
    isLoading,
    authState,
    confirmPassword,
    fullName,
    phoneNumber,
  } = useSelector((state) => state.auth);

  async function handleSignUp() {
    if (!email || !password) {
      toast.error("Por favor inserte correo y contraseña");
      return;
    }

    if (
      !fullName ||
      fullName.split(" ").length < 2 ||
      fullName.split(" ").some((word) => word.length < 2)
    ) {
      toast.error("Por favor inserte su Nombre Completo");
      return;
    }

    const regex = /^0\d{10}$/;
    if (!phoneNumber || !regex.test(phoneNumber)) {
      toast.error(
        <div>
          Número de teléfono no válido.
          <br />
          Ejemplo 04125243454
        </div>
      );

      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      toast.error(" Las contraseñas no coinciden");
      return;
    }
    try {
      dispatch(setLoading(true));
      await signUp({
        username: email,
        password,
        options: { userAttributes: { name: fullName } },
      });
      toast.success(`Codigo enviado a ${email}`);

      dispatch(setLoading(false));

      dispatch(setAuthState("confirmSignUp"));
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      <div className="container" style={styles.container}>
        <div className="mt-2"></div>
        <MyText type="title">Registrate</MyText>
        <MyInputs
          label={"Email"}
          onChange={(value) => dispatch(setEmail(value))}
          value={email}
        />
        <MyInputs
          label={"Nombre Completo"}
          onChange={(value) => dispatch(setFullName(value))}
        />
        <MyInputs
          label={"Teléfono"}
          onChange={(value) => dispatch(setPhoneNumber(value))}
          placeHolder="04241234563"
        />
        <MyInputs
          label={"Contraseña"}
          onChange={(value) => dispatch(setPassword(value))}
          secureTextEntry
        />
        <MyInputs
          label={"Confirmar Contraseña"}
          onChange={(value) => dispatch(setConfirmPassword(value))}
          secureTextEntry
        />
        <MyButton
          title={
            isLoading ? (
              <div className=" d-flex align-items-center">
                <CircularProgress size={"2rem"} />
              </div>
            ) : (
              "Registrate"
            )
          }
          disabled={isLoading}
          onPress={handleSignUp}
        />
        <MyButton
          title={"Atras"}
          variant={"secondary"}
          onPress={() => {
            dispatch(setAuthState("defaultAuth"));
          }}
          disabled={isLoading}
        />
        {/* <MyText
        type={"button"}
        onPress={() => {
          navigate("/");
        }}
      >
        HOME
      </MyText> */}
      </div>
    </>
  );
};

export default SignUp;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    backgroundColor: "#fff",
    maxWidth: "500px",
  },
};
