import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Product from "../Ofertas/ProductOfertas";

import { Link } from "react-router-dom";
import { getProducts } from "../../../api/productsApi";
import { useQuery } from "@tanstack/react-query";

const Ofertas = () => {
  const { isLoading, data, isError, error } = useQuery(
    ["ofertas"], // Incluir el parámetro 'page' en el array de dependencias de la queryKey
    () => getProducts("/api/products?category=Oferta") // Pasar una función anónima que invoque getProudcts con el parámetro page
  );
  const productList = data?.products;
  const sliderRef = useRef(null);

  if (isLoading) return null;

  // const renderArrows = () => {
  //   return (
  //     <div className="slider-arrow">
  //       <ButtonBase
  //         className="arrow-btn prev bg-black text-white rounded-circle"
  //         onClick={() => sliderRef.current.slickPrev()}
  //       >
  //         <ArrowLeft />
  //       </ButtonBase>
  //       <ButtonBase
  //         className="arrow-btn next bg-black text-white rounded-circle"
  //         onClick={() => sliderRef.current.slickNext()}
  //       >
  //         <ArrowRight />
  //       </ButtonBase>
  //     </div>
  //   );
  // };

  const settings = {
    dots: true,
    arrows: false,
    // infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const products = productList
    ? productList.slice(0, window.innerWidth > 767 ? 30 : 12).map((item) => (
        <Link key={item.id} to={`/products/${item.id}`}>
          <Product
            url={item.photo[0].url}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        </Link>
      ))
    : null;

  return (
    <div className="container mx-auto my-4">
      <h2>Ofertasss</h2>
      <div
        className=""
        style={{ position: "relative", width: "100%", margin: "auto" }}
      >
        <Slider {...settings} ref={sliderRef}>
          {products}
        </Slider>
        {/* {renderArrows()} */}
      </div>

      <style>{`
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          width: 100%;
          left: 0;
          right: 0;
          background-color: black;
        }
        .arrow-btn {
          font-size: 2rem;
          position: absolute;
        }
        .prev {
          left: -50px;
        }
        .next {
          right: -50px;
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

export default Ofertas;
