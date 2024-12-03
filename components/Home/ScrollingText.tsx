const Item = () => {
  const lsit = [
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
    { img: "", title: "TELE", amount: "14.82X" },
  ];
  return (
    <div className="flex gap-3 md:gap-6 pl-3 md:pl-6">
      {lsit.map((item, index) => (
        <div
          key={item.title}
          className="flex items-center gap-6 w-max p-2.5 md:p-4 rounded md:rounded-2xl bg-appbase"
        >
          <div className="w-12 h-12 md:w-24 md:h-24 rounded md:rounded-lg bg-app"></div>
          <div className="">
            <div className="font-medium text-xs md:text-base text-white">
              {index + 1}
              {item.title}
            </div>
            <div className="font-bold text-[18px] md:text-2xl text-app">
              {item.amount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const ScrollingText = () => {
  return (
    <>
      <div className="scroll relative flex py-10 overflow-hidden">
        <Item />
        <Item />
      </div>
    </>
  );
};

export default ScrollingText;
