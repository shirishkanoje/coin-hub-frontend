import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Wallet,
  RefreshCcw,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Shuffle,
  ShuffleIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TopUpForm from "./TopUPForm";
import Withdrawform from "./Withdrawform";
import Transferform from "./Transferform";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const WalletComponent = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchUserWalletTransaction();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || paymentId,
          navigate,
        })
      );
    }
  }, [orderId, paymentId, razorpayPaymentId]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const handleFetchUserWalletTransaction = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  return (
    <div className="relative min-h-screen">
      {/* 🔮 Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/wall.mp4" type="video/mp4" />
      </video>

      {/* 🌈 Main wallet UI */}
      <div className="flex flex-col items-center p-4 lg:px-20 pb-32">
        <div className="pt-10 w-full lg:w-[60%] space-y-10">
          {/* 🧊 Wallet Card */}
          <Card className="p-5 border border-white/20 bg-black/75 backdrop-blur-md text-white shadow-md">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                {/* Wallet Info */}
                <div className="flex items-center gap-4">
                  <Wallet size={30} />
                  <div>
                    <CardTitle className="text-2xl">My Wallet</CardTitle>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-400 text-sm">
                        #{wallet.userWallet?.id}
                      </p>
                      <Copy
                        size={16}
                        className="cursor-pointer hover:text-slate-300 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Reload */}
                <RefreshCcw
                  onClick={handleFetchUserWallet}
                  className="w-6 h-6 cursor-pointer hover:text-gray-400 transition"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-white">
                <DollarSign />
                <span className="text-2xl font-semibold">
                  {wallet.userWallet.balance} USD
                </span>
              </div>

              <div className="flex gap-7 mt-5 text-white">
                {/* 💰 Add Money */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="h-24 w-24 hover:text-gray-300 flex flex-col items-center justify-center rounded-md shadow-md">
                      <ArrowUpCircle />
                      <span className="text-sm mt-2">Add Money</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Top Up Your Wallet</DialogTitle>
                    </DialogHeader>
                    <TopUpForm />
                  </DialogContent>
                </Dialog>

                {/* 🏦 Withdraw */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="h-24 w-24 hover:text-gray-300 flex flex-col items-center justify-center rounded-md shadow-md">
                      <ArrowDownCircle />
                      <span className="text-sm mt-2">Withdrawal</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Withdrawal</DialogTitle>
                    </DialogHeader>
                    <Withdrawform />
                  </DialogContent>
                </Dialog>

                {/* 🔁 Transfer */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="h-24 w-24 hover:text-gray-300 flex flex-col items-center justify-center rounded-md shadow-md">
                      <Shuffle />
                      <span className="text-sm mt-2">Transfer</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl">
                        Transfer to other wallet
                      </DialogTitle>
                    </DialogHeader>
                    <Transferform />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* 📜 Transaction History */}
          <div>
            <div className="flex gap-2 items-center pb-5 text-black">
              <h1 className="text-2xl font-semibold">History</h1>
              <RefreshCcw
                className="h-7 w-7 cursor-pointer hover:text-gray-800"
                onClick={handleFetchUserWalletTransaction}
              />
            </div>

            <div className="space-y-5">
              {wallet.transactions.map((item, i) => (
                <Card
                  key={i}
                  className="px-5 py-3 flex justify-between items-center border border-white/10 bg-black/80 backdrop-blur-md text-white"
                >
                  <div className="flex items-center gap-5">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1>{item.transactionType || item.purpose}</h1>
                      <h1 className="text-sm text-gray-400">
                        Purpose: {item.purpose}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {item.transactionTime}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-green-400">+{item.amount} USD</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
