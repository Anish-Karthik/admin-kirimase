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
        href: "/schedule-history",
        title: "Schedule History",
        icon: Globe,
      },
      {
        href: "/schedule",
        title: "Schedule",
        icon: Globe,
      },
      {
        href: "/faculty-subject",
        title: "Faculty Subject",
        icon: Globe,
      },
      {
        href: "/faculty",
        title: "Faculty",
        icon: Globe,
      },
      {
        href: "/enrollment",
        title: "Enrollment",
        icon: Globe,
      },
      {
        href: "/elective-subject",
        title: "Elective Subject",
        icon: Globe,
      },
      {
        href: "/subject",
        title: "Subject",
        icon: Globe,
      },
      {
        href: "/section",
        title: "Section",
        icon: Globe,
      },
      {
        href: "/period",
        title: "Period",
        icon: Globe,
      },
      {
        href: "/course-enrolled-student",
        title: "Course Enrolled Student",
        icon: Globe,
      },
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

