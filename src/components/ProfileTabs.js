import React from "react";
import { useSelector } from "react-redux";

const ProfileTabs = () => {
  const { fullName, email, phoneNumber } = useSelector((state) => state.user);
  return (
    <>
      <form className="row  form-container">
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Nombre</label>
            <input
              className="form-control"
              // value={fullName}
              placeholder={fullName}
              type="text"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Email</label>
            <input className="form-control" placeholder={email} type="email" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Telefono</label>
            <input
              className="form-control"
              placeholder={phoneNumber}
              type="email"
            />
          </div>
        </div>
        {/* <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input className="form-control" type="password" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input className="form-control" type="password" />
          </div>
        </div>
        <button type="submit">Update Profile</button> */}
      </form>
    </>
  );
};

export default ProfileTabs;
