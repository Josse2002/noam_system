import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  items: []
}

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.id === product.id);
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1
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
      const existingProductIndex = state.items.findIndex(item => item.id === productId);
      if (existingProductIndex >= 0) {
        state.items.splice(existingProductIndex, 1);
      }
    }
  }

  
});


export const { addToCart, addQuantity, minQuantity, removeCart, setCartInitial } = cartSlice.actions;
export default cartSlice.reducer;
