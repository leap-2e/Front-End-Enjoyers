import { Dashboard } from "@/app/_components/Dashboard";
import { Header } from "@/app/_components/Header";
import { SideBarComponent } from "@/app/_components/SideBar";

export default function DashboardPage() {
    return (
        <>
            <Header />
            <div className="w-full flex gap-4 px-[80px]">
                <SideBarComponent />
                <Dashboard />
            </div>
        </>
    )
}