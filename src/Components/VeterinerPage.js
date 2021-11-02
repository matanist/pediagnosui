import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deletePet, getAllPets } from "../Actions/PetActions";

function mapDispatchToProps(dispatch) {
  return {
    onModalOpen: (petId = -1) =>
      dispatch({
        type: "EditModalOpen",
        isOpen: true,
        petId: petId,
      }),
  };
}
function mapStateToProps(state) {
  console.log(state);
  return {
    ...state.addPetReducer,
  };
}
function VeterinerPage(props) {
  const [allPets, setAllPets] = useState();
  useEffect(() => {
    getAllPets()
      .then((data) => setAllPets(data.data.set))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (allPets!=undefined) {
      setAllPets([...allPets, props.AddedPet]);
    }
    
  }, [props.AddedPet]);
  function newPetClickHandler() {
    props.onModalOpen(-1);
  }
  function deleteClickHandler(pet) {
    var conf = window.confirm(
      `id:${pet.id} Ad:${pet.ad} olan pet silinecek. Emin misiniz?`
    );
    if (conf) {
      deletePet(pet.id)
        .then((data) => data.data)
        .then((data) => {
          if (data.code == 200) {
            var existDelete = allPets.filter((p) => p.id !== pet.id);
            setAllPets(existDelete);
          }
        })
        .catch((err) => console.error(err));
    }
  }
  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-primary mt-1"
        onClick={newPetClickHandler}
      >
        Yeni Pet
      </button>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Ad</th>
            <th>Yaş</th>
            <th>Resim</th>
            <th>Sahip Ad</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {allPets &&
            allPets.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.ad}</td>
                <td>{p.yas}</td>
                <td> 
                  <img width={100} src={`data:image/jpeg;base64,${p.petImage}`} alt={p.ad}/>
                </td>
                <td>
                  {p.owner?.ad} {p.owner?.soyad}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteClickHandler(p)}
                  >
                    Sil
                  </button>
                  <button type="button" className="btn btn-sm btn-info">
                    Detay
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-warning"
                    onClick={() => props.onModalOpen(p)}
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(VeterinerPage);
