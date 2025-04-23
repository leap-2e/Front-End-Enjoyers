import { ExternalLink } from "lucide-react";

export function SideBarComponent() {
    return (
        <div className="w-1/4 h-screen">
            <div className="w-[70%] h-[156px] justify-self-center pt-[100px] [&>*]:py-2 [&>*]:text-black [&>*]:px-3 [&>*]:rounded-sm">
                <div className="bg-[#F4F4F5]">Home</div>
                <div>Explore</div>
                <div className="flex gap-1 items-center">
                    <p>View page</p>
                    <ExternalLink size={15} />
                </div>
                <div>Account settings</div>
            </div>
        </div>
    )
}