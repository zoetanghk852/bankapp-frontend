import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerID: "",
  registerName: "",
  registerPassword: "",
  registerErrorMsg: "",
  loginID: "",
  loginPassword: "",
  loginErrorMsg: "",
  isLogin: localStorage.getItem("token") !== null ? true : false,
  token:localStorage.getItem("token"),
  balance:0,
  language :"eng",
  login_title:"",
};

export const registerSlice = createSlice({
  name: "register",
  initialState: { ...initialState },
  reducers: {
    inputRegisterID: function (state, action) {
      state.registerErrorMsg= "";
      state.registerID = action.payload;
    },
    inputRegisterName: function (state, action) {
      state.registerErrorMsg= "";
      state.registerName = action.payload;
    },
    inputRegisterPassword: function (state, action) {
      state.registerErrorMsg= "";
      state.registerPassword = action.payload;
    },
    logRegisterErrorMessage: function (state, action) {
      state.registerErrorMsg = action.payload;
    },
    inputLoginID: function (state, action) {
      state.loginErrorMsg="";
      state.loginID = action.payload; 
    },
    inputLoginPassword: function (state, action) {
      state.loginErrorMsg="";
      state.loginPassword = action.payload;
    },
    logIsLogin: function (state, action) {
      state.isLogin = action.payload;
    },
    logLoginErrorMessage: function (state, action) {
      state.loginErrorMsg = action.payload;
    }, 
    inputToken: function (state, action) {
      state.token = action.payload; 
    },
    setLogout: function (state) {
      state = {...initialState,isLogin:localStorage.removeItem('token')}
    },
    inputBalance: function (state, action) {
      state.balance = action.payload
    },
    setLanguage:function (state,action) {
      state.language = action.payload; 
    },
  
  },
});
export const {
  inputRegisterID,
  inputRegisterName,
  inputRegisterPassword,
  logRegisterErrorMessage,
  inputLoginID,
  inputLoginPassword,
  logLoginErrorMessage,
  logIsLogin,
  inputToken,
  setLogout,
  inputBalance,
  setLanguage,
} = registerSlice.actions;
export default registerSlice.reducer;
