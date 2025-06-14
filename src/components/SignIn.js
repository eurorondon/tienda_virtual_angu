import React from "react";
import MyButton from "./MyButton";
import MyInputs from "./MyInputs";
import MyText from "./MyText";
import { Colors } from "../utils/colors";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthState,
  setEmail,
  setLoading,
  setPassword,
} from "../features/auth/AuthSlice";

import {
  confirmSignUp,
  signIn,
  signUp,
  getCurrentUser,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usa el hook useNavigate

  const { email, password, isLoading } = useSelector((state) => state.auth);

  async function handleSignIn() {
    if (!email || !password) {
      toast.error("Por favor inserta email y contraseña");
      return;
    }
    try {
      dispatch(setLoading(true));
      await signIn({ username: email, password });

      dispatch(setLoading(false));
      dispatch(setAuthState("signedIn"));
      navigate("/");
      toast.success(
        <div>
          Inicio de Sesión exitoso
          <br /> {email}
        </div>
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoading(false));
      console.log(error);
    }
  }

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  return (
    <>
      <div className="container" style={styles.container}>
        <div className="mt-5"></div>
        <MyText type="title" style={{ marginBottom: "20px" }}>
          Iniciar Sesion
        </MyText>
        <MyInputs
          label={"Email"}
          value={email}
          onChange={(value) => dispatch(setEmail(value))}
        />

        <MyInputs
          label={"Password"}
          onChange={(value) => dispatch(setPassword(value))}
          value={password}
          secureTextEntry
        />
        <div style={{ position: "relative" }}>
          <MyText
            onpress={() => dispatch(setAuthState("forgotPassword"))}
            type="button"
            style={{ position: "absolute", right: "5px", top: "-10px" }}
          >
            Olvide la Contraseña
          </MyText>
        </div>

        <div className="mt-4">
          <MyButton
            title={
              isLoading ? (
                <div className=" d-flex align-items-center">
                  <CircularProgress size={"2rem"} />
                </div>
              ) : (
                "Iniciar Sesion"
              )
            }
            disabled={isLoading}
            onPress={handleSignIn}
          />
          <MyButton
            title={"Registrate"}
            disabled={isLoading}
            onPress={() => dispatch(setAuthState("signUp"))}
            variant="secondary"
          />
        </div>
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

export default SignIn;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",

    minHeight: "80vh",
    backgroundColor: "#fff",
    maxWidth: "500px",
  },
};
