import React, { useState, useEffect } from "react";
import { getLogin } from "../Actions/userActions";

export default function Signin() {
  const [errorMessage, setErrorMessage] = useState({});
  const [userData, setUserData] = useState();
  const handleSubmit = () => {
    getLogin(userData).then((data) => {
      if (data.data.code === 200) {
        localStorage.setItem("token", data.data.set.token);
        localStorage.setItem("role", data.data.set.rol);
        const rol = data.data.set.rol;
        switch (rol) {
          case "Admin":
            window.location.pathname = "/Admin";
            break;
          case "Veteriner":
            window.location.pathname = "/Veteriner";
            break;
          default:
            break;
        }
      } else {
        setErrorMessage({ value: data.data.message });
      }
    });
  };
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Giriş</h1>
      <form>
        <div className="form-group">
          <label className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Şifre</label>
          <input
            type="text"
            name="password"
            className="form-control"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm mt-3"
            onClick={handleSubmit}
          >
            Giriş Yap
          </button>
          {errorMessage.value && (
            <p className="text-danger">{errorMessage.value} </p>
          )}
        </div>
      </form>
    </div>
  );
}
