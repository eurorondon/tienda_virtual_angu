import React from "react";
import {
  confirmSignUp,
  signIn,
  signUp,
  getCurrentUser,
} from "aws-amplify/auth";
// import amplifyconfig from "./amplifyconfiguration.json";
// import { Amplify } from "aws-amplify";
// Amplify.configure(amplifyconfig);

const AuthContext = React.createContext({
  authState: "signIn",
  setAuthState: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  user: "",
  setUser: () => {},
  verificationCode: "",
  setVerificationCode: () => {},
  isLoading: false,
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleConfirmSignUp: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState("signIn");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const attributes = await getCurrentUser();

        setUser(attributes);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleSignIn() {
    if (!email || !password) {
      alert("Please Enter an Email and Password");
      return;
    }
    try {
      setIsLoading(true);
      const user = await signIn({ username: email, password });

      setIsLoading(false);
      setAuthState("signedIn");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }

  async function handleSingUp() {
    if (!email || !password) {
      alert("Please Enter an Email and Password");
      return;
    }
    try {
      setIsLoading(true);
      const user = await signUp({ username: email, password });
      alert("user sign Up");
      setIsLoading(false);
      setAuthState("confirmSignUp");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }

  async function handleConfirmSingUp() {
    if (!verificationCode) {
      alert("Please Enter an Verification Code");
      return;
    }
    try {
      setIsLoading(true);
      const user = await confirmSignUp(email, verificationCode);
      alert("Confirmed, you can now sign in");
      setIsLoading(false);
      setAuthState("signIn");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        handleSingUp,
        handleConfirmSingUp,
        verificationCode,
        setVerificationCode,
        isLoading,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
