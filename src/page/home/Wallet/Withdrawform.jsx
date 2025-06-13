import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Withdrawform = () => {
  const [amount, setAmount] = React.useState("");
  const dispatch=useDispatch();
  const {wallet,withdrawal}=useSelector(store=>store)

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({amount,jwt:localStorage.getItem("jwt")}))
    console.log(amount);
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl text-white font-bold px-5 py-4">
        <p>Available balance</p>
        <p>$ {wallet.userWallet.balance}</p>
      </div>

      <div className="flex flex-col items-center">
        <h1>Enter Withdrawal Amount</h1>

        <div className="w-full flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="py-7 text-center"
            placeholder="$9999"
            type="number"
            min="0"
          />
        </div>
      </div>

      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img
            className="h-8 w-8"
            src="https://asset.brandfetch.io/id5NT_wByf/idT11wNKH4.jpeg?updated=1667812038519"
            alt="Bank_logo)"
          />
          <div>
            <p className="text-xl font-bold">********{withdrawal.paymentDetails?.bankName.slice(-4)}</p>
            <p className="text-xs">{withdrawal.paymentDetails?.accountNumber}</p>
          </div>
        </div>
      </div>
         <DialogClose className="w-full">
         <Button onClick={handleSubmit} className="w-full py-7 text-xl">
        Withdraw
      </Button>
         </DialogClose>
     
    </div>
  );
};

export default Withdrawform;
