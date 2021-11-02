import axios from "axios";

export const getLogin = ({ userName, password }) =>
  new Promise((resolves, rejects) => {
    const config = {
      Headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    const data = { userName: userName, password: password };
    axios
      .post("Auth", data, config)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });

  export const getValidateToken = ({ token }) =>
  new Promise((resolves, rejects) => {
    const config = {
      Headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    const data = { token:token};
    axios
      .post("Auth/ValidateToken", data, config)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });
