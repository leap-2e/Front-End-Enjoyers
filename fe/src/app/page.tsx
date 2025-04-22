import { CreatePaymentInfo } from "./_components/CreatePaymentInfo";
import { CreateProfile } from "./_components/CreateProfile";

export default function Home() {
  return (
    <div>
      <CreateProfile />
      <CreatePaymentInfo />
    </div>
  );
}
