import React from "react";
import MyButton from "./MyButton";
import MyInputs from "./MyInputs";
import MyText from "./MyText";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthState,
  setEmail,
  setLoading,
  setVerificationCode,
} from "../features/auth/AuthSlice";
import {
  confirmSignUp,
  signIn,
  resendSignUpCode,
  getCurrentUser,
} from "aws-amplify/auth";
import { Password } from "@mui/icons-material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { userFromDb } from "../utils/graphqlFunctions";
import { setUser } from "../features/auth/UserSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ConfirmSignUp = () => {
  const {
    email,
    verificationCode,
    password,
    fullName,
    phoneNumber,
    isLoading,
  } = useSelector((state) => state.auth);
  const userstate = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleConfirmSignUp() {
    if (!verificationCode) {
      toast.alert("Por favor inserte un codigo de verificacion");
      return;
    }
    try {
      dispatch(setLoading(true));
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode,
      });

      await signIn({ username: email, password });
      dispatch(setLoading(false));
      dispatch(setAuthState("signed"));
      const attributes = await getCurrentUser();
      const user = {
        id: attributes.userId,
        fullName,
        email: attributes.signInDetails.loginId,
        phoneNumber,
      };

      await userFromDb(user);
      dispatch(setUser(user));
      toast.success(
        <div>
          Inicio de Sesión exitoso
          <br /> {email}
        </div>
      );
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoading(false));

      return;
    }
  }

  async function handleResendVErificationCode() {
    try {
      await resendSignUpCode({ username: email });
      toast.success("se ha reenviado el codigo");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="container" style={styles.container}>
        <div className="mt-5"></div>
        <MyText type="title">Confirmar Registro</MyText>
        <MyInputs
          value={email}
          label={"Email"}
          onChange={(value) => dispatch(setEmail(value))}
        />
        <MyInputs
          label={"Code"}
          onChange={(value) => dispatch(setVerificationCode(value))}
          secureTextEntry
        />
        <MyButton
          title={
            isLoading ? (
              <div className=" d-flex align-items-center">
                <CircularProgress size={"2rem"} />
              </div>
            ) : (
              "Confirmar"
            )
          }
          onPress={handleConfirmSignUp}
        />

        <MyButton
          title={"Reenviar Codigo"}
          // disabled={isLoading}
          onPress={handleResendVErificationCode}
          variant="primary"
        />
        <MyButton
          title={"Atras"}
          // disabled={isLoading}
          onPress={() => {
            dispatch(setAuthState("signUp"));
          }}
          variant="secondary"
        />
      </div>
    </>
  );
};

export default ConfirmSignUp;

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
