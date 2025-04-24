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
  );
}
