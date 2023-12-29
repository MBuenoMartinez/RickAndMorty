import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
} from "../typeActions/type_actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };

    case FILTER:
      let filterByGender;
      if (action.payload === "AllCharacters") {
        filterByGender = state.allCharacters;
      } else {
        filterByGender = [...state.allCharacters].filter((favorite) => {
          return favorite?.gender === action.payload;
        });
      }

      return {
        ...state,
        myFavorites: filterByGender,
      };

    case ORDER:
      const favoritesOrder =
        action.payload === "Ascendente"
          ? [...state.allCharacters].sort(
              (characterA, characterB) => characterA.id - characterB.id
            )
          : [...state.allCharacters].sort(
              (characterA, characterB) => characterB.id - characterA.id
            );
      return {
        ...state,
        myFavorites: favoritesOrder,
      };

    default:
      return { ...state };
  }
};
export default reducer;
