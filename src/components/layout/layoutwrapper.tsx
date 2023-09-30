"use client";
import { PropsWithChildren, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { cn } from "@/lib/utils";

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cn("flex flex-row min-h-screen overflow-hidden bg-slate-100")}>
      <Sidebar state={{ isOpen, setIsOpen }} />
      <div className="flex-1">
        <Header state={{ isOpen, setIsOpen }} />
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
