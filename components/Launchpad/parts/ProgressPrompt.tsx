import { usePathname } from "next/navigation";

const ProgressPrompt = ({ Progress }: { Progress: string }) => {
  const pathname = usePathname();
  if (pathname !== "/launchpad/MetaphonePass") {
    return (
      <div className="flex-1 bg-app/50 rounded-full relative overflow-hidden">
        <div
          style={{
            width: Progress,
          }}
          className="absolute top-0 left-0 h-full bg-app rounded-full"
        ></div>
      </div>
    );
  }
  return (
    <div className="flex-1 bg-app/50 rounded-full relative">
      <div className="absolute h-12 pl-2 bottom-0 left-[20%] text-xs z-10 border-l-2 border-solid border-gray">
        <span>MIN (20%) : </span>
        <span className="text-app">3,000,000 $MetaPhone PASS</span>
      </div>
      <div className="absolute top-0 left-0 w-[59.6%] h-full bg-app rounded-full"></div>
    </div>
  );
};
export default ProgressPrompt;
