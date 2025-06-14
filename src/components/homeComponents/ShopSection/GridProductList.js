import React from "react";
import Product from "./ProductGrid";
import { Link, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { listProducts } from "../../../graphql/queries";
import amplifyconfig from "../../../amplifyconfiguration.json";
import { useParams } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Package2Icon as Package2X } from "lucide-react";

Amplify.configure(amplifyconfig);
const client = generateClient();

const GridProductList = () => {
  // const [products, setProducts] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  const navigate = useNavigate();

  const { category, search } = useParams();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    [category ? `infinity-products-${category}` : "infinity-products"],
    async ({ pageParam }) => {
      try {
        // Construimos el filtro combinando todas las condiciones
        const filter = {
          ...(category ? { categories: { contains: category } } : {}),
          ...(search ? { name: { contains: search } } : {}),
          countInStock: { gt: 0 }, // <-- Aquí se aplica el filtro de stock
        };

        const productsData = await client.graphql({
          query: listProducts,
          variables: {
            limit: 6,
            filter,
            nextToken: pageParam,
          },
        });

        return productsData.data.listProducts;
      } catch (err) {
        console.error("Error fetching productos", err.errors || err);
        throw err;
      }
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextToken || null,
    }
  );

  if (isError) {
    console.log(error);
  }

  // const products =
  //   data?.pages.reduce(
  //     (prevProducts, page) => prevProducts.concat(page.items),
  //     []
  //   ) ?? [];

  console.log(data);

  const products =
    data?.pages
      .reduce((prevProducts, page) => prevProducts.concat(page.items), [])
      .filter((product) => product.status !== "Borrador") ?? [];

  const handleNavigate = (id) => {
    window.scroll(0, 0);
    navigate(`/products/${id}`);
  };

  React.useEffect(() => {
    refetch();
  }, [category, refetch, search]);

  if (isLoading)
    return (
      <div style={{ minHeight: "50vh" }}>
        <Loading />
      </div>
    );

  return (
    <div
      className=""
      style={{
        background: "linear-gradient(to bottom, white 0%, #efefef 100px)",
        backgroundSize: "100% 100px", // Aplica el gradiente en los primeros 100px
        backgroundRepeat: "no-repeat", // Evita que el gradiente se repita
      }}
    >
      {category ? (
        <div
          className="  px-4 py-1 mt-2 mb-4 border shadow   bg-white rounded-pill"
          style={{ display: "inline-block" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              // overflow: "hidden",
            }}
          >
            <div className="mr-5" style={{ margin: "0 10px 0 0" }}>
              <FilterAltIcon />
            </div>
            <Link to={"/"}>
              <CancelIcon color="warning" fontSize="small" />
            </Link>
            <span className="" style={{ margin: "5px" }}>
              {category}
            </span>
          </div>
        </div>
      ) : search ? (
        <div className="" style={{ display: "flex", alignItems: "center" }}>
          <span className="" style={{ margin: "20px", fontSize: "10px" }}>
            {/* Resultado de Busqueda : {search} */}
          </span>
          <Link to={"/"}>
            <CancelIcon color="warning" />
          </Link>
        </div>
      ) : (
        <h4
          className="mb-2 p-2"
          style={{
            lineHeight: "1.2",
            fontWeight: "bold",
            fontSize: "1.2rem",
            display: "block",
            margin: 0,
            padding: 0,
          }}
        >
          Todos los Articulos
        </h4>
      )}
      <div className="mb-5">
        {products?.length > 0 ? (
          <InfiniteScroll
            dataLength={products ? products.length : 0}
            hasMore={hasNextPage}
            next={() => fetchNextPage()}
            // loader={
            //   <div className="mx-auto">
            //     <Loading />
            //   </div>
            // }
          >
            <div className=" grid gap-1 mx-auto ">
              {products?.map((product) => (
                <div key={product.id}>
                  <div
                    style={{ cursor: "pointer" }}
                    className=""
                    onClick={() => handleNavigate(product.id)}
                    //  to={`/products/${product.id}`}
                  >
                    <Product
                      url={product?.photo[0]?.url}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      priceMayor={product.priceMayor}
                      offer={product.inOffer}
                      discountPercentage={product.discountPercentage}
                    />
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          // 🚀 Mensaje de "No hay productos disponibles"
          <div
            className="d-flex flex-column justify-content-center align-items-center min-vh-50  p-4 rounded"
            style={{ minHeight: "60vh" }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Package2X
                size={56}
                className=" mb-4 "
                style={{ color: "gray" }}
              />
              <h3 className="font-semibold mb-2 text-secondary">
                No hay productos disponibles
              </h3>
              <p className="text-muted-foreground max-w-md mb-6  text-secondary">
                Lo sentimos, actualmente no hay productos disponibles. Por
                favor, vuelva a consultar más tarde.
              </p>
            </div>
          </div>
        )}
      </div>

      {isFetching && (
        <div style={{ minHeight: "10vh" }}>
          <Loading />
        </div>
      )}
      {isError && (
        <div className="alert alert-danger" role="alert">
          {/* {error.message} */}
          Error de Conexion
        </div>
      )}
    </div>
  );
};

export default GridProductList;
