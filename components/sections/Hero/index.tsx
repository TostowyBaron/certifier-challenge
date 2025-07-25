import React, { ComponentPropsWithoutRef } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import heroImg from "@/public/images/hero-img.png";
import { cn } from "@/lib/utils";
import G2Tag from "./G2Tag";

interface Props extends ComponentPropsWithoutRef<"section"> {
  title?: string;
  description?: string;
  cta_button_text?: string;
  cta_button_link?: string;
  sign_up_button_text?: string;
  sign_up_button_link?: string;
  className?: string;
}

const Hero = ({
  title = "Power your training program with digital credentials",
  description = "Boost your training business, stay top of mind with program alumni, and turn learning progress into shareable, professional, and branded certificates.",
  cta_button_text = "Book a demo",
  cta_button_link = "/demo",
  sign_up_button_text = "Sign up free",
  sign_up_button_link = "/sign-up",
  className,
  ...props
}: Props) => {
  return (
    <section
      className={cn(
        "bg-[linear-gradient(180deg,#E7F4EB_63.67%,rgba(231,244,235,0.00)_100%)] pt-[126px] pb-15 flex justify-center",
        className
      )}
      {...props}>
      <div className="max-w-[1170px] w-full flex large:flex-row flex-col justify-between items-center mx-[25px]">
        <div
          id="content"
          className="flex large:w-[500px] flex-col justify-center gap-10 shrink-0 large:items-start items-center">
          <div className="flex flex-col large:items-start items-center gap-[15px]">
            <G2Tag />
            <h1 className="medium:text-[48px] font-medium large:leading-[54px] text-black text-[36px] leading-[40px large:text-left text-center">
              {title}
            </h1>
            <p className="medium:text-xl text-lg large:text-left text-center">
              {description}
            </p>
            <div className="flex large:flex-row flex-col items-center justify-center gap-5 w-full large:w-auto large:pt-[25px]">
              <Button href={cta_button_link} className="w-full">
                {cta_button_text}
              </Button>
              <Button href={sign_up_button_link} variant="secondary" withArrow>
                {sign_up_button_text}
              </Button>
            </div>
          </div>
        </div>
        <div id="animation" className="max-w-[560px] max-h-[504px]">
          <Image src={heroImg} alt="Hero image" className="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
