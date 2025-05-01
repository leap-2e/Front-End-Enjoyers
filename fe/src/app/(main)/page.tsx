"use client"
import { useSearchParams } from "next/navigation";
import { Dashboard } from "../_components/Dashboard";
import { Header } from "../_components/Header";
import { SideBarComponent } from "../_components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

export type DonationType = {
name: string,
amount: number,
date: string,
url: string,
avatar: string,
message: string
}

export default function Home() {
  const [donations, setDonations] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    const getDonationInfo = async () => {
      const response = await axios.get(`${BASE_URL}/donations?user_id=${userId}`);
      setDonations(response.data.donations);
      const res = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`);
      setCurrentProfile(res.data.profile[0]);
    }
    getDonationInfo()
  }, [userId])

  return (
    <>
      <Header />
      <div className="w-full flex gap-4 px-[80px]">
        <SideBarComponent />
        <Dashboard donations={donations} currentProfile={currentProfile} />
      </div>
    </>
  );
}
