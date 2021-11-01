import React, { useState, useEffect } from "react";
import { getAllPets } from "../Actions/PetActions";

export default function VeterinerPage() {
  const [allPets, setAllPets] = useState();
  useEffect(() => {
    getAllPets()
      .then((data) => setAllPets(data.data.set))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="container mt-5">
      <button type="button" className="btn btn-primary mt-1">
        Yeni Pet
      </button>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Ad</th>
            <th>Yaş</th>
            <th>Sahip Ad</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
            {
                allPets && allPets.map(p=>
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.ad}</td>
                        <td>{p.yas}</td>
                        <td>{p.owner?.ad} {p.owner?.soyad}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-danger">Sil</button>
                            <button type="button" className="btn btn-sm btn-info">Detay</button>
                            <button type="button" className="btn btn-sm btn-warning">Düzenle</button>
                        </td>
                    </tr>)
            }
        </tbody>
      </table>
    </div>
  );
}
