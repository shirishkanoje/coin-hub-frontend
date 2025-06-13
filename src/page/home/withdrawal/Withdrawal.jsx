import React, { useEffect } from "react";
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector(store => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/wall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Transparent content box */}
      <div className="relative z-10 flex justify-center items-start pt-24 px-4">
        <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-5xl text-white">
          <h1 className="font-bold text-3xl pb-5">Withdrawal History</h1>

          <Table className="border border-white/20 text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Method</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-right text-white">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {withdrawal.history?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Bank</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell className="text-right">{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
