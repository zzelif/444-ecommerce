import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Masonry from "./mason";

const items = [
    {
      id: "1",
      img: "/assets/images/candle/candle9.png",
      url: "",
      height: 400,
    },
    {
      id: "2",
      img: "/assets/images/candle/candle19.png",
      url: "",
      height: 450,
    },
    {
      id: "3",
      img: "/assets/images/candle/candle17.png",
      url: "",
      height: 600,
    },
    {
      id: "4",
      img: "/assets/images/candle/candle12.png",
      url: "",
      height: 400,
    },
    {
      id: "5",
      img: "/assets/images/candle/candle1.png",
      url: "",
      height: 400,
    },
];

const Hero = async () => {
  return (
    <section className="relative">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 lg:gap-12 md:grid-cols-2 items-center justify-between px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-20 sm:pb-28">
        <div className="flex flex-col gap-y-4 justify-center items-center text-center sm:items-start sm:text-start">
          <h1 className="font-bold tracking-tighter text-3xl sm:text-5xl lg:text-6xl max-w-sm sm:max-w-4xl">
            Welcome to{" "}
            <span className="text-chart-2">444 Custom Print Hub</span>
          </h1>
          <h2 className="max-w-md sm:max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-xl sm:leading-8">
            At 444 Custom Print Hub, we are committed to delivering exceptional
            quality and service to meet all your printing and design needs.
          </h2>
          <div className="flex flex-wrap items-center">
            <Link href="/products" className={cn(buttonVariants())}>
              Buy now
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Masonry
            items={items}
            ease="power4.out"
            duration={0.8}
            stagger={0.1}
            animateFrom="bottom"
            scaleOnHover={false}
            blurToFocus={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
