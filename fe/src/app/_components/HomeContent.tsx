"use client";

import { useSearchParams } from "next/navigation";
import { Dashboard } from "../_components/Dashboard";
import { SideBarComponent } from "../_components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

export type DonationType = {
  name: string;
  amount: number;
  date: string;
  url: string;
  avatar: string;
  message: string;
};

export function HomeContent() {
  const [donations, setDonations] = useState<DonationType[] | undefined>();
  const [currentProfile, setCurrentProfile] = useState();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    const getDonationInfo = async () => {
      if (!userId) return;

      const response = await axios.get(`${BASE_URL}/donations?user_id=${userId}`);
      setDonations(response.data.donations);

      const res = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`);
      setCurrentProfile(res.data.profile[0]);
    };
    getDonationInfo();
  }, [userId]);

  return (
    <div className="w-full flex gap-4 px-[80px]">
      <SideBarComponent />
      <Dashboard donations={donations} currentProfile={currentProfile} />
    </div>
  );
}
