"use client";

import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// type User = {
//   username: string;
//   avatar: string | null | undefined;
//   id: number;
//   socialURL: string;
//   about: string;
//   donation: number;
//   time: string;
// }

interface User {
  username: string;
  avatar: string | null | undefined; // Adjust the type as needed
  // ... other user properties
}

const users = [
  {
    id: 1,
    username: "Guest",
    socialURL: "instagram.com/welesley",
    avatar: '/api/placeholder/50/50',
    about: "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment",
    donation: 1,
    time: "10 hours ago"
  },
  {
    id: 2,
    username: "John Doe",
    socialURL: "buymeacoffee.com/bdsadas",
    avatar: "https://buy.stripe.com/test_bJ1aG8123456789mno",
    about: "Thank you for being so awesome everyday!",
    donation: 10,
    time: "10 hours ago"
  },
  {
    id: 3,
    username: "Radicals",
    socialURL: "buymeacoffee.com/gkfgrew",
    avatar: '/api/placeholder/50/50',
    about: null,
    donation: 2,
    time: "10 hours ago"
  },
  {
    id: 4,
    username: "Guest",
    socialURL: "facebook.com/penelopeb",
    avatar: "https://buy.stripe.com/test_bJ1aG8123456789mno",
    about: null,
    donation: 5,
    time: "10 hours ago"
  },
  {
    id: 5,
    username: "Fan1",
    socialURL: "buymeacoffee.com/supporterone",
    avatar: "https://buy.stripe.com/test_bJ1aG8123456789mno",
    about: "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you.... Show more",
    donation: 10,
    time: "10 hours ago"
  },
  {
    id: 6,
    username: "Guest",
    socialURL: "instagram.com/welesley",
    avatar: null,
    about: null,
    donation: 1,
    time: "10 hours ago"
  }
];

export const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 200;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const text =
    "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn’t that much money it’s all I can contribute at the moment. When I become successful I will be sure to buy you more gifts and donations. Thank you again. ";

  const isLongText = text.length > limit;
  const displayText =
    isExpanded || !isLongText ? text : text.slice(0, limit) + "...";

  const options: any = [
    { label: "$1", value: "1" },
    { label: "$2", value: "2" },
    { label: "$5", value: "5" },
    { label: "$10", value: "10" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const dropdownRef: any = useRef(null);

  const toggleOption = (value: any) => {
    setSelected((prev: any) =>
      prev.includes(value)
        ? prev.filter((v: any) => v !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-3/4">
      <div className="w-full h-[257px] p-6 mt-[100px]">
        <Card>
          <CardHeader>
            <div className="">
              <div className="flex justify-between">
                <div className="flex  gap-1">
                  <Avatar className="w-[48px] h-[48px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col  ml-2 mt-2 gap-1">
                    <CardTitle>Jake </CardTitle>
                    <CardDescription>
                      <p>buymeacoffee.com/baconpancakes1</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <button className="w-[159px] h-[40px] bg-black text-white rounded-lg ">
                    <p>
                      <img
                        className="inline-block mr-3"
                        src="copy.png"
                        alt=""
                      />
                      Share page link
                    </p>
                  </button>
                </div>
              </div>
              <Separator className="m-7" />
              <div>
                <div className="flex gap-4">
                  <h4 className="mt-1">Earnings</h4>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Last 30 days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Last 30 days</SelectItem>
                      <SelectItem value="dark">Last 90 days</SelectItem>
                      <SelectItem value="system">All times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <h1 className="font-bold text-4xl mt-4">$450</h1>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="w-full h-[716px] p-6">
        <div className="flex justify-between pt-4  pb-1">
          <h1 className="font-semibold text-base">Recent transactions</h1>
          <div className="relative mb-2">
            <button
              className="w-[109px] h-[36px] border px-4 py-2 text-left rounded-md bg-white shadow flex justify-center items-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDown />
              {selected.length > 0
                ? selected.map((val: any) => `$${val}`).join(", ")
                : "Amount"}
            </button>

            {isOpen && (
              <div
                className="absolute z-10 mt-1 w-full border rounded bg-white shadow"
                ref={dropdownRef}
              >
                {options.map((option: any) => (
                  <label
                    key={option.value}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(selected || []).includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-[12px] p-3">
              <div>
                {users.map((user) => {
                  return (
                    <div key={user.id} className="mb-4">
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <Avatar className="w-[40px] h-[40px]">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col  ml-1 mt-1 gap-1">
                            <CardTitle>Guest</CardTitle>
                            <CardDescription>
                              <p>{user.socialURL}</p>
                            </CardDescription>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-base justify-self-end">{`$${user.donation}`}</span>
                          <p className="text-[#71717A]">{user.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">{user.about}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardHeader>
        </Card>

      </div>
    </div>
  );
};