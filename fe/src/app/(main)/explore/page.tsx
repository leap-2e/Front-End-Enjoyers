import { Explore } from "@/app/_components/Explore";
import { Header } from "@/app/_components/Header";
import { SideBarComponent } from "@/app/_components/SideBar";

export default function ExplorePage() {
    return (
        <>
            <Header />
            <div className="w-full flex gap-4 px-[80px]">
                <SideBarComponent />
                <Explore />
            </div>
        </>
    )
}