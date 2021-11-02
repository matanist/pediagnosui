export default function editModalReducer(state={}, action) {
  switch (action.type) {
    case "EditModalOpen":
      return {
        ...state,
        isOpen: action.isOpen,
        petId: action.petId,
      };

    case "ModalClose":
      return {
        ...state,
        isOpen: action.isOpen,
        petId: action.petId,
      };
    default:
      return state;
  }
}
