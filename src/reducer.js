export const initialState = {
  token: undefined,
  user: undefined,
  repoId: [],
  user2: undefined,
  events: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case "ADD_TO_EVENTS":
      return {
        ...state,
        events: [...state.events, action.item],
      };
    case "REMOVE_FROM_EVENTS":
      let newEvent = [...state.events];
      const idx = state.events.findIndex(
        (eventItem) => eventItem.id === action.id
      );
      if (idx >= 0) {
        // item exists in fav, remove it..
        newEvent.splice(idx, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return { ...state, events: newEvent };
    case "ADD_TO_FAV":
      return {
        ...state,
        repoId: [...state.repoId, action.item],
      };
    case "REMOVE_FROM_FAV":
      let newBasket = [...state.repoId];
      const index = state.repoId.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        // item exists in fav, remove it..
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return { ...state, repoId: newBasket };
    default:
      return state;
  }
};

export default reducer;
