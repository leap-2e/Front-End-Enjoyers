import { Coffee } from "lucide-react";

export function BuyCoffee() {
    return (
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
    )
}