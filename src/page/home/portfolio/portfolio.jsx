import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { asset } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video background */}
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
          <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change%</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asset.userAssets.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                      <AvatarImage src={item.coin.image} />
                    </Avatar>
                    <span>{item.coin.name}</span>
                  </TableCell>
                  <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.coin.price_change_24h}</TableCell>
                  <TableCell>-{item.coin.price_change_percentage_24h}</TableCell>
                  <TableCell className="text-right">
                    ${item.coin.total_volume}
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

export default Portfolio;
