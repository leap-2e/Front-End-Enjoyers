import AccountSetting from "@/app/_components/AccountSetting";
import { Header } from "@/app/_components/Header";
import { SideBarComponent } from "@/app/_components/SideBar";
import UpdatePassword from "@/app/_components/UpdatePassword";
import UpdatePaymentInfo from "@/app/_components/UpdatePaymentInfo";
import UpdateProfileInfo from "@/app/_components/UpdateProfileInfo";

export default function SettingsPage() {
  return (
    <>
      <Header />
      <div className="w-full flex gap-4 px-[80px]">
        <SideBarComponent />
        {/* <AccountSetting /> */}
        <div className="w-2/5 my-20 flex flex-col space-y-16 justify-self-center">
          <UpdateProfileInfo />
          <UpdatePassword />
          <UpdatePaymentInfo />
        </div>
      </div>
    </>
  );
}
