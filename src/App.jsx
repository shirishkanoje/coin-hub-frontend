import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import { Navigate } from "react-router-dom";


// ✅ Component Imports
import Navbar from "./page/home/Navbar/Navbar";
import Home1 from "./page/home/Home1";
import Portfolio from "./page/home/portfolio/portfolio";
import Withdrawal from "./page/home/withdrawal/Withdrawal";
import StockDetails from "./page/home/stockdetails/StockDetails";
import WatchList from "./page/home/watchlist/WatchList";
import Profile from "./page/home/profile/Profile";
import Searchcoin from "./page/home/Search/Searchcoin";
import WithdrawalAdmin from "./page/home/Admin/WithdrawalAdmin";
import PaymentDetails from "./page/home/Paymentdetail/Paymentdetails";  // ✅ fixed path
// import Notfound from "./page/home/notfound/notfound";                  // ✅ fixed path
import Wallet from "./page/home/Wallet/Wallet";
import Activity from "./page/home/Activity/Activity";
import Auth from "./page/home/Auth/Auth";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Auth/Action";

function App() {
  const auth = useSelector((store) => store.auth);
  const dispatch=useDispatch()

  console.log("auth.---", auth);

  useEffect(()=>{
    dispatch(getUser(auth.jwt ||localStorage.getItem("jwt")))
  },[auth.jwt])

  return (
    <>
      {auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            {/* <Route path="/paymentdetails" element={<PaymentDetails />} /> */}
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/searchcoin" element={<Searchcoin />} />
            <Route path="/withdrawaladmin" element={<WithdrawalAdmin />} />
            {/* <Route path="/*" element={<Notfound />} /> */}
            <Route path="/payment-details" element={<PaymentDetails />} />
            </Routes>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
  
}

export default App;
