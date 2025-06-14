import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./responsive.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import SingleProduct from "./screens/SingleProduct";
import CartScreen from "./screens/CartScreen";
import CategoriesResult from "./screens/CategoriesResult";
import SearchResult from "./screens/SearchResult";
import ModalCategories from "./components/ModalCategories";
import GridCategories from "./components/homeComponents/categorias/GridCategories";
import OfertaScreen from "./screens/OfertaScreen";
import DestacadosScreen from "./screens/DestacadosScreen";
import PerfilScreen from "./screens/PerfilScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ConfirmSignUp from "./components/ConfirmSignUp";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmForgotPassword from "./components/ConfirmForgotPassword";
import DefaultAuth from "./components/DefaultAuth";
import AuthScreen from "./screens/AuthScreen";
import { useEffect } from "react";
import { singleUser } from "./utils/graphqlFunctions";
import { setUser } from "./features/auth/UserSlice";
import { toast } from "react-toastify";
import { Hub } from "aws-amplify/utils";
import OrderScreen from "./screens/OrderScreen";
import MyOrderScreen from "./screens/MyOrderScreen";
import OrderConfirmationPage from "./screens/OrderConfirmationPage";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  const productsState = useSelector((state) => state.products);
  if (productsState.productList.length > 0) {
  }

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.user) {
      (async () => {
        try {
          const userData = await singleUser(user?.user?.userId);
          dispatch(setUser(userData));
        } catch (error) {
          console.error("Error fetching single user:", error);
        }
      })();
    }
  }, [user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:category" element={<CategoriesResult />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/search/:search" element={<SearchResult />} />
        <Route path="/categories" element={<GridCategories />} />
        <Route path="/envio" element={<ShippingScreen />} />
        <Route path="/ofertas" element={<OfertaScreen />} />
        <Route path="/destacados" element={<DestacadosScreen />} />
        <Route path="/orderscreen" element={<OrderScreen />} />
        <Route path="/orderConfirmation" element={<OrderConfirmationPage />} />
        {/* <Route
          path="/orderscreen"
          element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/orderscreen/:id"
          element={
            <ProtectedRoute>
              <MyOrderScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <PerfilScreen />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/defaultauth" element={<DefaultAuth />} /> */}
        <Route path="/auth" element={<AuthScreen />} />
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirmsignup" element={<ConfirmSignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        {/* <Route
          path="/confirmforgotpassword"
          element={<ConfirmForgotPassword />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
