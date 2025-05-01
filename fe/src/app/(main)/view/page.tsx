"use client";

import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { CreatorType } from "@/app/_components/Explore";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export type DecodeType = {
    email: string,
    id: string,
    username: string
};

export default function ViewPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [userId, setUserId] = useState("");
    const [file, setFile] = useState<string | File>("");
    const [currentProfile, setCurrentProfile] = useState<CreatorType>();
    const [hasCover, setHasCover] = useState(false);
    const [isEditingCover, setIsEditingCover] = useState(false);

    const handleImage = (event: ChangeEvent) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        setImageUrl(window.URL.createObjectURL(file))
        setFile(file);
        setIsEditingCover(true);
    };

    const handleChangeImage = (event: ChangeEvent) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        setImageUrl(window.URL.createObjectURL(file));
        setIsEditingCover(true);
    };

    const cancelButton = () => {
        setIsEditingCover(false);
    };

    const searchParams = useSearchParams();

    useEffect(() => {
        const getProfileInfo = async () => {
            const userId = searchParams.get('user_id');
            setUserId(userId as string)
            const response = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`)
            setCurrentProfile(response.data.profile[0])
        }
        getProfileInfo()
    }, [])

    const UPLOAD_PRESET = 'ml_default';
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", UPLOAD_PRESET);

    const saveChanges = async () => {
        setHasCover(true);
        setIsEditingCover(false);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            });
        const { url } = await response.json();

        const res = await axios.post(`${BASE_URL}/profiles/image`, { background_image: url, user_id: userId });
    };

    return (
        <div className="w-full h-screen">

            <Header />

            <div className="w-full h-[319px] flex justify-center items-center bg-cover bg-center mt-[56px] relative" style={{ backgroundImage: `url('${imageUrl ? imageUrl : "bg-[#F4F4F5]"}')` }}>

                {!hasCover && !isEditingCover && (
                    <div className="bg-black rounded-md">
                        <Label htmlFor="background" className="py-2 px-4 bg-transparent text-white flex gap-3 cursor-pointer"><Camera />Add image</Label>
                        <input id="background" type="file" className="hidden" onChange={handleImage} />
                    </div>
                )}

                {isEditingCover && (
                    <div className="absolute top-2 right-10 flex gap-3">
                        <Button onClick={saveChanges} className="bg-black text-white hover:bg-[#F4F4F5] hover:text-black">Save changes</Button>
                        <Button onClick={cancelButton} className="bg-[#F4F4F5] text-black hover:text-white hover:bg-black">Cancel</Button>
                    </div>
                )}

                {hasCover && !isEditingCover && (
                    <div className="flex absolute top-2 right-10 bg-[#F4F4F5] text-black hover:bg-black hover:text-white rounded-md">
                        <Label htmlFor="cover" className="py-2 px-3 flex gap-2"><Camera />Change cover</Label>
                        <input id="cover" type="file" className="hidden" onChange={handleChangeImage} />
                    </div>
                )}

            </div>

            <div className="w-[90%] flex gap-5 mt-[-100px] mx-auto relative">

                <EditProfile currentProfile={currentProfile} />

                <BuyCoffee />

            </div>
        </div>
    )
};