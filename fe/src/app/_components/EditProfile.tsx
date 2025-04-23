import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProfile } from "./CreateProfile";


export function EditProfile() {
    return (
        <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5 justify-self-center">
            <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                <div className="w-full h-[48px] flex justify-between">
                    <div className="w-[107px] h-[48px] flex gap-3 items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="w-[83px] h-[20px] font-bold">Jake</p>
                    </div>

                    <Dialog>
                        <DialogTrigger>
                            <div className="bg-[#F4F4F5] py-2 px-3 rounded-md hover:bg-black hover:text-white">Edit page</div>
                        </DialogTrigger>
                        <DialogContent className="w-2/4 h-3/5">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <p className="text-[#71717A]">Make changes to your profile here. Click save when you're done.</p>
                            </DialogHeader>
                            <div>
                                <CreateProfile />
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>

                <div className="w-full h-[33px] flex justify-center items-center">
                    <Separator />
                </div>

                <div className="w-full h-[88px]">
                    <h6 className="w-full h-[36px] self-center text-black font-semibold">About Jake</h6>
                    <p className="w-full h-fit">I’m a typical person who enjoys exploring different things. I also make
                        music art as a hobby. Follow me along.</p>
                </div>
            </div>

            <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                <h6 className="w-full h-[36px] self-center text-black font-semibold">Social media URL</h6>
                <p>https://buymeacoffee.com/spacerulz44</p>
            </div>

            <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                <h6 className="w-full h-[36px] self-center text-black font-semibold">Recent Supporters</h6>
                <div className="w-full h-[140px] border border-[#F4F4F5] rounded-md flex justify-center items-center">
                    <div>
                        <p className="justify-self-center">
                            <Heart fill="black" />
                        </p>
                        <h6 className="text-black font-semibold">Be the first one to support Jake</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}