"use client"

import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { CreatorType } from "@/app/_components/Explore";

export default function ExploreOthers() {
    const params = useParams();
    const [userId, setUserId] = useState("");
    const [creator, setCreator] = useState<CreatorType>()

    useEffect(() => {
        const getUserId = async () => {
            const response = await axios.get(`${BASE_URL}/users?username=${params.name}`);
            setUserId(response.data.users[0].id)
        }
        getUserId();
    }, [params.name])

    useEffect(() => {
        const getCreatorInfo = async () => {
            const response = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`);
            setCreator(response.data.profile[0])
        }
        getCreatorInfo()
    }, [userId])

    console.log(creator)

    return (
        <div className="w-full h-screen">
            <Header />


            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${creator?.background_image ? creator?.background_image : ""})` }}>
            </div>

            <div className="w-[90%] gap-5 mt-[-100px] mx-auto flex">
                <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5 justify-self-center">
                    <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <div className="w-full h-[48px] flex justify-between">
                            <div className="w-[107px] h-[48px] flex gap-3 items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="w-[83px] h-[20px] font-bold">{`${creator?.name}`}</p>
                            </div>
                        </div>

                        <div className="w-full h-[33px] flex justify-center items-center">
                            <Separator />
                        </div>

                        <div className="w-full h-[88px]">
                            <h6 className="w-full h-[36px] self-center text-black font-semibold">
                                {`About ${creator?.name}`}
                            </h6>
                            <p className="w-full h-fit">
                                {creator?.about}
                            </p>
                        </div>
                    </div>

                    <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <h6 className="w-full h-[36px] self-center text-black font-semibold">
                            Social media URL
                        </h6>
                        <p>{creator?.social_media_url}</p>
                    </div>

                    <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <h6 className="w-full h-[36px] self-center text-black font-semibold">
                            Recent Supporters
                        </h6>
                        <div className="w-full h-[140px] border border-[#F4F4F5] rounded-md flex justify-center items-center">
                            <div>
                                <p className="justify-self-center">
                                    <Heart fill="black" />
                                </p>
                                <h6 className="text-black font-semibold">
                                    {`Be the first one to support ${creator?.name}`}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <BuyCoffee />
            </div>
        </div>
    );
}