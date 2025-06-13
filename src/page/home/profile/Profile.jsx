import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VerifiedIcon } from "lucide-react";
import React, { useState } from "react";
import AccountVerificationForm from "./AccountVerificationForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    email: auth.user?.email || "",
    fullName: auth.user?.fullName || "",
    dateOfBirth: "27/08/2004",
    nationality: "Indian",
    address: "SKNSITS, LONAVALA",
    city: "Lonavala",
    postcode: "410401",
    country: "India",
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEnabledTwoStepVerification = () => {
    console.log("Two-step verification enabled");
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveChanges = () => {
    console.log("Saved profile information:", formData);
    setIsEditable(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
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

      {/* Content Wrapper */}
      <div className="relative z-10 flex justify-center items-start pt-20 px-4">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 w-full max-w-5xl text-white shadow-lg">
          {/* User Info Card */}
          <Card className="bg-transparent border border-white/70 text-white">
            <CardHeader className="pb-9">
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="lg:flex gap-32">
                <div className="space-y-7">
                  <div className="flex">
                    <p className="w-[9rem]">Email :</p>
                    <p className="text-gray-300">{formData.email}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">Fullname :</p>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">Date of Birth :</p>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">Nationality :</p>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
                <div className="space-y-7">
                  <div className="flex">
                    <p className="w-[9rem]">Address :</p>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">City :</p>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">Postcode :</p>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="flex">
                    <p className="w-[9rem]">Country :</p>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 px-1 text-white"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit/Save Buttons */}
          <div className="mt-6 flex gap-4">
            {isEditable ? (
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            ) : (
              <Button onClick={toggleEditMode}>Edit</Button>
            )}
          </div>

          {/* 2-Step Verification Card */}
          <div className="mt-6">
            <Card className="bg-transparent border border-white/20 text-white">
              <CardHeader className="pb-7">
                <div className="flex items-center gap-3">
                  <CardTitle>2 Step Verification</CardTitle>
                  {true ? (
                    <Badge className="bg-green-600 text-white space-x-2">
                      <VerifiedIcon />
                      <span>Enabled</span>
                    </Badge>
                  ) : (
                    <Badge className="bg-orange-500">Disabled</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify your account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm
                      handleSubmit={handleEnabledTwoStepVerification}
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
