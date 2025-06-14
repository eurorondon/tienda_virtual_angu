import React from "react";
import { useSelector } from "react-redux";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import DefaultAuth from "../components/DefaultAuth";
import Header from "../components/Header";
import ForgotPassword from "../components/ForgotPassword";
import ConfirmForgotPassword from "../components/ConfirmForgotPassword";

function AuthScreen() {
  const { authState } = useSelector((state) => state.auth);

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Header />
      </div>
      <div>
        {authState === "defaultAuth" && <DefaultAuth />}
        {authState === "signIn" && <SignIn />}
        {authState === "signUp" && <SignUp />}
        {authState === "confirmSignUp" && <ConfirmSignUp />}
        {authState === "forgotPassword" && <ForgotPassword />}
        {authState === "confirmForgotPassword" && <ConfirmForgotPassword />}
      </div>
    </>
  );
}

export default AuthScreen;
