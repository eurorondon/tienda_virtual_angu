import React, { useEffect, useRef, useState } from "react";
import Header from "./../components/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { getProduct } from "../graphql/queries";
import amplifyconfig from "../amplifyconfiguration.json";
import Slider from "react-slick";
import { ButtonBase, CircularProgress } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Message from "../components/Message";
import Rating from "../components/Rating";
import {
  crearReviewYActualizarProducto,
  getReviews,
  newReview,
} from "../utils/graphqlFunctions";
import { toast } from "react-toastify";

const settings = {
  dots: true,
  arrows: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 4000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SingleProduct = ({ match }) => {
  const { id } = useParams();
  const sliderRef = useRef(null);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = React.useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  Amplify.configure(amplifyconfig);
  const client = generateClient();

  async function obtenerUsuarioActual() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUserId(userId);
      setNombreUsuario(username);
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
    }
  }

  useEffect(() => {
    obtenerUsuarioActual();
  }, []);

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      setShowReviewForm(true);
    }
  }, [userState]);

  const renderArrows = () => {
    return (
      <div className="slider-arrow">
        <ButtonBase
          className="arrow-btn prev bg-black text-white rounded-circle"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <ArrowLeft />
        </ButtonBase>
        <ButtonBase
          className="arrow-btn next bg-black text-white rounded-circle"
          onClick={() => sliderRef.current.slickNext()}
        >
          <ArrowRight />
        </ButtonBase>
      </div>
    );
  };

  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    [`Product ${id}`],
    async () => {
      try {
        const productsData = await client.graphql({
          query: getProduct,
          variables: {
            id,
          },
        });

        return productsData;
      } catch (err) {
        console.error("Single Product", err.errors);
        throw err;
      }
    }
  );

  useEffect(() => {
    setProduct(data?.data?.getProduct);
  }, [data]);

  const {
    data: dataReview,
    isLoading: isLoadingReview,
    isFetching: isFetchingReview,
    isError: isErrorReview,
    refetch: refetchReview,
  } = useQuery({
    queryKey: ["reviews", product?.id],
    queryFn: () => getReviews(product?.id),
    enabled: !!product?.id,
  });

  const yaCalifico = dataReview?.some((review) => review.user === userId);
  console.log(yaCalifico);

  const {
    mutate,
    error,
    isSuccess,
    isLoading: isLoadingNewReview,
  } = useMutation({
    mutationFn: crearReviewYActualizarProducto,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", product.id]);
      queryClient.invalidateQueries([`Product ${product.id}`]);
      toast.success("Resaña publicada con exito");
      // Aquí podrías limpiar el formulario, recargar reviews, etc.
    },
    onError: (err) => {
      console.error("Error al enviar review:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment) return;

    mutate({
      name: userState.fullName,
      rating: parseFloat(rating),
      comment,
      user: userId,
      productID: product.id,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!rating || !comment) {
  //     // Puedes mostrar un mensaje de error si lo deseas
  //     return;
  //   }

  //   console.log("nombre", nombreUsuario);

  //   mutate({
  //     name: userState.fullName, // Asegúrate de obtener el nombre del usuario actual
  //     rating: parseFloat(rating),
  //     comment,
  //     user: userId, // Asegúrate de obtener el ID del usuario actual
  //     productID: product.id,
  //   });
  // };

  const handleQtyChange = (event) => {
    const newQty = parseInt(event.target.value, 10); // Obtener el nuevo valor seleccionado como un entero
    setQty(newQty); // Actualizar el estado qty
  };

  // enviamos los datos extraídos de la API a REDUX
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setProductDetails(data));
  //   }
  // }, [data, dispatch]);

  //usamos los datos del estado de redux
  // const { setProductDetails } = useSelector((state) => state.products);

  const AddToCartHandle = (e) => {
    e.preventDefault();

    navigate(`/cart/${id}?qty=${qty}`);
  };

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <Loading />
        </div>
      </div>
    );

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="pb-5 pb-md-0" style={{ background: "white" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Header />
      </div>
      {window.innerWidth < 576 ? (
        <div className="" style={{ overflowX: "hidden" }}>
          <div className="">
            <div className="">
              <div className="">
                <div
                  className=""
                  style={{
                    width: window.innerWidth >= 1024 ? "30vw" : "100%",
                    position: "relative",
                    borderRadius: "3%",
                    // padding: "10px",
                    // backgroundColor: "rgba(199, 255, 51, 0.2)",
                    // backgroundColor: "#f2f2f2",
                    boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Slider {...settings} ref={sliderRef}>
                    {product?.photo?.map((image) => (
                      <div className="">
                        <img
                          src={image.url}
                          alt={product?.name}
                          // style={{
                          //   width: "100%",

                          //   // height: "60vh",
                          //   borderRadius: "2%",
                          // }}
                          style={{
                            width: "100%",
                            height: "100%", // Fijar altura para uniformidad
                            objectFit: "cover", // Recorta la imagen para llenar el contenedor sin distorsión
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                  {window.innerWidth >= 1024 &&
                    // 1024
                    product?.photo?.length > 1 &&
                    renderArrows()}
                  {/* <img
                src={product?.photo?.[0]?.url}
                alt={product?.name}
                style={{ width: "100%", borderRadius: "4%" }}
              /> */}
                </div>
              </div>
              <div className="container col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div
                      className="product-name mt-5"
                      style={{ textTransform: "uppercase" }}
                    >
                      {product?.name}
                    </div>
                  </div>
                  <p>{product?.description}</p>

                  <div className="product-count col-lg-9   border rounded p-3 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio al Detal</h6>
                      <span>${product?.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio al Mayor</h6>
                      <span>${product?.priceMayor}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Estado</h6>
                      {product?.countInStock > 0 ? (
                        <span>Disponible</span>
                      ) : (
                        <span>No Disponible</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reseñas</h6>
                      <Rating
                        value={product?.rating}
                        text={`${product?.numReviews || 0} reseñas`}
                      />
                    </div>
                    {product?.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>
                            Cantidad{" "}
                            <span
                              className="text-secondary"
                              style={{ fontSize: "0.8rem" }}
                            >
                              ({product.countInStock} Disp.)
                            </span>
                          </h6>
                          <select value={qty} onChange={handleQtyChange}>
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Añadir al Carrito
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">RESEÑAS</h6>

                {dataReview && dataReview.length > 0 ? (
                  dataReview.map((review) => (
                    <div
                      key={review.id}
                      className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                    >
                      <strong>{review.name || "Usuario anónimo"}</strong>
                      <span className="ms-2">
                        {new Date(review.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <div className="alert alert-info mt-3">
                        {review.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-info"}>
                      No hay reseñas aún.
                    </Message>
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <h6>ESCRIBIR UNA RESEÑA</h6>
                <div className="my-4"></div>
                {!userId ? (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Por favor,{" "}
                      <Link to="/auth">
                        <strong>Inicia sesión</strong>
                      </Link>{" "}
                      para escribir una reseña
                    </Message>
                  </div>
                ) : yaCalifico ? (
                  <div className="my-3">
                    <Message variant="alert-warning">
                      Ya has calificado este producto. ¡Gracias por tu opinión!
                    </Message>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <strong>Calificación</strong>
                      <select
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Muy mala</option>
                        <option value="2">2 - Mala</option>
                        <option value="3">3 - Buena</option>
                        <option value="4">4 - Muy buena</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comentario</strong>
                      <textarea
                        rows="3"
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        type="submit"
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                        disabled={isLoadingNewReview}
                      >
                        {isLoadingNewReview ? (
                          <CircularProgress size={25} />
                        ) : (
                          "ENVIAR"
                        )}
                      </button>
                    </div>
                    {isError && (
                      <div className="alert alert-danger">
                        Error: {error.message}
                      </div>
                    )}
                    {isSuccess && (
                      <div className="alert alert-success">
                        ¡Reseña enviada con éxito!
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="container-md ">
            <div className="row">
              <div className="col-md-6  ">
                <div
                  className=""
                  style={{
                    width: window.innerWidth >= 1024 ? "30vw" : "100%",
                    position: "relative",
                    borderRadius: "3%",
                    // padding: "10px",
                    // backgroundColor: "rgba(199, 255, 51, 0.2)",
                    // backgroundColor: "#f2f2f2",
                    boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Slider {...settings} ref={sliderRef}>
                    {product?.photo?.map((image) => (
                      <div className="">
                        <img
                          src={image.url}
                          alt={product?.name}
                          // style={{
                          //   width: "100%",

                          //   // height: "60vh",
                          //   borderRadius: "2%",
                          // }}
                          style={{
                            width: "100%",
                            height: "100%", // Fijar altura para uniformidad
                            objectFit: "cover", // Recorta la imagen para llenar el contenedor sin distorsión
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                  {window.innerWidth >= 1 &&
                    product?.photo?.length > 1 &&
                    renderArrows()}
                  {/* <img
                src={product?.photo?.[0]?.url}
                alt={product?.name}
                style={{ width: "100%", borderRadius: "4%" }}
              /> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div
                      className="product-name mt-5"
                      style={{ textTransform: "uppercase" }}
                    >
                      {product?.name}
                    </div>
                  </div>
                  <p>{product?.description}</p>

                  <div className="product-count col-lg-9   border rounded p-3 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio al Detal</h6>
                      <span>${product?.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio al Mayor</h6>
                      <span>${product?.priceMayor}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Estado</h6>
                      {product?.countInStock > 0 ? (
                        <span>Disponible</span>
                      ) : (
                        <span>No Disponible</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>RESEÑAS</h6>
                      <Rating
                        value={product?.rating || 0}
                        text={`${product?.numReviews || 0} reseñas`}
                      />
                    </div>
                    {product?.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>
                            Cantidad{" "}
                            <span
                              className="text-secondary"
                              style={{ fontSize: "0.8rem" }}
                            >
                              ({product.countInStock} Disp.)
                            </span>
                          </h6>
                          <select value={qty} onChange={handleQtyChange}>
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Añadir al Carrito
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">RESEÑAS</h6>

                {dataReview && dataReview.length > 0 ? (
                  dataReview.map((review) => (
                    <div
                      key={review.id}
                      className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                    >
                      <strong>{review.name || "Usuario anónimo"}</strong>
                      <span className="ms-2">
                        {new Date(review.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <div className="alert alert-info mt-3">
                        {review.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-info"}>
                      No hay reseñas aún.
                    </Message>
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <h6>ESCRIBIR UNA RESEÑA</h6>

                <div className="my-4"></div>

                {!userId ? (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Por favor,{" "}
                      <Link to="/auth">
                        <strong>Inicia sesión</strong>
                      </Link>{" "}
                      para escribir una reseña
                    </Message>
                  </div>
                ) : yaCalifico ? (
                  <div className="my-3">
                    <Message variant="alert-warning">
                      Ya has calificado este producto. ¡Gracias por tu opinión!
                    </Message>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <strong>Calificación</strong>
                      <select
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Muy mala</option>
                        <option value="2">2 - Mala</option>
                        <option value="3">3 - Buena</option>
                        <option value="4">4 - Muy buena</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comentario</strong>
                      <textarea
                        rows="3"
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        type="submit"
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                        disabled={isLoading}
                      >
                        {isLoadingNewReview ? (
                          <CircularProgress size={20} />
                        ) : (
                          "ENVIAR"
                        )}
                      </button>
                    </div>
                    {isError && (
                      <div className="alert alert-danger">
                        Error: {error.message}
                      </div>
                    )}
                    {isSuccess && (
                      <div className="alert alert-success">
                        ¡Reseña enviada con éxito!
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* <button onClick={handleGoBack}>Volver</button> */}

      <style>{`
  .slider-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 100%;
    pointer-events: none;
  }

  .arrow-btn {
    font-size: 2rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    z-index: 11;
  }

  .prev {
    left: -50px;
  }

  .next {
    right: -50px;
  }

  /* Media query para pantallas menores a 576px */
  @media (max-width: 576px) {

    .slider-arrow {

    top: 85%;
   
  }
    .arrow-btn {
      background-color: rgba(255, 255, 255, 0.7);
      background-color: red;
      padding: 0.5rem;
      border: none;
      cursor: pointer;
      color: yellow;
    }

    .prev {
      left: 1rem;
    }

    .next {
      right: 1rem;
    }
  }

  .slick-dots li {
    margin: 0;
    width: 15px;
    height: 15px;
  }

  .slick-active {
    margin: 0;
  }
`}</style>
    </div>
  );
};

export default SingleProduct;
