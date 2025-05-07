"use client";

import { Separator } from "@/components/ui/separator";
import { House, LogOut, CalendarCog, CalendarSearch } from "lucide-react";
import React, { useContext } from "react";
import { Dock, DockIcon } from "../magicui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ModeToggle } from "../mode-toggle";
import { AuthContext } from "@/auth/AuthContext";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  const { logout } = useContext(AuthContext)!;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 mx-auto flex origin-bottom h-full max-h-14">
      <div className="fixed top-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,transparent,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        <DockIcon>
          <a href="/dashboard" className="flex h-full items-center justify-center">
            <Icons.home className="size-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a href="/events" className="flex h-full items-center justify-center">
            <Icons.events className="size-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a href="/all-events" className="flex h-full items-center justify-center">
            <Icons.allevents className="size-6" />
          </a>
        </DockIcon>

        {/* <DockIcon>
          <a href="/dashboard/three-fiber" className="flex h-full items-center justify-center">
            <Icons.threejs className="size-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <Icons.googleDrive className="size-6" />
        </DockIcon>
        <DockIcon>
          <Icons.notion className="size-6" />
        </DockIcon>
        <DockIcon>
          <Icons.whatsapp className="size-6" />
        </DockIcon> */}

        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <button className="cursor-pointer flex h-full items-center justify-center" onClick={() => logout()}>
            <Icons.logout className="size-6" />
          </button>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}

const Icons = {
  home: (props: IconProps) => (
    <House {...props} />
  ),
  events: (props: IconProps) => (
    <CalendarCog {...props} />
  ),
  allevents: (props: IconProps) => (
    <CalendarSearch {...props} />
  ),
  logout: (props: IconProps) => (
    <LogOut {...props} />
  ),

};
