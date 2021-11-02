export default function addPetReducer(state={}, action) {
    switch (action.type) {
      case "AddPet":
        return {
          ...state,
          AddedPet:action.AddedPet
        };
  
      default:
        return state;
    }
  }