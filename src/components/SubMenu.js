import React from "react";

const SubMenu = () => {
  return (
    <div
      className="d-flex justify-content-evenly py-1"
      style={{ backgroundColor: "white", fontSize: "0.9rem" }}
    >
      <div>
        <span>Combos</span>
      </div>
      <a href="http://wa.me/+584245116397">
        <span>Mayoristas</span>
      </a>
      <a href="https://larahogar-dashboard.vercel.app/">
        <span>Admin</span>
      </a>
    </div>
  );
};

export default SubMenu;
