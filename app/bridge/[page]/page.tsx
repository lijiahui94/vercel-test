import Breadcrumb from "@/components/Nav/Breadcrumb";
import DateWrap from "@/components/Bridge/DateWrap";

export function generateStaticParams() {
  return [
    // { page: "beng_bnb" },
    // { page: "upfi_bnb" },
    // { page: "gwgw_bnb" },
    // { page: "drag_bnb" },
    { page: "phone_bnb" },
  ];
}
export default function BridgePage({ params }: { params: { page: string } }) {
  const { page } = params;
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1480px] w-full p-10">
        <Breadcrumb href={"bridge"} page={page} />
        {/* <DateWrap page={page} /> */}
      </div>
    </div>
  );
}
