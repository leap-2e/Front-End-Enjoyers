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
import { useEffect, useState } from "react";
import { nanoid } from "nanoid"
import { CreatorType } from "./Explore";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { DonationType } from "./HomeContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";

export const Dashboard = ({ donations, currentProfile }: { donations: DonationType[] | undefined, currentProfile: CreatorType | undefined }) => {

  const [totalAmount, setTotalAmount] = useState("");
  const [amount, setAmount] = useState<String>("all");

  const filteredAmount = donations?.filter((donation) => {
    if (amount === "all") {
      return donation
    } else {
      if (donation.amount === Number(amount)) {
        return donation
      }
    }
  })

  useEffect(() => {
    const getTotalAmount = async () => {
      const response = await axios.get(`${BASE_URL}/donations/total?user_id=${currentProfile?.user_id}`);
      setTotalAmount(response.data.total[0].sum)
    }
    getTotalAmount()
  }, [currentProfile?.user_id])

  return (
    <div className="w-3/4 max-h-screen overflow-auto">
      <div className="w-full h-[257px] p-6 mt-[100px]">
        <Card>
          <CardHeader>
            <div className="">
              <div className="flex justify-between">
                <div className="flex  gap-1">
                  <Avatar className="w-12 h-12 rounded-full">
                    <AvatarImage
                      src={currentProfile?.avatar_image}
                      alt="avatar_image" />
                    <AvatarFallback>{currentProfile?.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
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
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="all">All times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <h1 className="font-bold text-4xl mt-4">{`$${totalAmount}`}</h1>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="w-full h-[716px] p-6">
        <div className="flex justify-between pt-4  pb-1">
          <h1 className="font-semibold text-base">Recent transactions</h1>
          <div className="relative mb-2">
            <div className="flex gap-4">
              <Select onValueChange={(event) => setAmount(event)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" >All</SelectItem>
                  <SelectItem value="1" >$1</SelectItem>
                  <SelectItem value="2" >$2</SelectItem>
                  <SelectItem value="5" >$5</SelectItem>
                  <SelectItem value="10" >$10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-[12px] p-3">
              {filteredAmount && filteredAmount.length > 0 &&
                filteredAmount?.map((donation: DonationType) => {
                  return (
                    <div key={nanoid()}>
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <Avatar>
                            <AvatarImage className="w-12 h-12 rounded-full"
                              src={donation.avatar}
                              alt="avatar_image" />
                            <AvatarFallback>{currentProfile?.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
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
              {amount === "all" && filteredAmount?.length === 0 &&
                <div className="flex flex-col justify-center items-center">
                  <div className="w-12 h-12 rounded-full bg-[#F4F4F5] flex justify-center items-center"><Heart /></div>
                  <p>You don't have any supporters yet.</p>
                  <p>Share your page with your audience to get started.</p>
                </div>
              }
              {
                amount !== "all" && filteredAmount?.length === 0 &&
                <div className="place-self-center">
                  <p>{`You have not recieved any $${amount} donation yet.`}</p>
                </div>
              }
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
