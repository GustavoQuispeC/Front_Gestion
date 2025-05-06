import Link from "next/link";
import React from "react";


interface Props {
  title?: string;
  subtitle?: string;
  label?: string;
  icon?: React.ReactNode;
  href: string;
}

export const SimpleWidget = ({title, subtitle,label,icon,href = "#"}:Props) => {
  return (
    <div className="bg-white shadow-xl p-3 sm:min-w-[25%] min-w-full  rounded-2xl border-1 border-gray-50 mx-2 ">
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-center text-gray-600">{label}</h2>
        </div>
        <div className="my-3">
          <div className="flex flex-row items-center justify-center space-x-1 ">
            <div id="icon">
              {/* Icono irá aquí */}
              {icon}
            </div>
            <div id="temp" className="text-center">
              <h4 className="text-4xl">{title}</h4>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-2 text-right border-t-2 border-gray-100 place-items-end">
          <Link href={href}  className="text-xs font-medium text-indigo-600">
            Más
          </Link>
        </div>
      </div>
    </div>
  );
};
