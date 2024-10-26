import {createSlice} from '@reduxjs/toolkit';

export const lodersSlice = createSlice({
    name:'loaders',
    initialState: {
        loading:false,
    },
    reducers:{
        SetLoader:(state,action)=>{
            state.loading = action.payload;
        }
    }
})

export const {SetLoader} = lodersSlice.actions;