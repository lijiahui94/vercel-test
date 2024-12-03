import Link from "next/link";

const Part5 = () => {
  return (
    <div className="max-w-[1480px] m-auto px-10 my-20 md:my-52">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-20 px-5 md:px-10 py-10 md:py-16 bg-appbase">
        <div className="font-bold text-2xl md:text-[41px] text-white">
          Stay tuned for latest news and IDOs
        </div>
        <div className="flex min-w-[229px] max-w-[540px] w-full h-max rounded-full border-2 border-solid overflow-hidden border-app bg-[#0F0F12]">
          <div className="flex items-center flex-1 px-4 font-medium text-sm md:text-base text-white">
            Follow GoWrap twitter
          </div>
          <Link
            href={"https://x.com/intent/follow?screen_name=GoWrap_xyz"}
            target="_blank"
            className="h-max py-4 px-10 font-medium text-sm md:text-base rounded-full bg-app cursor-pointer"
          >
            Follow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Part5;
