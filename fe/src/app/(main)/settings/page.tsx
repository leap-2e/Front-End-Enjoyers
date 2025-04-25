import AccountSetting from "@/app/_components/AccountSetting";
import { Header } from "@/app/_components/Header";
import { SideBarComponent } from "@/app/_components/SideBar";

export default function SettingsPage() {
    return (
        <>
            <Header />
            <div className="w-full flex gap-4 px-[80px]">
                <SideBarComponent />
                <AccountSetting />
            </div>
        </>
    )
};