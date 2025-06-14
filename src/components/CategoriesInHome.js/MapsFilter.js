import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategories } from "../../utils/graphqlFunctions";
import Filter from "./Filter";

function MapsFilter() {
  const [categories, setCategories] = React.useState([]);
  const { data, error } = useQuery(["AllCategories"], getCategories);

  // React.useEffect(() => {
  //   if (data) {
  //     setCategories(data.item);
  //   }
  // }, []);

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          {item?.showInCarousel && (
            <Filter name={item.categoryName} bgColor={item.bgColor} />
          )}
        </div>
      ))}
    </div>
  );
}

export default MapsFilter;
