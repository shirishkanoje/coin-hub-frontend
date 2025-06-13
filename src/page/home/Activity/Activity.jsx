import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/State/Order/Action";
import { calculateProfit } from "@/utils/calculateProfit";

const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/wall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main content */}
      <div className="h-full overflow-y-auto px-4 pb-24">
        <div className="rounded-xl bg-black/65 backdrop-blur-md p-6 mt-4 border border-white/20 text-white">
          <h1 className="font-bold text-3xl pb-5">Activity</h1>

          <Table className="border border-white/10">
            <TableHeader>
              <TableRow>
                <TableHead className="py-5">Date & Time</TableHead>
                <TableHead>Trading Pair</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orders?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p>{item.timestamp}</p>
                    <p className="text-gray-400 text-sm">12:39:32</p>
                  </TableCell>

                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                      <AvatarImage src={item.orderItem.coin.image} />
                    </Avatar>
                    <span>{item.orderItem.coin.name}</span>
                  </TableCell>

                  <TableCell>${item.orderItem.buyPrice}</TableCell>
                  <TableCell>${item.orderItem.sellPrice}</TableCell>
                  <TableCell>{item.orderType}</TableCell>
                  <TableCell>{calculateProfit(item)}</TableCell>
                  <TableCell className="text-right">
                    ${item.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Activity;
