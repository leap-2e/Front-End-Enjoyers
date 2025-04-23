import { CreatePaymentInfo } from "../_components/CreatePaymentInfo";
import { CreateProfile } from "../_components/CreateProfile";
import Explore from "../_components/Explore";
import { Header } from "../_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <CreateProfile />
      <CreatePaymentInfo />
      <Explore />
    </div>
  );
}
