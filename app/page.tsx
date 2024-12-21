import Footer from "@/components/Footer";
import Part1 from "@/components/Home/part1";
import Part2 from "@/components/Home/part2";
import Part3 from "@/components/Home/part3";
import Part4 from "@/components/Home/part4";
import Part5 from "@/components/Home/part5";
export default function Home() {
  return (
    <div className="bg-[#17141B]">
      <Part1 />
      <Part2 />
      <Part3 />
      <Part4 />
      <Part5 />
      <Footer />
    </div>
  );
}
