import { createSlice } from "@reduxjs/toolkit";

// Obtén los productos guardados en el localStorage al cargar la página
const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getCartItemsFromLocalStorage(),
    // cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      if (newItem) {
        const existingItem = state.cartItems.find(
          (item) => item.product === newItem.product
        );

        if (existingItem) {
          existingItem.qty = newItem.qty;
        } else {
          state.cartItems.push(newItem);
        }

        saveCartItemsToLocalStorage(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const cartItems = getCartItemsFromLocalStorage();
      const updatedCartItems = cartItems.filter(
        (item) => item.product !== productId
      );
      saveCartItemsToLocalStorage(updatedCartItems);
      state.cartItems = updatedCartItems;
    },
    // Nuevo reducer para vaciar el carrito
    clearCart: (state) => {
      state.cartItems = [];
      saveCartItemsToLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// // Función para almacenar los datos del carrito en el localStorage
// const saveCartItemsToLocalStorage = (cartItems) => {
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };
// // Middleware para almacenar los datos del carrito en el localStorage después de cada acción
// export const cartMiddleware = (store) => (next) => (action) => {
//   const result = next(action);

//   if (action.type.startsWith("cart/")) {
//     const { cartItems } = store.getState().cart;
//     saveCartItemsToLocalStorage(cartItems);
//   }

//   return result;
// };

const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export default cartSlice.reducer;
