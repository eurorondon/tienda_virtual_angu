import React from "react";
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
  setLoading,
  setPassword,
  setVerificationCode,
} from "../features/auth/AuthSlice";
import { confirmResetPassword, signUp } from "aws-amplify/auth";
import Header from "./Header";
import { Margin } from "@mui/icons-material";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ConfirmForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    email,
    password,
    confirmPassword,
    isLoading,
    verificationCode,
    authState,
  } = useSelector((state) => state.auth);

  async function handleConfirmForgotPassword() {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Por favor inserte un codigo de verificacion valido");
      return;
    }
    if (!password) {
      toast.error("Por favor inserta contraseña");
      return;
    }
    if (!confirmPassword) {
      toast.error("Por favor confirma contraseña");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      dispatch(setLoading(true));
      await confirmResetPassword({
        username: email,
        confirmationCode: verificationCode,
        newPassword: password,
      });
      dispatch(setLoading(false));
      toast.success("Cambio de contraseña exitoso");
      dispatch(setAuthState("signIn"));
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoading(false));
      console.log(error);
    }
  }

  return (
    <>
      <div className="container" style={styles.container}>
        <div className="mt-2"></div>
        <MyText type="title">Cambio de Contraseña</MyText>
        <MyInputs
          label={"Codigo de Verificacion"}
          onChange={(value) => dispatch(setVerificationCode(value))}
        />

        <MyInputs
          label={"Nueva Contraseña"}
          onChange={(value) => dispatch(setPassword(value))}
          secureTextEntry
        />
        <MyInputs
          label={"Confirmar Nueva Contraseña"}
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
              "Reset Contraseña"
            )
          }
          onPress={handleConfirmForgotPassword}
        />
        <MyButton
          title={"Volver a Iniciar Sesion"}
          variant={"secondary"}
          onPress={() => dispatch(setAuthState("signIn"))}
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

export default ConfirmForgotPassword;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",

    // justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#fff",
  },
};
