
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';
import CropsSection from './CropsSection';
import OrdersSection from './OrdersSection';
import WeatherSection from './WeatherSection';
import RentalForm from './RentalForm';
import DashboardHeader from './DashboardHeader';
import { Language, Translation } from '../utils/translations';

interface FarmerDashboardProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  translations: Translation;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentLanguage,
  onLanguageChange,
  translations
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        translations={translations}
      />

      <div className={`transition-all duration-300 ${collapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="container p-6 mx-auto max-w-7xl">
          {activeTab === 'dashboard' && <DashboardHeader translations={translations} />}
          {activeTab === 'profile' && <ProfileSection translations={translations} />}
          {activeTab === 'crops' && <CropsSection translations={translations} />}
          {activeTab === 'previous-orders' && <OrdersSection type="previous" translations={translations} />}
          {activeTab === 'incoming-orders' && <OrdersSection type="incoming" translations={translations} />}
          {activeTab === 'weather' && <WeatherSection translations={translations} />}
          {activeTab === 'rental' && <RentalForm translations={translations} />}
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
