import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const baseUrl = "https://coin-hub-backend.onrender.com";

const Forgotpass = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState("");

  // 🔹 STEP 1: SEND OTP
  const sendOtp = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/users/reset-password/send-otp`,
        {
          sendTo: email,
          verificationType: "EMAIL",
        }
      );

      setSession(res.data.session);
      setStep(2);

      alert("OTP sent to your email");

    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // 🔹 STEP 2 → STEP 3
  const verifyOtp = () => {
    if (!otp) {
      alert("Enter OTP first");
      return;
    }
    setStep(3);
  };

  // 🔹 STEP 3: RESET PASSWORD
  const resetPassword = async () => {
    try {
      await axios.post(
        `${baseUrl}/auth/users/reset-password/verify-otp?id=${session}`,
        {
          otp,
          password,
        }
      );

      alert("Password updated successfully");

      // ✅ Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err);
      alert("Invalid OTP or error");
    }
  };

  return (
    <div className="space-y-4">

      {/* STEP 1: EMAIL */}
      {step === 1 && (
        <>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={sendOtp} className="w-full">
            Send OTP
          </Button>
        </>
      )}

      {/* STEP 2: OTP */}
      {step === 2 && (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button onClick={verifyOtp} className="w-full">
            Verify OTP
          </Button>
        </>
      )}

      {/* STEP 3: NEW PASSWORD */}
      {step === 3 && (
        <>
          <Input
            placeholder="Enter new password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={resetPassword} className="w-full">
            Reset Password
          </Button>
        </>
      )}

    </div>
  );
};

export default Forgotpass;
