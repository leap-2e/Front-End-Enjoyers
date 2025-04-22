import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Camera, ChevronDown, Coffee, Heart } from "lucide-react";

export default function ByMeCoffeeDonationCreator() {
    return (
        <div className="w-full h-screen">

            <div className="bg-white flex w-full h-[56px] items-center justify-center">
                <div className="w-[90%] h-[40px] flex justify-between items-center">
                    <div className="w-[151px] h-[24px] flex gap-[10px] items-center">
                        <Coffee />
                        <p className="text-black font-bold">Buy Me Coffee</p>
                    </div>
                    <div className="w-[182px] h-[40px] flex gap-2 items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="w-[83px] h-[20px] font-[500]">Jake</p>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center">
                <Button>
                    <Camera />
                    Add a cover image
                </Button>
            </div>

            <div className="w-[90%] flex gap-5 mt-[-100px] mx-auto">

                <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5">
                    <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <div className="w-full h-[48px] flex justify-between">
                            <div className="w-[107px] h-[48px] flex gap-3 items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="w-[83px] h-[20px] font-bold">Jake</p>
                            </div>
                            <button className="w-[96px] h-[40px] bg-[#F4F4F5] rounded-md">Edit page</button>
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

                <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-8 border border-[#F4F4F5] p-6">

                    <div className="w-full h-[122px]">
                        <h1 className="w-[full] h-[36px] text-black font-bold mb-6">Buy Jake a Coffee</h1>
                        <div className="w-full h-[62px]">
                            <p>Select amount:</p>
                            <div className="h-[40px] flex gap-3">
                                <button className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $1
                                </button>
                                <button className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $2
                                </button>
                                <button className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $5
                                </button>
                                <button className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $10
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}