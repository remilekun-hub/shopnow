const totalreducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state + action.prod.price;
    case "ADD_TO_CART_FROM_DYNAMIC":
      return state + action.data.price;
    case "REMOVE_FROM_CART":
      return state - action.prod.price;

    default:
      return state;
  }
};

export default totalreducer;
