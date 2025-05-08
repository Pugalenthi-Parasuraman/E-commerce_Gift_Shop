import {UserRoundCog} from "lucide-react";
import { Sparkles } from "lucide-react";
import { Flame } from "lucide-react";
import { Baby } from "lucide-react";
import { Cake } from "lucide-react";
import { Gem } from "lucide-react";
import { Flower } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { CandyCane } from "lucide-react";
import { WandSparkles } from "lucide-react";
import { Heart } from "lucide-react";
import { Handshake } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { MessageCircleMore } from "lucide-react";

export const Menus = [
  {
    name: "Home",
  },
  {
    name: "Shop",
    subMenuHedding: ["Categories", "Occasions", "Festivals"],
    subMenu: [
      {
        name: "Personal Gifts",
        desc: "Custom Gift",
        icon: UserRoundCog,
        link: "/search/Customized",
      },
      {
        name: "Birth days",
        desc: "Born age",
        icon: Cake,
        link: "/search/birthday",
      },
      {
        name: "Christmas snow",
        desc: "Xmas Cheer",
        icon: CandyCane,
        link: "/search/Christmas",
      },
      {
        name: "Gifts for Him",
        desc: "For Him",
        icon: Sparkles,
        link: "/search/Him",
      },
      {
        name: "Wedding Day",
        desc: "Wedding Joy",
        icon: Gem,
        link: "/search/Wedding",
      },
      {
        name: "Diwali Spark",
        desc: "Festive Fun",
        icon: WandSparkles,
        link: "/search/Diwali Spark",
      },
      {
        name: "Gifts for Her",
        desc: "For Her",
        icon: Flame,
        link: "/search/Gifts for Her",
      },
      {
        name: "Anniversary ",
        desc: "Love Year",
        icon: Flower,
        link: "/search/Anniversary",
      },
      {
        name: "Valentine's Day",
        desc: "Love Day",
        icon: Heart,
        link: "/search/Valentine's",
      },
      {
        name: "Children Gifts",
        desc: "Kids Stuff",
        icon: Baby,
        link: "/search/Children Gifts",
      },
      {
        name: "Graduations",
        desc: "Congrats!",
        icon: GraduationCap,
        link: "/search/Graduations",
      },
      {
        name: "Thanksgiving",
        desc: "Thanks!",
        icon: Handshake,
        link: "/search/Thanksgiving",
      },
    ],
    gridCols: 3,
  },
  {
    name: "Support",
    subMenu: [
      {
        name: "Help",
        desc: "Center",
        icon: CircleHelp,
        link: "#",
      },
      {
        name: "FAQs",
        desc: "Q & A",
        icon: MessageCircleMore,
        link: "#",
      },
    ],
    gridCols: 1,
  },
  {
    name: "About Us",
  },
  {
    name: "Contact",
  },
];