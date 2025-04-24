import { Dashboard } from "../_components/Dashboard";
import { Header } from "../_components/Header";
import { SideBarComponent } from "../_components/SideBar";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBarComponent />
        <Dashboard />
      </div>
    </div >
  );
}
