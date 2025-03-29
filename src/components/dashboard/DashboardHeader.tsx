
import { Button } from "@/components/ui/button";
import {
  Bell,
  MessageSquare,
  Menu,
  Globe
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

const languages = [
  { code: "en", name: "English" }, { code: "hi", name: "हिन्दी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
];

export default function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState("English");

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-farmer-green">
            <span className="hidden md:inline">Farmer</span>.io
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-farmer-earth flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">{currentLanguage}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setCurrentLanguage(lang.name)}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-farmer-earth" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-farmer-green rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5 text-farmer-earth" />
        </Button>

        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-farmer-green-light text-farmer-green">RS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
