import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsuario: (state, action) => {
            state.user = action.payload;
        }
    }
});
export const { setUsuario } = userSlice.actions;
export default userSlice.reducer;

