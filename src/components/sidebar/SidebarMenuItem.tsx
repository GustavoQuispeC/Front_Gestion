'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}



export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => {

  const currentPath = usePathname();

  return (
    <div className="mb-1">
      <Link href={ path } 
        className={`
          w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-1 hover:bg-white/5 transition ease-linear duration-150 rounded-md 
          ${ currentPath === path ? 'bg-blue-800': '' }
        `}>
      <div>
        <div>
        { icon }
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-5 text-white">{ title }</span>
        <span className="text-sm text-white/50 hidden md:block">{ subTitle }</span>
      </div>
      </Link>
    </div>
  )
}
