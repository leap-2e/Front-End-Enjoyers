import { CreatePaymentInfo } from "../_components/CreatePaymentInfo";
import { CreateProfile } from "../_components/CreateProfile";
import { Header } from "../_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <CreateProfile />
      <CreatePaymentInfo />
    </div>
  );
}
