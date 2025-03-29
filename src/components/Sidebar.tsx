
import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Language, Translation } from '../utils/translations';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, User, ShoppingBasket, ReceiptIcon, Package, Cloud, Tractor, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  translations: Translation;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  activeTab,
  setActiveTab,
  currentLanguage,
  onLanguageChange,
  translations
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: translations.dashboard },
    { id: 'profile', icon: User, label: translations.profile },
    { id: 'crops', icon: ShoppingBasket, label: translations.crops },
    { id: 'previous-orders', icon: ReceiptIcon, label: translations.previousOrders },
    { id: 'incoming-orders', icon: Package, label: translations.incomingOrders },
    { id: 'weather', icon: Cloud, label: translations.weather },
    { id: 'rental', icon: Tractor, label: translations.rental },
    { id: 'settings', icon: Settings, label: translations.settings }
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-card border-r border-border shadow-sm transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b">
        {!collapsed && (
          <h1 className="text-lg font-semibold animate-fade-in">
            Farmer.io
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "flex justify-start gap-3 transition-all duration-300",
                collapsed ? "px-2" : "px-3",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className={cn(
                "h-5 w-5",
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              )} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      <div className="border-t p-2 flex justify-center">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
