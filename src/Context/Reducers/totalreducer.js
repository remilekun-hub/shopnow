const totalreducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state + action.prod.price;
    case "REMOVE_FROM_CART":
      return state - action.prod.price;

    default:
      return state;
  }
};

export default totalreducer;
