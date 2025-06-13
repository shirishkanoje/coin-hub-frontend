import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentHandler } from "@/State/Wallet/Action";
import React from "react";
import { useDispatch } from "react-redux";

const TopUpForm = () => {
  const [amount, setAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");

  const dispatch=useDispatch();

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log(amount,paymentMethod);
    dispatch(paymentHandler({jwt:localStorage.getItem("jwt"),
      paymentMethod,
      amount
    }))
  };



  return (
    <div className="pt-10 space-y-5">
      {/* Amount Input */}
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="$9999"
        />
      </div>

      {/* Payment Method Selection */}
      <div>
        <h1 className="pb-1">Select Payment Method</h1>
        <RadioGroup
          onValueChange={handlePaymentMethodChange}
          className="flex gap-4"
          defaultValue="RAZORPAY"
        >
          {/* Razorpay Option */}
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md cursor-pointer">
            <RadioGroupItem
              className="h-6 w-6"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1" className="text-lg cursor-pointer">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img src="https://w7.pngwing.com/pngs/586/552/png-transparent-razorpay-hd-logo-thumbnail.png" alt=""/>

              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md cursor-pointer">
            <RadioGroupItem
              className="h-6 w-6"
              value="STRIPE"
              id="r1"
            />
            <Label htmlFor="r1" className="text-lg cursor-pointer">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img 
                src="https://tse2.mm.bing.net/th?id=OIP.f5wAEglrCtMNornB60_xkgHaHa&pid=Api&P=0&h=180" alt=""/>

              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      {/* <DialogClose className="w-full"> */}
      <Button onClick={handleSubmit} className="w-full py-7">
        Submit
      </Button>
      {/* </DialogClose> */}
     
    </div>
  );
};

export default TopUpForm;
