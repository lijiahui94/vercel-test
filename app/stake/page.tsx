import StakeBody from "@/components/Stake/Body";
import StakeTabs from "@/components/Tabs/StakeTabs";
export default function StakeHomePage() {
  return (
    <div className="max-w-[1480px] m-auto px-10 pt-11">
      <StakeTabs />
      <StakeBody />
    </div>
  );
}
