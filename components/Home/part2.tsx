import LaunchpadBody from "../Launchpad/Body";
import HomeTabs from "../Tabs/HomeTabs";
import About from "./About";
import ScrollingText from "./ScrollingText";

export default function Part2() {
  return (
    <div className="relative max-w-[1480px] m-auto px-10">
      <HomeTabs>
        <About />
        <div className="pt-10">
          {/* <ScrollingText /> */}
          <LaunchpadBody />
        </div>
      </HomeTabs>
    </div>
  );
}
