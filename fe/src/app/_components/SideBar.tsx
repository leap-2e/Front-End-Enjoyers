"use client";

import { BASE_URL } from "@/constants";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserType = {
  username: string;
};

export function SideBarComponent() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username") as string;
    setUserName(username);
  }, []);

  const getId = async () => {
    const users = await axios.get(`${BASE_URL}/users`);
    const user = users.data.users.filter((user: UserType) => {
      if (userName === user.username) {
        return user;
      }
    });
    setUserId(user[0].id);
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    <div className="min-w-[260px] max-w-[300px] h-screen">
      <nav className="mt-[100px]">
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <span className="block p-2 rounded-md hover:bg-[#F4F4F5]">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <span className="block p-2 rounded-md hover:bg-[#F4F4F5]">
                Explore
              </span>
            </Link>
          </li>
          <li>
            <Link href="/view">
              <span className="flex items-center gap-1 p-2 rounded-md hover:bg-[#F4F4F5]">
                View page
                <ExternalLink size={15} />
              </span>
            </Link>
          </li>
          <li>
            <Link href={`/settings/${userId}`}>
              <span className="block p-2 rounded hover:bg-[#F4F4F5]">
                Account settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
