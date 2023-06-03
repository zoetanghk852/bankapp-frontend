import React, { useEffect } from "react";
import PageStyle from "../css/Page.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { inputRegisterName,inputBalance,setLogout } from "../Slice/frontpageSlice";

import { inputtopupMoney } from "../Slice/topupSlice";

import { inputReviceId, inputTransferMoney } from "../Slice/transferSlice";

const Accountpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  console.log(state);

  const logout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  useEffect(()=>{

  },[state.frontpage.balance]);

  function fetchUserData(){
    fetch("/member/profile", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      token: state.frontpage.token,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch(inputRegisterName(data.name)); 
        dispatch(inputBalance(data.balance));
        fetchUserData();
      }
    });}

   
  const topup = () => {
    fetch("/member/topup", {
      headers: { "Content-Type": "application/json" }, 
      method: "POST",
      body: JSON.stringify({
        token: state.frontpage.token,
        money: state.topup.topupMoney,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("topup done")
          console.log(data, "get");
        } else {
          console.log(data, "error");  
        }
      });
  };

  const transfer = () => {
    fetch("/member/transfer", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        token: state.frontpage.token,
        to: state.transfer.reviceId,
        money: state.transfer.transferMoney,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("transfer done")
          console.log(data, "get");
          fetchUserData();
        } else {
          alert("done")

          console.log(data, "error");
        }
      });
  };

  return (
    <div className={PageStyle.pageWrapper}>
      <div className={PageStyle.memberPageTop}>
        <h1 className={PageStyle.pageTitle}>HI ,{state.frontpage.registerName}</h1>
        <span className={PageStyle.logoutLogo}>
          <button className={PageStyle.logoutButton} onClick={logout}>
            logout
          </button>
        </span>
      </div>

      <span className={PageStyle.balanceBox}>
        <div>
          <p className={PageStyle.balanceTitle}>Balance : </p>
          <p className={PageStyle.balanceTitle}>${state.frontpage.balance}</p>
        </div>
      </span>

      <div className={PageStyle.memberBox}>
        <div className={PageStyle.topUpBox}>
          <h1>Top Up</h1>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="amount"
              onChange={(e) => {
                dispatch(inputtopupMoney(e.target.value));
              }}
            />
          </div>
          <button className={PageStyle.button} onClick={topup}>
            Comfirm
          </button>
        </div>

        <div className={PageStyle.TransferBox}>
          <h1>Transfer</h1>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="account ID"
              onChange={(e) => {
                dispatch(inputReviceId(e.target.value));
              }}
            />
          </div>
          <div className={PageStyle.inputBox}>
            <input
              type="text"
              placeholder="amount"
              onChange={(e) => {
                dispatch(inputTransferMoney(e.target.value));
              }}
            />
          </div>
          <button className={PageStyle.button} onClick={transfer}>
            Comfirm
          </button>
        </div>

        </div>
      </div>
  );
};

export default Accountpage;
