import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Coffee } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <div className="fixed top-0 bg-white flex w-full h-[56px] items-center justify-center">
            <div className="w-[90%] h-[40px] flex justify-between items-center">
                <div className="w-[151px] h-[24px] flex gap-2 items-center">
                    <Coffee />
                    <p className="text-black font-bold">Buy Me Coffee</p>
                </div>
                <div className="w-[182px] h-[40px] flex gap-2 items-center">
                    <Link href="/profile">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar></Link>
                    <p className="w-[83px] h-[20px] font-[500]">Jake</p>
                    <ChevronDown size={20} />
                </div>
            </div>
        </div>
    )
}