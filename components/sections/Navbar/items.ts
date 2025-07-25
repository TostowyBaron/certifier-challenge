export const items = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Solutions",
    href: "/solutions",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Request demo",
    href: "/request-demo",
  },
  {
    label: "Log in",
    href: "/log-in",
  },
] as const;

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}
