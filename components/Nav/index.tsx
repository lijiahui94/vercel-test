import Logo from "./Logo";
import NavList from "./NavList";
import RightBox from "./RightBox";

export default function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[999] flex flex-col items-center w-full bg-[#0F0F12]">
      <div className="flex justify-between items-center w-full max-w-[1480px] h-10 md:h-[90px] px-10">
        <Logo />
        <div className="hidden md:block flex-1">
          <NavList direction={'row'}/>
        </div>
        <RightBox />
      </div>
    </div>
  );
}
