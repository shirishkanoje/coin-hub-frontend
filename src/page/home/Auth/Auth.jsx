import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import Signupform from "./Signupform";
import { Button } from "@/components/ui/button";
import Forgotpass from "./Forgotpass";
import Signinform from "./Signinform";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      <div >
        <div className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md 
          z-50 bg-white bg-opacity-90 shadow-2xl shadow-white px-10">

          {/* Branding / Title */}
          <h1 className="text-6xl font-bold pb-6">CoinHub</h1>

          {/* Conditional Rendering for Different Routes */}
          {location.pathname === "/signup" ? (
            <section className="w-full">
              <Signupform />
              <div className="flex items-center justify-center pt-4">
                <span>Already have an account?</span>
                <Button onClick={() => navigate("/signin")} variant="ghost">
                  Signin
                </Button>
              </div>
            </section>
          ) : location.pathname === "/forgot-password" ? (
            <section className="w-full">
              <Forgotpass />
              <div className="flex items-center justify-center mt-2">
                <span>Back to Login</span>
                <Button onClick={() => navigate("/signin")} variant="ghost">
                  Signin
                </Button>
              </div>
            </section>
          ) : (
            <section className="w-full">
              <Signinform />
              <div className="flex items-center justify-center">
                <span>Don't have an account?</span>
                <Button onClick={() => navigate("/signup")} variant="ghost">
                  Signup
                </Button>
              </div>
              
              {/* Forgot Password Button */}
              <div className="mt-10">
                <Button
                  className="w-full py-5 border border-gray-300"
                  onClick={() => navigate("/forgot-password")}
                  variant="outline"
                >
                  Forgot Password
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
