import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonBase } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Product from "../Destacados/ProductDestacados";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsBestSellers,
} from "../../utils/graphqlFunctions";
// import Loading from "../../Loading";
// import Message from "../../LoadingError/Error";

const Destacados = () => {
  const { data, isLoading, isError } = useQuery(
    ["ProductsBestSellers"],
    getProductsBestSellers
    // {
    //   onSuccess: () => {
    //     setCategories(dataCategories);
    //   },
    // }
  );

  const productList = data;
  const sliderRef = useRef(null);

  if (isLoading) return null;
  if (isError) return null;

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
          slidesToShow: 6,
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
    ? productList.map((item) => (
        <Link key={item.id} to={`/products/${item.id}`}>
          <Product
            url={item?.photo[0]?.url}
            name={item.name}
            description={item.description}
            price={item.price}
            offer={item.inOffer}
            discountPercentage={item.discountPercentage}
          />
        </Link>
      ))
    : null;

  const FeaturedProducts = () => (
    <div style={{ overflow: "hidden" }}>
      <div
        className={
          window.innerWidth > 1900
            ? " container mx-auto my-4 "
            : " container mx-auto my-4"
        }
        // style={window.innerWidth >= 1900 && { margin: "150px" }}
      >
        <h4 className=" my-2"> Destacados</h4>
        <div
          className=""
          style={{ position: "relative", width: "100%", margin: "auto" }}
        >
          <Slider {...settings} ref={sliderRef}>
            {products}
          </Slider>
          {renderArrows()}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {(window.innerWidth > 1024 && productList.length >= 5) ||
      (window.innerWidth > 800 &&
        window.innerWidth <= 1024 &&
        productList.length >= 4) ||
      (window.innerWidth <= 800 && productList.length >= 3) ? (
        <FeaturedProducts />
      ) : null}
    </>
  );
};

export default Destacados;
