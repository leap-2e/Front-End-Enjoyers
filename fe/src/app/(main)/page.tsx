<<<<<<< HEAD
import { Dashboard } from "../_components/Dashboard";
import { Header } from "../_components/Header";
import { SideBarComponent } from "../_components/SideBar";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full flex gap-4 px-[80px]">
        <SideBarComponent />
        <Dashboard />
      </div>
    </>
=======
import AccountSetting from "../_components/AccountSetting";
import { CreatePaymentInfo } from "../_components/CreatePaymentInfo";
import { CreateProfile } from "../_components/CreateProfile";

export default function Home() {
  return (
    <div>
      <AccountSetting/>
      <CreateProfile />
      <CreatePaymentInfo />
      
    </div>
>>>>>>> aa02d25 (account setting)
  );
}
