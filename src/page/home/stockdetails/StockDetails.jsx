import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bookmark, BookmarkCheck, DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import TreadingForm from "./TreadingForm";
import StockChart from "../StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Actions";
import { existInWatchlist } from "@/utils/existInWatchlist";

const StockDetails = () => {
  const { coin , watchlist } = useSelector((store) => store);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") })
    );
     dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id]);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist({coinId:coin.coinDetails?.id,jwt:localStorage.getItem("jwt")}));
   
  };

  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                $
                {coin.coinDetails?.market_data.current_price.usd}
              </p>
              <p className="text-red-600">
                <span>{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                <span>
                  (
                  {coin.coinDetails?.market_data.market_cap_change_percentage_24h}
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Bookmark Button */}
          <Button
            variant="outline"
            onClick={handleAddToWatchlist}
            className={`p-2 ${
              isBookmarked
                ? "text-cyan-400 border-cyan-400"
                : "text-gray-500"
            }`}
          >
           {existInWatchlist(watchlist.items,coin.coinDetails) ? (
              <BookmarkCheck className="h-6 w-6" />
            ) : (
              <Bookmark className="h-6 w-6" />
            )}
          </Button>

          {/* Trade Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
                <DialogDescription>
                  Enter the amount you want to trade for Bitcoin.
                </DialogDescription>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-14">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
