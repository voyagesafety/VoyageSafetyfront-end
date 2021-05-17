import { combineReducers } from "redux";
import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import establishmentReducer from "./establishment.reducer";

export default combineReducers(
    {
    registerReducer ,
    loginReducer,
    appReducer,
    establishmentReducer
    }
    )