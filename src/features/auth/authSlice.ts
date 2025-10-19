import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    uid: string | null;
    email: string | null;
    displayName: string | null;
}

const initialState : UserState = {
    uid: null,
    email: null,
    displayName: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<UserState>)=>{
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
        }
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;