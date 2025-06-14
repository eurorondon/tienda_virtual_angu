import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonBase } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Product from "../NewProducts/Product";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listProducts } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

const Filter = ({ name, bgColor }) => {
  const navigate = useNavigate();
  const handleCategories = (name) => {
    window.scroll(0, 0);
    navigate(`/categories/${name}`);
    // alert("categories scroll 0,0");
  };

  const client = generateClient();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
  } = useQuery(
    [name],
    async () => {
      try {
        const productsData = await client.graphql({
          query: listProducts,
          variables: {
            limit: 200,
            filter: { categories: { contains: name } },
            // nextToken: pageParam,
          },
        });

        return productsData.data.listProducts;
      } catch (err) {
        console.error("Error fetching todos", err.errors);
        throw err;
      }
    },
    {
      // refetchOnMount: false,
      // refetchInterval: false,
      // refetchOnWindowFocus: false,
      // refetchIntervalInBackground: false,

      getNextPageParam: (lastPage) => {
        return lastPage.nextToken || null;
      },
    }
  );

  const productList = data?.items?.filter(
    (product) => product.status !== "Borrador"
  );

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
          slidesToShow: 5,
          slidesToScroll: 5,
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
    ? productList?.slice(0, window.innerWidth > 767 ? 30 : 12).map((item) => (
        <Link key={item.id} to={`/products/${item.id}`}>
          <Product
            url={item?.photo[0]?.url}
            name={item.name}
            description={item.description}
            price={item.price}
            priceMayor={item.priceMayor}
          />
        </Link>
      ))
    : null;

  const FeaturedProducts = () => (
    <div
      className="my-2"
      style={{ overflow: "hidden", backgroundColor: bgColor }}
    >
      <div
        className="container  mb-2  pb-4"
        // style={{ backgroundColor: Colors.Ctercer }}
      >
        <div
          className="position-relative"
          // style={{ background: "linear-gradient(to bottom, white, #efefef)" }}
        >
          <div className=" justify-content-between ">
            <div className=" p-2  ">
              <div className="d-flex justify-content-between">
                <span
                  className=""
                  style={{
                    lineHeight: "1.2",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    display: "block",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {name}
                </span>
                <div
                  className="border border-danger position-absolute  rounded-pill px-2 "
                  onClick={() => handleCategories(name)}
                  style={{
                    right: "10px",
                    fontSize: "0.9rem",
                    borderBottom: "1px solid #f42a54",
                    color: "#f42a54",
                  }}
                >
                  <span>Ver mas aqui</span>
                </div>
              </div>

              <span
                style={{
                  lineHeight: "1.2",
                  fontSize: "0.9rem",
                  fontWeight: "lighter",
                  display: "block",
                  margin: 0,
                  padding: 0,
                }}
              >
                Compra al mayor a partir de 6 piezas
              </span>
            </div>

            {/* <button>hola</button> */}
          </div>

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
    </>
  );
};

export default Filter;
