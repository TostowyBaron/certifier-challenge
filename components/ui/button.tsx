import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import Image from "next/image";
import arrowImg from "@/public/images/arrow-right.svg";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-medium antialiased transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:cursor-pointer large:max-w-fit max-w-full min-w-fit shrink-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-[8px] text-white hover:translate-y-[-2px] bg-[#1565D8] hover:bg-blue-600 text-[18px] leading-[28px] medium:text-[20px] xl:leading-[28px] w-full xl:w-auto xl:whitespace-nowrap flex items-center justify-center  px-[20px] py-[10px] ",
        secondary:
          "text-[#1565D8] hover:text-[#1565D8]/80 flex justify-center items-center text-[20px] font-medium leading-[28px]",
      },
      withArrow: {
        true: "group gap-[10px]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type BaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

type ButtonProps = React.ComponentProps<"button"> &
  BaseProps & {
    href?: never;
  };

type LinkButtonProps = Omit<LinkProps, "href"> &
  Omit<React.ComponentProps<"a">, keyof LinkProps> &
  BaseProps & {
    href: string;
  };

type SmartButtonProps = ButtonProps | LinkButtonProps;

function Button(props: SmartButtonProps) {
  const {
    className,
    variant,
    asChild = false,
    withArrow,
    children,
    ...restProps
  } = props;

  const finalClassName = cn(buttonVariants({ variant, withArrow, className }));

  const buttonContent = (
    <>
      {children}
      {withArrow && (
        <Image
          src={arrowImg}
          alt="Arrow"
          className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = restProps as Omit<
      LinkButtonProps,
      keyof BaseProps | "children"
    >;
    return (
      <Link href={href} className={finalClassName} {...linkProps}>
        {buttonContent}
      </Link>
    );
  }

  const buttonProps = restProps as Omit<
    ButtonProps,
    keyof BaseProps | "children"
  >;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={finalClassName} {...buttonProps}>
      {buttonContent}
    </Comp>
  );
}

export { Button, buttonVariants };
