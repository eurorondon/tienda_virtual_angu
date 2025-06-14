import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div
      className="  d-flex justify-content-center  align-items-center "
      style={{ height: "60vh" }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
