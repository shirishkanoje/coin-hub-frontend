import React from "react";
import { 
  BookmarkIcon, 
  CreditCardIcon, 
  HomeIcon, 
  LandmarkIcon, 
  ActivityIcon, 
  WalletIcon, 
  UserIcon, 
  LogOutIcon, 
  BriefcaseIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/State/Auth/Action";


const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/activity", icon: <ActivityIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
  { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-6 w-6" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Profile", path: "/profile", icon: <UserIcon className="h-6 w-6" /> },
  { name: "Logout", path: "/", icon: <LogOutIcon className="h-6 w-6" /> }
];

const Sidebar1 = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout =()=>{
    dispatch(logout())

  }

  return (
    <div className="mt-10 space-y-5 px-4">
      {menu.map((item) => (
        <div key={item.name}>
          <Button
            variant="outline"
            className="flex items-center gap-5 py-3 w-full border border-gray-600 text-white bg-gray-800 hover:bg-gray-700 hover:border-gray-500 transition"
            onClick={() => {
              navigate(item.path);
              document.body.click(); // ✅ Close sidebar after clicking
              if(item.name=="Logout"){
                handleLogout()
              }
            }}
          >
            <span className="w-8">{item.icon}</span>
            <p>{item.name}</p>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar1;
