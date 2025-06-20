import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationOn } from "@mui/icons-material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import TabMenu from "./TabMenu";
import { Colors } from "../utils/colors";
import SubMenu from "./SubMenu";
import { getAllSettings } from "../utils/graphqlFunctions";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const [searchInput, setSearchInput] = React.useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(cartItems.length);
  const [activeButton, setActiveButton] = useState(0);

  const { data, isLoading: cargando } = useQuery(["Settings"], getAllSettings);

  useEffect(() => {
    if (currentUrl === "/") {
      setActiveButton(0);
    }
    if (currentUrl === "/categories") {
      setActiveButton(1);
    }
    if (currentUrl === "/ofertas") {
      setActiveButton(2);
    }
    if (currentUrl === "/destacados") {
      setActiveButton(3);
    }
    if (currentUrl === "/perfil" || currentUrl === "/auth") {
      setActiveButton(4);
    }
  }, [currentUrl]);

  React.useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scroll(0, 0);
    if (searchInput) {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  };

  console.log(data);

  return (
    <>
      <div>
        {/* Top Header */}
        <div className=" " style={{ backgroundColor: Colors.Cprimary }}>
          <div className="container">
            <div className="row">
              {window.innerWidth < 768 ? (
                <p
                  className="text-white text-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  <LocationOn style={{ fontSize: "0.9rem" }} />
                  Avenida Andrés Galarraga - Chacao, Caracas.
                </p>
              ) : (
                <p
                  className="text-white text-center"
                  style={{ fontSize: "1rem" }}
                >
                  <LocationOn />
                  Avenida Andrés Galarraga - Chacao, Caracas.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Header */}
        <div
          className="header"
          style={{
            backgroundColor: Colors.Csecondary,
          }}
        >
          <div className="container">
            {/* MOBILE HEADER */}
            <div className="mobile-header">
              <div className="">
                <div className=" row   ">
                  <div className="col-2  d-flex justify-content-center align-items-center ">
                    <Link className=" " to="/">
                      <div
                        className="bg-white rounded-circle p-1 "
                        style={{
                          minHeight: "50px",
                          minWidth: "50px",
                          overflow: "hidden",
                        }}
                      >
                        {Array.isArray(data) &&
                          data.length > 0 &&
                          data[0]?.storeName && (
                            <img
                              alt="logo"
                              src={
                                Array.isArray(data) &&
                                data.length > 0 &&
                                data[0]?.storeName
                                  ? data[0].logoImage[0].url
                                  : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                              }
                              className="img-fluid"
                            />
                          )}
                      </div>
                    </Link>
                  </div>
                  <div className="col-9 d-flex mt-2">
                    <form className="input-group" onSubmit={handleSubmit}>
                      <input
                        type="search"
                        className="form-control rounded-left search"
                        placeholder="Buscar..."
                        onChange={(e) =>
                          setSearchInput(e.target.value.toLowerCase())
                        }
                        style={{
                          borderTopLeftRadius: "50px",
                          borderBottomLeftRadius: "50px",
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      />
                      <button type="submit" className="search-button">
                        <SearchIcon />
                      </button>
                    </form>
                  </div>
                  <div className="col-1   d-flex align-items-center justify-content-center  Login-Register">
                    <Link to="/cart" className="cart-mobile-icon ">
                      <i
                        className="fas fa-shopping-bag me-3"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      {cartCount > 0 && (
                        <div
                          className="badge d-flex justify-center align-items-center"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <span className="mx-auto">{cartCount}</span>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* PC HEADER */}
            <div className="pc-header py-2">
              <div className="row">
                <div className="col-md-2 col-4 d-flex align-items-center ">
                  <Link className="navbar-brand" to="/">
                    <div className="rounded rounded-circle">
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data[0]?.storeName && (
                          <img
                            alt="logos"
                            src={
                              Array.isArray(data) &&
                              data.length > 0 &&
                              data[0]?.storeName
                                ? data[0].logoImage[0].url
                                : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                            }
                            className="rounded-circle"
                            style={{ maxWidth: "10rem" }}
                          />
                        )}
                    </div>
                  </Link>
                </div>
                <div
                  className="col-md-8 col-8 d-flex align-items-center justify-content-center "
                  style={{}}
                >
                  <form className="input-group " onSubmit={handleSubmit}>
                    <input
                      type="search"
                      className="form-control rounded-left search"
                      placeholder="Buscar..."
                      onChange={(e) =>
                        setSearchInput(e.target.value.toLowerCase())
                      }
                      style={{
                        borderTopLeftRadius: "50px",
                        borderBottomLeftRadius: "50px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    />

                    <button type="search" className="search-button">
                      <SearchIcon />
                    </button>
                  </form>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-end Login-Register ">
                  <Link to="/cart">
                    <i
                      className="fas fa-shopping-bag me-3 "
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <span className="badge">{cartCount}</span>
                  </Link>
                  {/* <a
                    href="https://larahogar-dashboard.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fas fa-user me-3"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SubMenu /> */}
      <TabMenu activeButton={activeButton} />
    </>
  );
};

export default Header;
