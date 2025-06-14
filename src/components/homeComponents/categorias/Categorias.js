import React from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../features/categories/categorySlice";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import amplifyconfig from "../../../aws-exports";
import { listCategories } from "../../../graphql/queries";
import { getCategories } from "../../../utils/graphqlFunctions";
import CategoriasMenorA5 from "./CategoriasMenorA5";
import CategoriasMayorA5 from "./CategoriasMayorA5";
import CategoriasMobile from "./CategoriasMobile";
import CatResponsive5 from "./CatResponsive5";
import CatResponsive6 from "./CatResponsive6";
import CatResponsive8 from "./CatResponsive8";
import CatTablet7 from "./CatTablet7";
import CatTablet8 from "./CatTablet8";
import SliderCategory from "./SliderCategory";
import CategoriasMobileButtom from "./CategoriasMobileButtom";
import CategoriaPc from "./CategoriaPc";
Amplify.configure(amplifyconfig);

const Categorias = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState([]);
  const { data: dataCategories, error } = useQuery(
    ["AllCategories"],
    getCategories
  );

  console.log("datacategories", dataCategories);

  React.useEffect(() => {
    setCategories(dataCategories);
  }, [dataCategories]);

  const handleCategories = (category) => {
    window.scroll(0, 0);
    navigate(`/categories/${category.categoryName}`);
    // alert("categories scroll 0,0");
  };

  if (!categories) {
    return null; // O puedes devolver un indicador de carga aquí
  }
  if (categories && categories.length < 2) {
    return null; // O puedes devolver un indicador de carga aquí
  }

  //PC SCREENS
  if (window.innerWidth > 1150)
    return (
      <CategoriaPc
        categories={categories}
        handleCategories={handleCategories}
      />
    );

  // TABLETS SCREENS
  if (window.innerWidth < 1150 && window.innerWidth > 768)
    return (
      <>
        {categories.length === 6 ? (
          <SliderCategory
            categories={categories}
            handleCategories={handleCategories}
          />
        ) : categories.length > 6 ? (
          <CategoriasMobileButtom
            categories={categories}
            setCategories={setCategories}
            handleCategories={handleCategories}
          />
        ) : (
          <CategoriasMobile
            categories={categories}
            handleCategories={handleCategories}
          />
        )}
      </>
    );

  //  MOBILE SCREENS
  if (window.innerWidth < 769 && categories?.length > 1)
    return (
      <>
        {categories.length === 5 ? (
          <SliderCategory
            categories={categories}
            handleCategories={handleCategories}
          />
        ) : categories.length > 5 ? (
          <CategoriasMobileButtom
            categories={categories}
            setCategories={setCategories}
            handleCategories={handleCategories}
          />
        ) : (
          <CategoriasMobile
            categories={categories}
            handleCategories={handleCategories}
          />
        )}
      </>
    );
};

export default Categorias;
