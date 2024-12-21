import Link from "next/link";

export default function Breadcrumb({
  href,
  page,
}: {
  href: string;
  page: string;
}) {
  return (
    <div className="flex gap-2 w-full max-w-[1480px] px-2 md:px-6 py-1 md:py-4 mb-5 md:mb-10 text-sm md:text-lg text-white/60 border-b border-solid border-white/10">
      <Link href={`/${href}`}>
        <div className="text-app font-medium cursor-pointer">{href}</div>
      </Link>
      <div className="font-normal">{">"}</div>
      <div className="font-normal">{page}</div>
    </div>
  );
}
