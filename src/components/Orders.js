import React from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../utils/graphqlFunctions";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Orders = ({ orders, isLoadingOrders }) => {
  const userState = useSelector((state) => state.user);

  const formatDateToSpanish = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );
    return formattedDate;
  };

  if (isLoadingOrders) return <Loading />;

  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {orders?.length > 0 ? (
        <div className="table-responsive">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr
                  key={index}
                  className={item.isPaid ? "alert-success" : "alert-danger"}
                >
                  <td>
                    <Link to={`/orderscreen/${item.id}`} className="link">
                      {index + 1}
                    </Link>
                  </td>
                  <td>{item.isPaid ? "Pagado" : "No Pagado"}</td>
                  <td>{formatDateToSpanish(item.createdAt)}</td>
                  <td>{item.totalPrice} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-12 alert alert-info text-center mt-3">
          No Orders
          <Link
            className="btn btn-success mx-2 px-3 py-2"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            START SHOPPING
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
