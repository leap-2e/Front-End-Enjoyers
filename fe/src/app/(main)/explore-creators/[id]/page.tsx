"use client"

import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExploreOthers() {
    const params = useParams();
    const [creator, setCreator] = useState([]);

    useEffect(() => {
        const getCreatorInfo = async () => {
            const response = await axios.get(`${BASE_URL}/profiles?user_id=${params.id}`);
            setCreator(response.data.profile)
        }
        getCreatorInfo();
    }, [params.id])



    return (
        <div className="w-full h-screen">
            <Header />


            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center">
            </div>



            <div className="w-[90%] gap-5 mt-[-100px] mx-auto flex">
                <EditProfile />

                <BuyCoffee />
            </div>
        </div>
    );
}