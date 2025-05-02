"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jwtDecode } from "jwt-decode";
import { ChevronDown, Coffee, Router } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { CreatorType } from "./Explore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type DecodeType = {
  email: string;
  id: string;
  username: string;
};

export function Header() {
  const [userId, setUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CreatorType>();
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: DecodeType = jwtDecode(token);
      setUserId(decode.id);
    }
  }, []),
    useEffect(() => {
      const getName = async () => {
        const response = await axios.get(
          `${BASE_URL}/profiles?user_id=${userId}`
        );
        setCurrentUser(response.data.profile[0]);
      };
      getName();
    }, [userId]);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setUserId(null);
      router.push("/login")

    };
  

  return (
    <div className="fixed top-0 bg-white flex w-full h-[56px] items-center justify-center z-10 pt-4">
      <div className="w-[90%] h-[40px] flex justify-between items-center">
        <Link href={`/?user_id=${userId}`}>
          <div className="w-[151px] h-[24px] flex gap-2 items-center">
            <Coffee />
            <p className="text-black font-bold">Buy Me Coffee</p>
          </div>
        </Link>
        <div >
          <Popover>
            <PopoverTrigger className="w-fit h-[40px] flex gap-2 items-center">
              <Link href="/profile">
                <Avatar>
                  <AvatarImage
                    className="object-cover object-center"
                    src={currentUser?.avatar_image}
                  />
                  <AvatarFallback>
                    {currentUser?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              {currentUser && (
                <p className="w-fit h-[20px] font-[500]">{currentUser?.name}</p>
              )}
              <ChevronDown size={20} />
            </PopoverTrigger>
            <PopoverContent className="flex justify-center">
              <Button onClick={handleLogout}>Logout</Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
