import { CreatePaymentInfo } from "../_components/CreatePaymentInfo";
import { CreateProfile } from "../_components/CreateProfile";
import { Header } from "../_components/Header";
import { SideBarComponent } from "../_components/SideBar";

export default function Home() {
  return (
    <div>
      <Header />
      <CreateProfile />
      <CreatePaymentInfo />
      <SideBarComponent />
    </div >
  );
}
