"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
  useRef,
} from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { items, type NavItem } from "./items";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
import { Button } from "@/components/ui/button";

interface Props extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0] as HTMLElement;
    lastFocusableRef.current = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    firstFocusableRef.current?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};

const useEscapeKey = (callback: () => void, isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [callback, isActive]);
};

const Navbar = ({ className, ...props }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const focusTrapRef = useFocusTrap(isMobileMenuOpen);

  useEscapeKey(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      mobileMenuButtonRef.current?.focus();
    }, 100);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const hasSubItems = (item: NavItem) => {
    return item.subItems && item.subItems.length > 0;
  };

  const getSectionId = (label: string) =>
    `mobile-section-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const getButtonId = (label: string) =>
    `mobile-button-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <div
        className={cn(
          "z-[9990] fixed w-full top-[0px] flex items-center justify-center transition-all duration-500 ease-in-out opacity-100 translate-y-0 large:h-[84px]",
          isScrolled && "bg-white/70 backdrop-blur-md",
          className
        )}
        {...props}>
        <div className="w-full">
          <header className="large:py-[6px] large:h-auto flex w-full items-center justify-between large:justify-between large:gap-[227px] px-[25px] py-[10px] large:mx-auto large:max-w-[1130px] large:px-0">
            <Link aria-label="Certifier logo" href="/" className="shrink-0">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Certifier logo"
                width={145}
                height={34}
                className="h-[27px] w-[112px] large:h-[34px] large:w-[145px]"
              />
            </Link>

            <div className="hidden large:flex items-center gap-[35px]">
              <nav
                className="flex items-center gap-[35px]"
                role="navigation"
                aria-label="Main navigation">
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="font-normal flex h-[44px] items-center cursor-pointer hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button className="px-[15px] !text-[16px] !leading-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                Get started
              </Button>
            </div>

            <div className="flex large:hidden items-center gap-[10px]">
              <button
                ref={mobileMenuButtonRef}
                onClick={openMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="dialog">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </header>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] large:hidden"
          ref={focusTrapRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          id="mobile-menu">
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "flex items-center justify-between p-[25px] border-b transition-colors",
                isScrolled ? "bg-white/70 backdrop-blur-md" : "bg-white"
              )}>
              <Link
                aria-label="Certifier logo"
                href="/"
                onClick={closeMobileMenu}
                className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Certifier logo"
                  width={120}
                  height={40}
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Close mobile menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-white">
              <nav
                className="px-[25px] py-6"
                role="navigation"
                aria-label="Mobile navigation">
                <div className="sr-only">
                  <h2 id="mobile-menu-title">Navigation Menu</h2>
                </div>

                {items.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-b-0">
                    {hasSubItems(item) ? (
                      <div>
                        <button
                          id={getButtonId(item.label)}
                          onClick={() => toggleSection(item.label)}
                          className="flex items-center justify-between w-full py-4 text-left text-lg font-normal hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm"
                          aria-expanded={expandedSections.includes(item.label)}
                          aria-controls={getSectionId(item.label)}>
                          <span className="flex items-center gap-2">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              expandedSections.includes(item.label) &&
                                "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {expandedSections.includes(item.label) && (
                          <div
                            id={getSectionId(item.label)}
                            className="pb-4 pl-4"
                            role="region"
                            aria-labelledby={getButtonId(item.label)}>
                            <Link
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm">
                              View all {item.label.toLowerCase()}
                            </Link>
                          </div>
                        )}
                        {/* {item.subItems?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                onClick={closeMobileMenu}
                                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm"
                              >
                                {subItem.label}
                              </Link>
                            ))} */}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between w-full py-4 text-lg font-normal hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-[25px] space-y-3 border-t bg-white">
              <Button className="px-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
