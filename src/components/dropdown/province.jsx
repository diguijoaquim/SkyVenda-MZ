import { MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { PROVINCIAS } from "../../data/consts";
import { Link } from "react-router-dom";

export function ProvinceDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-white/50 rounded-full flex items-center justify-center w-[230px] gap-2 px-4 py-2">
        <MapPin className="h-4 w-4" />
        <span className="font-extrabold text-gray-600">Da Sua Provincia</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[230px]">
        {PROVINCIAS.map((province) => (
          <DropdownMenuItem key={province} asChild>
            <Link 
              to={`/p/${province.toLowerCase()}`}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span>{province}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}