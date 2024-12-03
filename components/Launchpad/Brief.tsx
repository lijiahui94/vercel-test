'use client';
import { useAppSelector } from '@/store/hooks';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { launchpadItemType } from '@/store/launchpad/launchpadSlice';
const Brief = () => {
  const pathname = usePathname();
  const { ProjectCardList } = useAppSelector((state) => state.launchpad);
  const data: launchpadItemType = useMemo(
    () => ProjectCardList.find((item) => item.url == pathname)!,
    [pathname]
  );
  return (
    <div className="w-full mt-6 mb-10 flex gap-2.5 text-white">
      <img
        className="object-contain h-full md:w-[100px] w-[50px] rounded-full border-4	border-white"
        src={data.logo}
        alt=""
      />
      <div className="flex flex-col justify-between">
        <div className="text-2xl flex items-center flex-wrap gap-6">
          <span className="font-semibold md:text-2xl text-base">
            {data.name}
          </span>
          <div className="flex gap-2.5 h-7">
            {data.iconsLink.map((icon) => (
              <img
                key={icon.id}
                className="w-6 h-6 p-0.5 cursor-pointer"
                src={icon.src}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(icon.link);
                }}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="line-clamp-2 font-normal md:text-base text-sm">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default Brief;
