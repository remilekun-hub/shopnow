const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.prod];
    case "ADD_TO_CART_FROM_DYNAMIC":
      return [...state, action.data];
    case "REMOVE_FROM_CART":
      const cart = [...state];
      const updated = cart.filter((c) => c.id !== action.prod.id);
      return updated;
    case "REMOVE_FROM_CARTPAGE":
      const cart2 = [...state];
      const updatedcart2 = cart2.filter((c) => c.id !== action.prod);
      return updatedcart2;
    default:
      return state;
  }
};

export default cartReducer;
