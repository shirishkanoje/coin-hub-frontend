// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, Search } from "lucide-react";
// import React from "react";
// import Sidebar1 from "./Sidebar1";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const auth = useSelector(state => state.auth);

//   return (
//     <div className="px-4 py-3 border-b bg-black text-white sticky top-0 left-0 right-0 flex justify-between items-center z-50 h-16"> {/* Fixed height */}
//       <div className="flex items-center gap-3">
//         {/* Sidebar Button */}
//         <Sheet>
//           <SheetTrigger asChild>
//             <button className="p-2 rounded-md border bg-neutral-900 text-white hover:bg-neutral-800">
//               <Menu className="h-6 w-6" />
//             </button>
//           </SheetTrigger>
//           <SheetContent className="w-72   bg-black text-white" side="left">
//             <SheetHeader>
//               <SheetTitle>
//                 <div className="text-3xl flex justify-center items-center gap-2">
//                   <img
//                     src="/coinlogo.png"
//                     alt="CoinHub Logo"
//                     className="h-20 w-20 object-contain"
//                   />
//                 </div>
//               </SheetTitle>
//             </SheetHeader>
//             <Sidebar1 />
//           </SheetContent>
//         </Sheet>

//         {/* App Name with Logo */}
//         <div className="flex items-center gap-6 flex-grow">
//           <img
//             src="/coinlogo.png"
//             alt="CoinHub Logo"
//             className="h-25 w-25 object-contain"
//           />
//         </div>

//         {/* Search Button & Lightning Icon */}
//         <div className="ml-auto flex items-center gap-6">
//           <Button
//             variant="outline"
//             className="flex items-center gap-3 px-4 py-2 border-white text-white bg-neutral-900 hover:bg-neutral-800 flex-grow"
//           >
//             <Search className="h-5 w-5" />
//             <span>Search</span>
//           </Button>

//           <a
//             href="https://yourwebsite.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               src="/flash.png"
//               alt="Lightning Icon"
//               className="h-12 w-14 cursor-pointer transition-transform transform hover:scale-110 mix-blend-lighten object-contain"
//             />
//           </a>
//         </div>
//       </div>

//       {/* Avatar with User Initial */}
//       <div>
//         <Avatar>
//           <AvatarFallback className="text-black">
//             {auth.user?.fullName[0].toUpperCase()}
//           </AvatarFallback>
//         </Avatar>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu, Search } from "lucide-react";
// import React, { useState } from "react";
// import Sidebar1 from "./Sidebar1";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Navbar = () => {
//   const auth = useSelector((state) => state.auth);
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     try {
//       const res = await axios.get(`http://localhost:8080/search?q=${query}`);
//       const coins = res.data.coins || []; // Adjust depending on response structure
//       setResults(coins);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error("Search failed", err);
//     }
//   };

//   const handleSelectCoin = (coin) => {
//     console.log("Coin clicked:", coin); // You can route to coin page or set selected coin
//     setShowDropdown(false);
//     setQuery("");
//   };

//   return (
//     <div className="px-4 py-3 border-b bg-black text-white sticky top-0 left-0 right-0 flex justify-between items-center z-50 h-16">
//       {/* Left: Sidebar + Logo */}
//       <div className="flex items-center gap-3">
//         <Sheet>
//           <SheetTrigger asChild>
//             <button className="p-2 rounded-md border bg-neutral-900 text-white hover:bg-neutral-800">
//               <Menu className="h-6 w-6" />
//             </button>
//           </SheetTrigger>
//           <SheetContent className="w-72 bg-black text-white" side="left">
//             <SheetHeader>
//               <SheetTitle>
//                 <div className="text-3xl flex justify-center items-center gap-2">
//                   <img
//                     src="/coinlogo.png"
//                     alt="CoinHub Logo"
//                     className="h-20 w-20 object-contain"
//                   />
//                 </div>
//               </SheetTitle>
//             </SheetHeader>
//             <Sidebar1 />
//           </SheetContent>
//         </Sheet>

//         <div className="flex items-center gap-6 flex-grow">
//           <img
//             src="/coinlogo.png"
//             alt="CoinHub Logo"
//             className="h-25 w-25 object-contain"
//           />
//         </div>
//       </div>

//       {/* Middle: Search */}
//       <div className="relative flex items-center gap-2 ml-auto mr-6">
//         <input
//           type="text"
//           placeholder="Search Coin"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => results.length > 0 && setShowDropdown(true)}
//           className="px-3 py-2 rounded-md bg-neutral-800 text-white border border-white focus:outline-none w-64"
//         />
//         <Button
//           variant="outline"
//           onClick={handleSearch}
//           className="flex items-center gap-2 px-4 py-2 border-white text-white bg-neutral-900 hover:bg-neutral-800"
//         >
//           <Search className="h-5 w-5" />
//           <span>Search</span>
//         </Button>

//         {/* Dropdown for Results */}
//         {showDropdown && results.length > 0 && (
//           <div className="absolute top-12 left-0 w-[300px] bg-white text-black rounded-md shadow-md z-50 max-h-64 overflow-y-auto">
//             {results.map((coin, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleSelectCoin(coin)}
//                 className="p-3 border-b cursor-pointer hover:bg-gray-100"
//               >
//                 <p className="font-medium">{coin.name}</p>
//                 <p className="text-sm text-gray-600">{coin.symbol}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Right: Avatar */}
//       <div>
//         <Avatar>
//           <AvatarFallback className="text-black">
//             {auth.user?.fullName[0].toUpperCase()}
//           </AvatarFallback>
//         </Avatar>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// 



import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import Sidebar1 from "./Sidebar1";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchMarketChart } from "@/State/Coin/Action";

const timeseries = [
  { keyword: "DIGITAL_CURRENCY_DAILY", key: "Time Series (Daily)", label: "1 Day", value: 1 },
  { keyword: "DIGITAL_CURRENCY_WEEKLY", key: "Weekly Time Series", label: "1 Week", value: 7 },
  { keyword: "DIGITAL_CURRENCY_MONTHLY", key: "Monthly Time Series", label: "1 Month", value: 30 },
  { keyword: "DIGITAL_CURRENCY_YEARLYLY", key: "Yearly Time Series", label: "1 Year", value: 365 },
];

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeLabel, setActiveLabel] = useState(timeseries[0]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5454/api/coins/details/${query.toLowerCase()}`);
      const coin = res.data;

      setResults([{
        name: coin.name || query,
        symbol: coin.symbol || "N/A",
        data: coin,
      }]);

      setShowDropdown(true);
    } catch (err) {
      console.error("Search failed", err);
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectCoin = (coin) => {
    setShowDropdown(false);
    setQuery("");
    setSelectedCoin(coin);

    dispatch(fetchMarketChart({
      coinId: coin.data.id,
      days: activeLabel.value,
      jwt: localStorage.getItem("jwt"),
    }));
  };

  useEffect(() => {
    const loadDefaultBitcoin = async () => {
      try {
        const res = await axios.get(`http://localhost:5454/api/coins/details/bitcoin`);
        const btc = res.data;

        const defaultCoin = {
          name: btc.name,
          symbol: btc.symbol,
          data: btc,
        };

        setSelectedCoin(defaultCoin);

        dispatch(fetchMarketChart({
          coinId: btc.id,
          days: activeLabel.value,
          jwt: localStorage.getItem("jwt"),
        }));
      } catch (err) {
        console.error("Failed to fetch default Bitcoin data", err);
      }
    };

    loadDefaultBitcoin();
  }, [dispatch, activeLabel]);

  return (
    <div className="px-4 py-3 border-b bg-black text-white sticky top-0 left-0 right-0 flex justify-between items-center z-50 h-16">
      {/* Sidebar + Logo */}
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md border bg-neutral-900 text-white hover:bg-neutral-800">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-72 bg-black text-white" side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-2">
                  <img
                    src="/coinlogo.png"
                    alt="CoinHub Logo"
                    className="h-20 w-20 object-contain"
                  />
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar1 />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-6 flex-grow">
          <img src="/coinlogo.png" alt="CoinHub Logo" className="h-25 w-25 object-contain" />
        </div>
      </div>
      <div>
          <a
            href="https://crypto-price-predictor-mu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/flash.png"
              alt="Lightning Icon"
              className="h-12 w-14 cursor-pointer transition-transform transform hover:scale-150 mix-blend-lighten object-contain"
            />
          </a>
      </div>

      {/* Search */}
      <div className="relative flex items-center gap-2 ml-auto mr-6">
        <input
          type="text"
          placeholder="Search Coin"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          className="px-3 py-2 rounded-md bg-neutral-800 text-white border border-white focus:outline-none w-64"
        />
        <Button
          variant="outline"
          onClick={handleSearch}
          className="flex items-center gap-2 px-4 py-2 border-white text-white bg-neutral-900 hover:bg-neutral-800"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Button>

        {showDropdown && results.length > 0 && (
          <div className="absolute top-12 left-0 w-[300px] bg-white text-black rounded-md shadow-md z-50 max-h-64 overflow-y-auto">
            {results.map((coin, index) => (
              <div
                key={index}
                onClick={() => handleSelectCoin(coin)}
                className="p-3 border-b cursor-pointer hover:bg-gray-100"
              >
                <p className="font-medium">{coin.name}</p>
                <p className="text-sm text-gray-600">{coin.symbol}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div>
        <Avatar>
          <AvatarFallback className="text-black">
            {auth.user?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
