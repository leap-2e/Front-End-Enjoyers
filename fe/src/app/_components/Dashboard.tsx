"use client";
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
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { DonationType } from "../(main)/page";
import { nanoid } from "nanoid"
import { CreatorType } from "./Explore";
import { BASE_URL } from "@/constants";
import axios from "axios";

export const Dashboard = ({ donations, currentProfile }: { donations: DonationType[] | undefined, currentProfile: CreatorType | undefined }) => {

  useEffect(() => {
    const getTotalAmount = async () => {
      const response = await axios.get(`${BASE_URL}/donations/total?user_id=${currentProfile?.user_id}`);
      console.log(response.data)
    }
    getTotalAmount()
  }, [currentProfile?.user_id])

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
    <div className="w-3/4 max-h-screen overflow-auto">
      <div className="w-full h-[257px] p-6 mt-[100px]">
        <Card>
          <CardHeader>
            <div className="">
              <div className="flex justify-between">
                <div className="flex  gap-1">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={currentProfile?.avatar_image}
                    alt=""
                  />
                  <div className="flex flex-col  ml-2 mt-2 gap-1">
                    <CardTitle>{currentProfile?.name}</CardTitle>
                    <CardDescription>
                      <p>{currentProfile?.social_media_url}</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <button className="w-[159px] h-[40px] bg-black text-white rounded-lg ">
                    <p>
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
              {/* <img className="w-2 h-1 mt-2" src="Vector.png" alt="" /> */}
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
              {
                donations?.map((donation: DonationType) => {
                  return (
                    <div key={nanoid()}>
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={donation.avatar}
                            alt=""
                          />
                          <div className="flex flex-col  ml-1 mt-1 gap-1">
                            <CardTitle>{donation.name}</CardTitle>
                            <CardDescription>
                              <p>{donation.url}</p>
                            </CardDescription>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-base ">{`+$${donation.amount}`}</span>
                          <p className="text-[#71717A]">{`${donation.date.slice(0, 10)}`}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">
                          {donation.message}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
