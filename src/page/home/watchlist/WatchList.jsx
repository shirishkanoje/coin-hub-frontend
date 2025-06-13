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
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWatchlist,
  removeFromWatchlist,
} from "@/State/Watchlist/Actions";

const WatchList = () => {
  const { watchlist } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleRemoveFromWatchlist = (coinId) => {
    dispatch(
      removeFromWatchlist({ coinId, jwt: localStorage.getItem("jwt") })
    );
    console.log("Removed from watchlist:", coinId);
  };

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

      {/* Glass container */}
      <div className="h-full overflow-y-auto px-4 pb-24">
        <div className="rounded-xl bg-black/65 backdrop-blur-md p-6 mt-4 border border-white/20 text-white">
          <h1 className="font-bold text-3xl pb-5">Watchlist</h1>

          <Table className="border border-white/10">
            <TableHeader>
              <TableRow>
                <TableHead className="py-5">Coin</TableHead>
                <TableHead>SYMBOL</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>MARKET CAP</TableHead>
                <TableHead>24h</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead className="text-right text-red-400">REMOVE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {watchlist?.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>{item.symbol.toUpperCase()}</TableCell>
                  <TableCell>{item.total_volume.toLocaleString()}</TableCell>
                  <TableCell>{item.market_cap.toLocaleString()}</TableCell>
                  <TableCell>{item.price_change_percentage_24h.toFixed(2)}%</TableCell>
                  <TableCell>$ {item.current_price}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFromWatchlist(item.id)}
                      size="icon"
                      className="h-10 w-10"
                    >
                      <BookmarkIcon className="w-6 h-6 text-red-500" />
                    </Button>
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

export default WatchList;
