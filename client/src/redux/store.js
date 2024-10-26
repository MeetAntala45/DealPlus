import { configureStore } from "@reduxjs/toolkit";
import { lodersSlice } from "./LoadersSlice";
import { usersSlice } from "./usersSlice";

const store = configureStore({
    reducer:{
      loaders:lodersSlice.reducer,
      users:usersSlice.reducer,
    }
})

export default store;
