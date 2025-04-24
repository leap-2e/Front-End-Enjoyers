import { Explore } from "../_components/Explore";
import { Header } from "../_components/Header";
import { SideBarComponent } from "../_components/SideBar";

export default function Home() {
  return (
    <div>
      <Header />
      <SideBarComponent />
      <Explore />
    </div >
  );
}
