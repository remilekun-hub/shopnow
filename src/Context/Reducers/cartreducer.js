const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.prod];
    case "REMOVE_FROM_CART":
      const cart = [...state];
      const updated = cart.filter((c) => c.id !== action.prod.id);
      return updated;
    default:
      return state;
  }
};

export default cartReducer;
