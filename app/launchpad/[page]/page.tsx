import Brief from "@/components/Launchpad/Brief";
import PrivatePlacement from "@/components/Launchpad/PrivatePlacement";
import PublicPlacement from "@/components/Launchpad/PublicPlacement";
import Breadcrumb from "@/components/Nav/Breadcrumb";
import LaunchpadTabs from "@/components/Tabs/LaunchpadTabs";
import MetaphonePassIntroduction from "@/components/Launchpad/introduction/MetaphonePass";
import MetaphonePassRoadmap from "@/components/Launchpad/roadmap/MetaphonePass";
import MetaphonePassTokenomics from "@/components/Launchpad/tokenomics/MetaphonePass";
import TELEIntroduction from "@/components/Launchpad/introduction/TELE";
import TELERoadmap from "@/components/Launchpad/roadmap/TELE";
import TELETokenomics from "@/components/Launchpad/tokenomics/TELE";
import ByinIntroduction from "@/components/Launchpad/introduction/Byin";
import ByinRoadmap from "@/components/Launchpad/roadmap/Byin";
import ByinTokenomics from "@/components/Launchpad/tokenomics/Byin";
import JUNLALAAIWatchIntroduction from "@/components/Launchpad/introduction/JUNLALAAIWatch";
import JUNLALAAIWatchRoadmap from "@/components/Launchpad/roadmap/JUNLALAAIWatch";
import JUNLALAAIWatchTokenomics from "@/components/Launchpad/tokenomics/JUNLALAAIWatch";
import UptonIntroduction from "@/components/Launchpad/introduction/Upton";
import UptonRoadmap from "@/components/Launchpad/roadmap/Upton";
import UptonTokenomics from "@/components/Launchpad/tokenomics/Upton";

export function generateStaticParams() {
  return [
    { page: "Upton" },
    // { page: "JUNLALAAIWatch" },
    { page: "Byin" },
    { page: "MetaphonePass" },
    { page: "TELE" },
  ];
}
export default function LaunchpadPage({
  params,
}: {
  params: { page: string };
}) {
  const { page } = params;
  return (
    <div className="px-5 md:px-10 max-w-[1156px] m-auto pt-11">
      <Breadcrumb href={"launchpad"} page={page} />
      <Brief />
      <PrivatePlacement />
      <PublicPlacement />
      <LaunchpadTabs>
        <div key="0">
          <MetaphonePassIntroduction />
          <TELEIntroduction />
          <ByinIntroduction />
          <JUNLALAAIWatchIntroduction />
          <UptonIntroduction />
        </div>
        <div key="1">
          <MetaphonePassRoadmap />
          <TELERoadmap />
          <ByinRoadmap />
          <JUNLALAAIWatchRoadmap />
          <UptonRoadmap />
        </div>
        <div key="2">
          <MetaphonePassTokenomics />
          <TELETokenomics />
          <ByinTokenomics />
          <JUNLALAAIWatchTokenomics />
          <UptonTokenomics />
        </div>
      </LaunchpadTabs>
    </div>
  );
}
