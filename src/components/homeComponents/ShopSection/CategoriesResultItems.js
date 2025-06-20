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
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../features/categories/categorySlice";
import { useParams } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AlertCircle } from "lucide-react";

Amplify.configure(amplifyconfig);
const client = generateClient();

const CategoriesResultItemes = () => {
  // const [products, setProducts] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  const navigate = useNavigate();

  const { category, search } = useParams();

  // const { data, isLoading, hasNextPage, fetchNextPage, refetch, isFetching } =
  //   useInfiniteQuery(
  //     [category ? `infinity-products-${category}` : "infinity-products"],
  //     async ({ pageParam }) => {
  //       try {
  //         // const filter = {
  //         //   ...(category ? { categories: { contains: category } } : {}),
  //         //   // ...(search !== "" ? { name: { contains: search } } : {}),
  //         // };

  //         let filter;
  //         if (category) {
  //           filter = { categories: { contains: category } };
  //         }

  //         if (search) {
  //           filter = { name: { contains: search } };
  //         }

  //         const productsData = await client.graphql({
  //           query: listProducts,
  //           variables: {
  //             limit: 200,
  //             filter,
  //             nextToken: pageParam,
  //           },
  //         });

  //         return productsData.data.listProducts;
  //       } catch (err) {
  //         console.error("Error fetching todos", err.errors);
  //         throw err;
  //       }
  //     },
  //     {
  //       // refetchOnMount: false,
  //       // refetchInterval: false,
  //       // refetchOnWindowFocus: false,
  //       // refetchIntervalInBackground: false,

  //       getNextPageParam: (lastPage) => {
  //         return lastPage.nextToken || null;
  //       },
  //     }
  //   );

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
    [
      category
        ? `infinity-products-categories-${category}`
        : "infinity-products-categories",
    ],
    async ({ pageParam }) => {
      try {
        // Construimos el filtro combinando todas las condiciones
        const filter = {
          ...(category ? { categories: { contains: category } } : {}),
          ...(search ? { name: { contains: search } } : {}),
          countInStock: { gt: 0 },
          borrador: { ne: true }, // <-- Aquí se aplica el filtro de stock
        };

        const productsData = await client.graphql({
          query: listProducts,
          variables: {
            limit: 200,
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

  const products =
    data?.pages.reduce(
      (prevProducts, page) => prevProducts.concat(page.items),
      []
    ) ?? [];

  const productsList = products.filter(
    // (product) => product.status !== "Borrador"
    (product) => product.status !== "true"
  );

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
  // if (products.length < 1)
  //   return (
  //     <div style={{ minHeight: "50vh" }}>
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //         }}
  //       >
  //         <h1>Sin Resultados </h1>
  //         <Link to={"/"} style={{ marginLeft: "10px" }}>
  //           X
  //         </Link>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="container mt-4">
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
        <h2 className="mb-2">Todos los Articulos</h2>
      )}

      {productsList.length < 1 && (
        <div>
          <div className="d-flex justify-content-center align-items-center   mb-3">
            <AlertCircle size={80} className="" style={{ color: "gray" }} />{" "}
            {/* Ícono centrado */}
          </div>
          <h5 className="text-center " style={{ fontWeight: "bold" }}>
            No Encontrado
          </h5>
        </div>
      )}

      <div className="mb-5">
        <InfiniteScroll
          dataLength={productsList ? productsList.length : 0}
          hasMore={hasNextPage}
          next={() => fetchNextPage()}
          // loader={
          //   <div className="mx-auto">
          //     <Loading />
          //   </div>
          // }
        >
          <div className=" grid mx-auto gap-2">
            {productsList?.map((product) => (
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
      </div>

      {isFetching && (
        <div style={{ minHeight: "10vh" }}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CategoriesResultItemes;
