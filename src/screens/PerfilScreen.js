import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthState,
  setEmail,
  setPassword,
  setUser,
} from "../features/auth/AuthSlice";
import Splash from "./Splash";
import { resetUser } from "../features/auth/UserSlice";
import ProfileTabs from "../components/ProfileTabs";
import Orders from "../components/Orders";
import { getOrders } from "../utils/graphqlFunctions";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

function PerfilScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userState = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [usuario, setUsuario] = React.useState(null);
  const [orders, setOrders] = React.useState([]);
  const [showOrders, setShowOrders] = React.useState(true);
  const [fechaRegistroUsuario, setFechaRegistroUsuario] = React.useState(null);

  React.useEffect(() => {
    if (user && user?.signInDetails.loginId) {
      setUsuario(user?.signInDetails.loginId);
    }
  }, [user]);

  function formatDateToSpanish(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );
    return formattedDate;
  }

  React.useEffect(() => {
    if (userState.createdAt) {
      const formattedDate = formatDateToSpanish(userState.createdAt);
      setFechaRegistroUsuario(formattedDate);
    }
  }, [userState.createdAt]);

  const {
    data,
    error,
    isLoading: isLoadingOrders,
  } = useQuery(["getOrder", userState.id], () => getOrders(userState.id), {
    // onError: (error) => {
    //   console.error("Error fetching orders:", error);
    // },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchInterval: false,
    // refetchIntervalInBackground: false,
  });
  React.useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  // React.useEffect(() => {
  //   if (orders.length > 0) {
  //     console.log("Orders:", orders);
  //   }
  // }, [orders]);

  async function handleSignOut() {
    try {
      await signOut();
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setUser(null));
      dispatch(setAuthState("defaultAuth"));
      dispatch(resetUser());
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  if (isLoading)
    return <Splash setUser={setUser} setIsLoading={setIsLoading} />;

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Header />
      </div>
      {isLoadingOrders ? (
        <Loading />
      ) : (
        <div
          className="container mt-lg-5 mt-3"
          style={{ position: "relative" }}
        >
          <div className="row align-items-start">
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <img src="./images/user.png" alt="userprofileimage" />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{userState.fullName}</strong>
                    </h5>
                    <span className="author-card-position">
                      Ingreso {fechaRegistroUsuario}
                    </span>
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className={
                        showOrders
                          ? "nav-link d-flex justify-content-between active"
                          : "nav-link d-flex justify-content-between "
                      }
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                      onClick={() => setShowOrders(true)}
                    >
                      Lista de Ordenes
                      {orders.length > 0 && (
                        <div className="badge2">
                          <span>{orders.length}</span>
                        </div>
                      )}
                    </button>
                    <button
                      className={showOrders ? "nav-link" : "nav-link active"}
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                      onClick={() => setShowOrders(false)}
                    >
                      Configuracion
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div
              className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                {showOrders ? (
                  <Orders orders={orders} isLoadingOrders={isLoadingOrders} />
                ) : (
                  <ProfileTabs />
                )}
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "10px", right: "25px" }}>
            <div className="d-flex flex-column">
              <LogoutIcon fontSize="large" onClick={handleSignOut} />

              <span>Salir</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilScreen;
