import type { IconType } from "react-icons";
import {
  MdAudiotrack,
  MdHome,
  MdOutlinePets,
  MdOutlineWork,
  MdRocketLaunch,
  MdShoppingCart,
  MdSportsEsports,
} from "react-icons/md";

export type WorkspaceIcon = {
  id: string;
  component: IconType;
  label: string;
  size: string;
};

export const workspaceIcons: WorkspaceIcon[] = [
  { id: "home", component: MdHome, label: "Home", size: "1.5rem" },
  { id: "work", component: MdOutlineWork, label: "Work", size: "1.5rem" },
  {
    id: "shopping",
    component: MdShoppingCart,
    label: "shopping",
    size: "1.5rem",
  },
  { id: "music", component: MdAudiotrack, label: "Music", size: "1.5rem" },
  { id: "pets", component: MdOutlinePets, label: "Pets", size: "1.5rem" },
  { id: "rocket", component: MdRocketLaunch, label: "Rocket", size: "1.5rem" },
  {
    id: "gaming",
    component: MdSportsEsports,
    label: "Gaming",
    size: "1.875rem",
  },
];
