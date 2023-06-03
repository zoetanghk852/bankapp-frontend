import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PageStyle from "../css/Page.module.css";

import {
  inputRegisterID,
  inputRegisterName,
  inputRegisterPassword,
  logRegisterErrorMessage,
  inputLoginID,
  inputLoginPassword,
  logLoginErrorMessage,
  logIsLogin,
  inputToken,
} from "../Slice/frontpageSlice";

function Frontpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerID, registerName, registerPassword, registerErrorMsg } =
    useSelector((state) => {
      console.log(state, "frontpage");
      return state.frontpage;
    });

  const { loginID, loginPassword, loginErrorMsg } = useSelector((state) => {
    return state.frontpage;
  });


  const login = () => {
    fetch("/member/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        id: loginID,
        password: loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data, "get");
          dispatch(logIsLogin(true));
          dispatch(inputToken(data.token));

          navigate("/member");
        } else {
          console.log(data, "error");
          dispatch(logLoginErrorMessage(`${data.message}`));
        }
      });
  };

  const register = () => {
    fetch("/member/register", {
      headers: { "Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({
        id: registerID,
        password: registerPassword,
        name: registerName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data, "get");
          alert("register success");

          
        } else {
          dispatch(logRegisterErrorMessage(`${data.message}`));
          console.log(data.message);
          
        }
      });
  };

  return (
    <div className={PageStyle.pageWrapper}>
      <div className={PageStyle.titleBox}>
        <span className={PageStyle.leftlogodot}></span>
        <span className={PageStyle.logodot}></span>
        <div className={PageStyle.titleWrapper}>
          <h1>Cozy Bank</h1>
        </div>
        
      </div>

      <div className={PageStyle.box}>
        <div>
          
          <h1 className={PageStyle.boxTitle}>Login</h1>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              onChange={(e) => {
                dispatch(inputLoginID(e.target.value));
              }}
              placeholder="account ID"
            />
          </div>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              onChange={(e) => {
                dispatch(inputLoginPassword(e.target.value));
              }}
              placeholder="password"
            />
          </div>
          <div>
            {loginErrorMsg === "" ? null : (
              <span className={PageStyle.error}>{loginErrorMsg} </span>
            )}
          </div>
          <button className={PageStyle.button} onClick={login}>
            Login
          </button>
        </div>

        <div>
          <h1 className={PageStyle.boxTitle}>Register</h1>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="ID"
              onChange={(e) => {
                dispatch(inputRegisterID(e.target.value));
              }}
            />
          </div>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                dispatch(inputRegisterName(e.target.value));
              }}
            />
          </div>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                dispatch(inputRegisterPassword(e.target.value));
              }}
            />
          </div>
          <div>
            {registerErrorMsg === "" ? null : (
              <span className={PageStyle.error}>{registerErrorMsg} </span>
            )}
          </div>
          <button className={PageStyle.button} onClick={register}>
            register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Frontpage;
