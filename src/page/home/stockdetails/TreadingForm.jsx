// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { DotIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserWallet } from "@/State/Wallet/Action"; // Adjust the path to where getUserWallet is defined


// const TradingForm = () => {
//   const [orderType, setOrderType] = useState("Buy");
//   const [amount, setAmount] = useState(0);
//   const [quantity, setQuantity] = useState(0);
//     const dispatch=useDispatch();
  

//   // Select only the necessary part of the state
//   const coin = useSelector(state => state.coin);
//   const wallet = useSelector(state => state.wallet);

//   useEffect(()=>{
//       handleFetchUserWallet();
//     }, []);

//      const handleFetchUserWallet=()=>{
//         dispatch(getUserWallet(localStorage.getItem("jwt")))
//       }
  

//   console.log("Wallet---------------:", wallet);

//   const handleChange = (e) => {
//     const amount = e.target.value;
//     setAmount(amount);
//     const volume = calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd);
//     console.log(volume);
//     setQuantity(volume);
//   };

//   const calculateBuyCost = (amount, price) => {
//     let volume = amount / price;
//     let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
//     return volume.toFixed(decimalPlaces);
//   };

//   return (
//     <div className="space-y-10 p-5">
//       <div>
//         <div className="flex gap-4 items-center justify-between">
//           <Input
//             className="py-7 focus:outline-none"
//             placeholder="Enter Amount...."
//             onChange={handleChange}
//             type="number"
//             name="amount"
//           />
//           <div>
//             <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
//               {quantity}
//             </p>
//           </div>
//         </div>
//         {false && (
//           <h1 className="text-red-800 text-center pt-4">
//             Insufficient wallet balance to buy
//           </h1>
//         )}
//       </div>

//       <div className="flex gap-5 items-center">
//         <Avatar>
//           <AvatarImage src="https://tse1.mm.bing.net/th?id=OIP.elcuDsyUCuenYrDbgXNqBAHaEK&pid=Api&P=0&h=180" />
//         </Avatar>

//         <div>
//           <div className="flex items-center gap-2">
//             <p>BTC</p>
//             <DotIcon className="text-gray-400" />
//             <p className="text-gray-400">Bitcoin</p>
//           </div>
//           <div className="flex items-end gap-2">
//             <p className="text-xl font-bold">${coin.coinDetails?.market_data.current_price.usd}</p>
//             <p className="text-red-600">
//               <span>-1319049822.578</span>
//               <span>(-0.290803%)</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <p>Order Type</p>
//         <p>Market Order</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <p>{orderType == "BUY" ? "Available Case" : "Available Quantity"}</p>
//         <p>
//           {orderType === "BUY" ? wallet.userWallet.id : 0.00}
//         </p>
//       </div>

//       <div>
//         <Button className={`w-full py-6 ${orderType === "SELL" ? "bg-red-600 text-white" : ""}`}>
//           {orderType}
//         </Button>
//         <Button
//           variant="link"
//           className="w-full mt-5 text-xl"
//           onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
//         >
//           {orderType === "BUY" ? "Or Sell" : "Or Buy"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TradingForm;


import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";

const TradingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const coin = useSelector((state) => state.coin);
  const wallet = useSelector((state) => state.wallet);
  const asset = useSelector((state) => state.asset);

  const coinDetails = coin.coinDetails;
  const balance = wallet?.userWallet?.balance ?? 0;
  const price = coinDetails?.market_data?.current_price?.usd ?? 1;

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getAssetDetails({
      coinId:coin.coinDetails.id,
      jwt:localStorage.getItem("jwt")}))
  }, [dispatch]);

  const handleChange = (e) => {
    const amt = parseFloat(e.target.value);
    setAmount(amt);
    const volume = calculateBuyCost(amt, price);
    setQuantity(volume);
  };

  const calculateBuyCost = (amt, price) => {
    if (!price) return 0;
    const volume = amt / price;
    const decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  };

  const handleBuyCrypto =()=>{
    dispatch(payOrder({
      jwt:localStorage.getItem("jwt"),
      amount,
      orderData:{
        coinId:coin.coinDetails?.id,
        quantity,
        orderType,
      },
    }))
  }
  return (
    <div className="space-y-10 p-5">
      {/* Amount input */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount..."
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
      </div>

      {/* Coin Info */}
      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage
            src={coinDetails?.image?.thumb ?? "https://via.placeholder.com/32"}
          />
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="uppercase">{coinDetails?.symbol}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">${price.toLocaleString()}</p>
            <p
              className={
                coinDetails?.market_data?.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              <span>
                {coinDetails?.market_data?.price_change_24h?.toFixed(2)}
              </span>
              <span>
                (
                {coinDetails?.market_data?.price_change_percentage_24h?.toFixed(
                  2
                )}
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Type */}
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      {/* Wallet Info */}
      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Balance" : "Available Quantity"}</p>
        <p>
          {orderType === "BUY"
            ? `${balance.toFixed(2)} USD`
            : asset.assetDetails?.quantity || 0} {/* You can add real coin quantity if needed */}
        </p>
      </div>

      {/* Action Buttons */}
      <div>
        <Button
        onClick={handleBuyCrypto}
          className={`w-full py-6 ${
            orderType === "SELL" ? "bg-red-600 text-white" : ""
          }`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          className="w-full mt-5 text-xl"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm;

