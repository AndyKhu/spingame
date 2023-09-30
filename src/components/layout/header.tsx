"use client"

import { LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";

interface HeaderProps {
  state: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  }
}

const Header = ({state}:HeaderProps) => {
  return (
    <header className="h-[70px] flex items-center justify-between shadow-sm px-6 bg-white">
      <Button size="icon" variant="ghost" onClick={()=>{state.setIsOpen(old => !old)}}>
        <Menu size={24}/>
      </Button>
      <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={18}>
          <DropdownMenuItem onClick={()=> signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;