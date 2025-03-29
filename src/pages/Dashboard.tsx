
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import OrdersSummary from "@/components/dashboard/OrdersSummary";
import CropsListing from "@/components/dashboard/CropsListing";
import RecentOrderList from "@/components/dashboard/RecentOrderList";
import ProfileSummary from "@/components/dashboard/ProfileSummary";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">
        <DashboardSidebar isOpen={sidebarOpen} />

        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <h1 className="text-2xl font-bold text-farmer-earth mb-6">Farmer Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <OrdersSummary />
            <WeatherWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ProfileSummary />
            <div className="flex flex-col gap-6">
              <CropsListing />
            </div>
          </div>

          <div className="mb-6">
            <RecentOrderList />
          </div>
        </div>
      </div>
    </div>
  );
}
