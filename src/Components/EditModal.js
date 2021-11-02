import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllOwners, postPet } from "../Actions/PetActions";

function mapDispatchToProps(dispatch) {
  return {
    onModalClose: () =>
      dispatch({
        type: "ModalClose",
        isOpen: false,
        petId: -1,
      }),
    onAddPet: (pet) =>
      dispatch({
        type: "AddPet",
        AddedPet: pet,
      }),
  };
}
function mapStateToProps(state) {
  console.log(state);
  return {
    ...state.editModalReducer,
  };
}

function EditModal(props) {
  const [toggleState, setToggleState] = useState(false);
  const [petInfo, setPetInfo] = useState();
  const [allOwners, setAllOwners] = useState();
  const toggle = () => {
    setToggleState(!toggleState);
    if (toggleState == true) {
      props.onModalClose();
    }
  };
  useEffect(() => {
    setToggleState(props.isOpen);
    getAllOwners().then((data) =>
      setAllOwners([{ id: 0, ad: "Seçiniz", soyad: "" }, ...data.data.set])
    );
  }, [props]);
  const textChangeHandler = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };
  const saveFile = (e) => {
    setPetInfo({ ...petInfo, formFile: e.target.files[0] });
  };
  const btnKaydetClickHandler = async(e) => {
    if (props.petId == -1) {
      //Yeni Pet Kaydet
      var conf = window.confirm("Yeni Pet kaydedilecek emin misiniz?");
      if (conf) {
        const formData = new FormData();
        formData.append("ad", petInfo.Ad);
        formData.append("yas", petInfo.Yas);
        formData.append("ownerId", petInfo.OwnerId);
        formData.append("formFile", petInfo.formFile);
        console.log(formData);
        const res = await axios.post('Veteriner',formData);
        props.onAddPet(res.data.set);
        console.log(res);
        // postPet(formData)
        //   .then((data) => {
        //     if (data.data.code == 200) {
        //       props.onAddPet(data.data.set);
        //     }
        //   })
        //   .catch((err) => console.error(err));
      }
    } else {
      //Mevcut Pet güncelle
    }
  };
  return (
    <Modal isOpen={toggleState} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {props && props.petId == -1 ? "Yeni Pet Kaydet" : "Pet Düzenle"}
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label htmlFor="txbAd">Ad</label>
            <input
              type="text"
              className="form-control"
              name="Ad"
              id="txbAd"
              placeholder="Ad Giriniz"
              onChange={textChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="txbYas">Yaş</label>
            <input
              type="text"
              className="form-control"
              id="txbYas"
              name="Yas"
              placeholder="Yaş Giriniz"
              onChange={textChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Sahip</label>
            <select name="OwnerId" onChange={textChangeHandler}>
              {/* <option value={0}>Seçiniz</option>
                <option value={1}>Ad Soyad</option> */}
              {allOwners &&
                allOwners.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.ad} {o.soyad}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Foto</label>
            <input type="file" className="form-control" onChange={saveFile} />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={btnKaydetClickHandler}>
          {props && props.petId == -1
            ? "Yeni Pet Kaydet"
            : "Değişikliği Kaydet"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
