import AboutIcon1 from "@/assets/home/About-icon1.png";
import AboutIcon2 from "@/assets/home/About-icon2.png";
import AboutIcon3 from "@/assets/home/About-icon3.png";
const list = [
  {
    id: 0,
    icon: AboutIcon1.src,
    title: (
      <span>
        Launchpad tokens easier <span className="text-app">,</span> faster &
        cheaper <span className="text-app">.</span>
      </span>
    ),
  },
  {
    id: 1,
    icon: AboutIcon2.src,
    title: (
      <span>
        Data transparency <span className="text-app">,</span> ensuring Launchpad
        fairness <span className="text-app">.</span>
      </span>
    ),
  },
  {
    id: 2,
    icon: AboutIcon3.src,
    title: (
      <span>
        Flexible use of full-chain smart contracts to ensure security and
        effectiveness <span className="text-app">.</span>
      </span>
    ),
  },
];
export default function About() {
  return (
    <div className="">
      <div className="text-[32px] md:text-[68px] font-bold text-center my-16 text-white uppercase">
        Why GoWrap<span className="text-app">?</span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {list.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-[60px] pb-10 md:pb-20"
          >
            <img src={item.icon} className="w-20 pointer-events-none" alt="" />
            <div className="whitespace-pre-line text-2xl font-normal leading-[34px] text-white">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
