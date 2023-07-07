import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.productId === product.productId);
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += 1;
      } else {
        state.items.push({
          productData: product,
          quantity: 1,
          cartNumber: state.items.length + 1,
          productId: product.productId
        });
      }

    },
    setCartInitial: (state, action) => {
      const product = action.payload;
      state.items = product;
    },
    addQuantity: (state, action) => {
      const productId = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.productId === productId);
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += 1;
      }
    },
    minQuantity: (state, action) => {
      const productId = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.productId === productId);
      if (existingProductIndex >= 0) {
        if (state.items[existingProductIndex].quantity > 1) {
          state.items[existingProductIndex].quantity -= 1;
        }
      }
    },
    removeCart: (state, action) => {
      const productId = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.productId === productId);

      if (existingProductIndex >= 0) {
        if (state.items.length === 1) {
          state.items = [];
          console.log("solo habia uno en el carrito asi que se puso vacio")
        } else {
          state.items.splice(existingProductIndex, 1);
          console.log("se elimino el producto del carrito en la pocision" + existingProductIndex)
        }
      }

    }
  }


});


export const { addToCart, addQuantity, minQuantity, removeCart, setCartInitial } = cartSlice.actions;
export default cartSlice.reducer;
