import { BuyCoffee } from "@/app/_components/BuyCoffee";
import { EditProfile } from "@/app/_components/EditProfile";
import { Header } from "@/app/_components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Camera, Coffee, Heart } from "lucide-react";

export default function DonationScreenCreator() {
    return (
        <div className="w-full h-screen">

            <Header />

            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center">
                <Button>
                    <Camera />
                    Add a cover image
                </Button>
            </div>

            <div className="w-[90%] gap-5 mt-[-100px] mx-auto">

                <EditProfile />

            </div>
        </div>
    )
}