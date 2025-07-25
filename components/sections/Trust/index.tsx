import { ComponentPropsWithoutRef } from "react";
import { items } from "./items";
import Image from "next/image";
import dividerImg from "@/public/images/divider.svg";
import { cn } from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const Trust = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-full large:pb-20 pb-10 flex items-center justify-center",
        className
      )}
      {...props}>
      <div className="flex flex-col large:flex-row lg:items-center lg:justify-between gap-4 lg:gap-2.5 self-stretch max-w-[1170px] w-full mx-4 medium:mx-[25px]">
        <div className="text-base large:max-w-[240px] w-full text-center large:text-left">
          500+ training providers grow their businesses with Certifier
        </div>
        <Image
          src={dividerImg || "/placeholder.svg"}
          alt="Divider"
          className="hidden large:block"
        />
        <div className="max-w-[865px] w-full justify-center lg:justify-between items-center shrink-0 flex-row flex flex-wrap gap-4 lg:gap-0">
          {items.map((item) => (
            <div
              key={item.company}
              className="flex w-[140px] h-[50px] justify-center items-center">
              <Image
                src={item.imgUrl || "/placeholder.svg"}
                alt={item.company}
                width={140}
                height={50}
                className="w-auto h-auto max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trust;
