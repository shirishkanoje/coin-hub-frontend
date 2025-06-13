import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DotIcon, MessageCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home1 = () => {
  const [category, setCategory] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [page] = useState(0);

  const dispatch = useDispatch();
  const { loading, coinList, top50, error } = useSelector((state) => state.coin);

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);
  const handleCategory = (value) => setCategory(value);
  const handleChange = (e) => setInputValue(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);

  useEffect(() => {
    dispatch(getCoinList(1));
  }, [dispatch, page]);

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
      <div className="h-full overflow-y-auto pr-2 pb-24">
        <div className="lg:flex">
          {/* Left side */}
          <div className="lg:w-1/2 px-4">
            <div className="py-4 flex flex-wrap gap-3">
              {['all', 'top50', 'topGainers', 'topLosers'].map((item) => (
                <Button
                  key={item}
                  onClick={() => handleCategory(item)}
                  variant={category === item ? 'default' : 'outline'}
                  className="rounded-full"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace("top", "Top ")}
                </Button>
              ))}
            </div>

            <div className="rounded-xl bg-black/65 backdrop-blur-md p-4 border border-white/20 text-white">
              {loading ? (
                <p className="text-center p-5">Loading coins...</p>
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : (
                <AssetTable coin={category === "all" ? coinList : top50} category={category} />
              )}

              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:w-1/2 px-4 pt-4 flex flex-col gap-4">
            <div className="h-[60vh] rounded-xl border border-white/20 bg-black/65 backdrop-blur-md overflow-hidden p-2 text-white">
              <StockChart coinId={"bitcoin"} />
            </div>

            <div className="h-[15vh] flex gap-5 items-center px-4 py-2 rounded-xl border border-white/20 bg-black/75 backdrop-blur-md text-white">
              <Avatar>
                <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p>BTC</p>
                  <DotIcon className="text-gray-300" />
                  <p className="text-gray-300">Bitcoin</p>
                  <h2 className="text-gray-300">[Sponser]</h2>
                  <h2 className="text-gray-300">[YOU CAN ALSO BUY THIS TO MAKE MORE PROFIT]</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bot (still optional, left commented if not ready) */}
      {/* 
      <section className="fixed bottom-3 right-3 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRelease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] h-[55vh] bg-black/40 backdrop-blur-md text-white shadow-xl">
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p className="font-semibold">Chat Bot</p>
              <Button onClick={handleBotRelease} variant="ghost" size="icon">
                <X />
              </Button>
            </div>

            <div className="h-[76%] overflow-y-auto px-5 py-3 gap-3 flex flex-col">
              <div className="self-start bg-slate-800 px-4 py-2 rounded-md max-w-[80%]">
                <p>Hi, trader 👋</p>
                <p>You can ask any crypto-related question</p>
              </div>
              {[1, 1, 1, 1].map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i % 2 === 0 ? 'self-start' : 'self-end'
                  } bg-slate-800 px-4 py-2 rounded-md max-w-[80%]`}
                >
                  <p>{i % 2 === 0 ? 'Prompt: Who are you?' : 'Answer: I’m your crypto bot 💬'}</p>
                </div>
              ))}
            </div>

            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full border-none outline-none bg-slate-800 text-white"
                placeholder="Ask something..."
                onChange={handleChange}
                value={inputValue}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}

        <Button
          onClick={handleBotRelease}
          className="w-[10rem] h-[3rem] gap-2 items-center bg-slate-800 text-white hover:bg-white hover:text-black"
        >
          <MessageCircle size={24} className="fill-current -rotate-90 stroke-none" />
          <span className="text-lg">Chat Bot</span>
        </Button>
      </section>
      */}
    </div>
  );
};

export default Home1;
