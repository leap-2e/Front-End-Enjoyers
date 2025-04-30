"use client"
import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CreatorType } from "@/app/_components/Explore";

export type DecodeType = {
    email: string,
    id: string,
    username: string
}

export default function ViewPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState<string | File>("");
    const [userId, setUserId] = useState("");
    const [currentProfile, setCurrentProfile] = useState<CreatorType | undefined>();

    const handleImage = (event: ChangeEvent) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        setImageUrl(window.URL.createObjectURL(file))
        setFile(file);
    };

    const cancelButton = () => {
        setImageUrl("");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode: DecodeType = jwtDecode(token);
            setUserId(decode.id)
        }
    }, [])

    useEffect(() => {
        const getProfileInfo = async () => {
            const response = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`)
            setCurrentProfile(response.data.profile[0])
        }
        getProfileInfo()
    }, [userId])

    const UPLOAD_PRESET = 'ml_default';
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", UPLOAD_PRESET);

    const saveChanges = async () => {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            });
        const { url } = await response.json();

        const res = await axios.post(`${BASE_URL}/profiles/image`, { background_image: url, user_id: userId })
        console.log(res, "res")
    }

    return (
        <div className="w-full h-screen">

            <Header />

            <div className="w-full h-[319px] flex justify-center items-center bg-cover bg-center mt-[56px] relative" style={{ backgroundImage: `url('${imageUrl ? imageUrl : "bg-[#F4F4F5]"}')` }}>
                <div className={`bg-black rounded-md ${imageUrl ? "hidden" : "block"}`}>
                    <Label htmlFor="background" className="py-2 px-5 bg-transparent text-white flex gap-3"><Camera />Add image</Label>
                    <input id="background" type="file" className="hidden" onChange={handleImage} />
                </div>

                <div className={`absolute top-2 right-10 flex gap-3 ${imageUrl ? "block" : "hidden"}`}>
                    <Button onClick={saveChanges} className="bg-black text-white hover:bg-[#F4F4F5] hover:text-black">Save changes</Button>
                    <Button onClick={cancelButton} className="bg-[#F4F4F5] text-black hover:text-white hover:bg-black">Cancel</Button>
                </div>
            </div>

            <div className="w-[90%] flex gap-5 mt-[-100px] mx-auto relative">

                <EditProfile currentProfile={currentProfile} />

                <BuyCoffee />

            </div>
        </div>
    )
}