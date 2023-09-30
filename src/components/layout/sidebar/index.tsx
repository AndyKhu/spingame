"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gitlab } from "lucide-react";
import { motion } from "framer-motion";
import SidebarItem from "./item";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  state: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  };
}
const Sidebar = ({ state }: SidebarProps) => {
  const isMobile = useMediaQuery(768);
  const open = isMobile? !state.isOpen : state.isOpen
  const Sidebar_animation = {
    open: {
      width: "16rem",
      transition: {
        duration: 0.1,
      },
    },
    closed: {
      width: "0",
      transition: {
        duration: 0,
      },
    },
  };
  return (
    <>
      <div
        onClick={() => state.setIsOpen(old => !old)}
        className={cn(
          "fixed inset-0 z-[998] max-h-screen bg-black/50 md:hidden",
          open ? "block" : "hidden",
        )}
      ></div>
      <motion.div
        variants={Sidebar_animation}
        animate={open ? "open" : "closed"}
        className={cn(
          "fixed left-0 z-[999] h-screen overflow-hidden bg-white shadow-sm transition-all duration-300 md:relative",
        )}
      >
        <div className="flex h-[70px] items-center space-x-3 px-8 shadow-sm">
          <div className="rounded-md bg-black p-2 text-white">
            <Gitlab className="fill-white" />
          </div>
          <span className="whitespace-nowrap text-lg font-bold">Dashboard</span>
        </div>
        <ScrollArea className="h-[calc(100%-70px)] px-6 py-4">
          <ul className="space-y-3">
            <SidebarItem url="/dashboard" title="Lucky Spin" icon="Spin" />
            <SidebarItem
              url="/dashboard/misteribox"
              title="Misteri Box"
              icon="Gift"
            />
          </ul>
        </ScrollArea>
      </motion.div>
    </>
  );
};

export default Sidebar;
