"use client"
import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function ViewPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState< string | File >("");

    const UPLOAD_PRESET = 'ml_default';
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", UPLOAD_PRESET);

    const handleImage = (event: ChangeEvent) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        setImageUrl(window.URL.createObjectURL(file))
        setFile(file);
    }
    return (
        <div className="w-full h-screen">

            <Header />

            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center">
                {imageUrl
                    ? <img src={imageUrl} className="object-none" />
                    : <div className="bg-black rounded-2xl">
                        <Label htmlFor="background" className="py-3 px-5 bg-transparent text-white flex gap-3"><Camera />Add image</Label>
                        <input id="background" type="file" className="hidden" onChange={handleImage} />
                    </div>}
            </div>

            <div className="w-[90%] flex gap-5 mt-[-100px] mx-auto">

                <EditProfile />

                <BuyCoffee />

            </div>
        </div>
    )
}