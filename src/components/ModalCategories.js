// import React from "react";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { getCategories } from "../utils/graphqlFunctions";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

// function ModalCategories({ setShowModal }) {
//   const [categories, setCategories] = React.useState([]);
//   const { data: dataCategories, error } = useQuery(
//     ["AllCategories"],
//     getCategories,
//
//     }
//   );

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "0",
//         left: "0",
//         right: "0",
//         bottom: "0",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         zIndex: "999",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           backgroundColor: "white",
//           padding: "20px",
//           borderRadius: "8px",
//           width: "90%",
//           height: "60%",
//         }}
//       >
//         <div
//           className=" "
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//             gap: "5px",
//             gridAutoFlow: "dense",
//           }}
//         >
//           {categories?.map((category) => (
//             <div
//               key={category.id}
//               className="d-flex flex-column justify-content-start align-items-center gap-4"
//               style={{
//                 backgroundColor: "#f2f2f2",
//                 padding: "10px",
//                 borderRadius: "8px",
//               }}
//             >
//               <div className=" ">
//                 <div className="">
//                   <span className="" style={{ fontSize: "10px" }}>
//                     {category.categoryName}
//                   </span>
//                   <Link to={`/categories/${category.categoryName}`}>
//                     {/* <button className="btn btn-primary">Ver mas</button> */}
//                   </Link>
//                 </div>
//               </div>

//               <div className=" ">
//                 <img
//                   src={
//                     category.photo
//                       ? category.photo[0].url
//                       : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
//                   }
//                   alt={category.categoryName}
//                   style={{ maxWidth: "100%" }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         <CancelIcon
//           color="warning"
//           onClick={handleCloseModal}
//           style={{ position: "absolute", top: 0, right: 0 }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ModalCategories;
