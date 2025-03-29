
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingCart,
  Package,
  Clock,
  User,
  Tractor,
  Cloud,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function DashboardSidebar({ isOpen }: SidebarProps) {
  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: ShoppingCart,
      label: "Incoming Orders",
      href: "/dashboard/incoming-orders"
    },
    {
      icon: Clock,
      label: "Previous Orders",
      href: "/dashboard/previous-orders"
    },
    {
      icon: Tractor,
      label: "My Crops",
      href: "/dashboard/my-crops"
    },
    {
      icon: Cloud,
      label: "Weather Updates",
      href: "/dashboard/weather"
    },
    {
      icon: User,
      label: "Profile",
      href: "/dashboard/profile"
    }
  ];

  return (
    <aside className={cn(
      "fixed top-16 left-0 z-40 h-screen transition-transform bg-farmer-green-light border-r border-farmer-green/20",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      "w-64 md:w-64"
    )}>
      <div className="h-full flex flex-col">

        <div className="flex-1 py-4 px-3">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-farmer-earth hover:text-farmer-green-dark hover:bg-white/50",
                      item.href === "/dashboard" && "bg-white/50 text-farmer-green-dark font-medium"
                    )}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-farmer-green/20">
          <Button variant="outline" className="w-full justify-start text-farmer-earth border-farmer-earth-light">
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
