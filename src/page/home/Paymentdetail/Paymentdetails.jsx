// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button"; // Ensure Button is imported
// import React, { useEffect, useState } from "react";
// import Paymentform from "./Paymentform";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentDetails } from "@/State/Withdrawal/Action";

// const PaymentDetails = () => {
//  // const hasPaymentDetails = false; // Change this condition dynamically as needed
//   const {withdrawal}=useSelector(store =>store);
//   const dispatch=useDispatch();

//   useEffect(()=>{
//     dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}))
//   },[dispatch]);

//   return (
//     <div className="px-20">
//       <h1 className="text-3xl font-bold py-10">Payment Details</h1>

//       {/* Conditionally Render Card */}
//       {withdrawal.paymentDetails ? (
//        <Card className="border border-gray-200 shadow-sm">
//        <CardHeader>
//          <CardTitle>{withdrawal.paymentDetails.bankName}</CardTitle>
//          <CardDescription>A/C No: ********{withdrawal.paymentDetails.accountNumber.slice(-4)}</CardDescription>
//        </CardHeader>
//        <CardContent>
//          <div className="space-y-3">
//            <div className="flex items-center">
//              <p className="w-32 font-medium">A/C Holder</p>
//              <p className="text-gray-500">: {withdrawal.paymentDetails.accountHolderName}</p>
//            </div>
//            <div className="flex items-center">
//              <p className="w-32 font-medium">IFSC</p>
//              <p className="text-gray-500">: {withdrawal.paymentDetails.ifsc}</p>
//            </div>
//          </div>
//        </CardContent>
//      </Card>
     
//       ) : (

//         <Dialog>
//         <DialogTrigger asChild>
//           <Button className="mt-5">Add Payment Details</Button> 
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Payment Details</DialogTitle>
//           </DialogHeader>
//           <Paymentform />
//         </DialogContent>
//       </Dialog>
//       )}

//       {/* Add Payment Details Dialog */}
     
//     </div>
//   );
// };

// export default PaymentDetails;





import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import Paymentform from "./Paymentform";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((store) => store.withdrawal);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/wall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="relative z-10 flex justify-center items-start h-full pt-24 px-4">
        <div className="bg-black/55 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-white">Payment Details</h1>

          {paymentDetails ? (
            <Card className="bg-black/75 border border-white/20 shadow-md text-white">
              <CardHeader>
                <CardTitle>{paymentDetails.bankName}</CardTitle>
                <CardDescription>
                  A/C No: ********{paymentDetails.accountNumber.slice(-4)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <p className="w-32 font-medium">A/C Holder</p>
                    <p className="text-gray-200">: {paymentDetails.accountHolderName}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="w-32 font-medium">IFSC</p>
                    <p className="text-gray-200">: {paymentDetails.ifsc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-5">Add Payment Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Payment Details</DialogTitle>
                </DialogHeader>
                <Paymentform />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
