import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/student",
        title: "Student",
        icon: Globe,
      },
      {
        href: "/course",
        title: "Course",
        icon: Globe,
      },
      {
        href: "/department",
        title: "Department",
        icon: Globe,
      },
      {
        href: "/holiday",
        title: "Holiday",
        icon: Globe,
      },
      {
        href: "/college",
        title: "College",
        icon: Globe,
      },
      {
        href: "/user",
        title: "User",
        icon: Globe,
      },
    ],
  },

];

