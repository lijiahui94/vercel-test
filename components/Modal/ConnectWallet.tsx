import closeIcon from "@/assets/icons/close-line.png";
import BTCWalletsBut from "../Wallets/BTCWalletsBut";
interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
}
export default function ConnectWalletModal({
  open,
  onClose,
}: ConnectWalletModalProps) {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center z-[1000] bg-black bg-opacity-60">
      <div className="flex w-[320px] md:w-[600px] flex-col items-center justify-center rounded-xl bg-[#1A1E23] p-4 md:p-9 mx-5">
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-auto w-6 cursor-pointer"
          src={closeIcon.src}
          alt=""
        />
        <p className="mb-6 text-center text-base md:text-3xl text-white font-semibold">
          Connect Wallet
        </p>
        <BTCWalletsBut />
      </div>
    </div>
  );
}
