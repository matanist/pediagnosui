import axios from "axios";

export const getAllPets = () =>
  new Promise((resolves, rejects) => {
    axios
      .get("Veteriner")
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });

export const getPet = (id) =>
  new Promise((resolves, rejects) => {
    axios
      .get(`Veteriner/${id}`)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });

export const putPet = (pet) =>
  new Promise((resolves, rejects) => {
    const config = {
      Headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    axios
      .put(`Veteriner`, pet, config)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });

export const postPet = (pet) =>
  new Promise((resolves, rejects) => {
    axios
      .post(`Veteriner`, pet)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });
export const deletePet = (id) =>
  new Promise((resolves, rejects) => {
    const config = {
      Headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    axios
      .delete(`Veteriner/${id}`, config)
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });
  export const getAllOwners = () =>
  new Promise((resolves, rejects) => {
    axios
      .get("Owner")
      .then((data) => resolves(data))
      .catch((err) => rejects(err));
  });