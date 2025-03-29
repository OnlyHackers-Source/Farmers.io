
import React, { useEffect, useState } from 'react';
import FarmerDashboard from '../components/FarmerDashboard';
import { Language, getTranslations } from '../utils/translations';
import { useToast } from '@/components/ui/use-toast';
import { getMarketPrice } from '@/api/api';

const Dashboard2 = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const { toast } = useToast();
  const translations = getTranslations(currentLanguage);
  const [marketValue, setMarketValue] = useState<any>({});

  useEffect(() => {
    // Show welcome toast when the dashboard loads
    toast({
      title: "Welcome to Farmer.io",
      description: "Your farming companion for better crop management and sales.",
      className: "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-green-800",
    });

    const getMarketValue = async () => {
      try {
        const response = await getMarketPrice();
        setMarketValue(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMarketValue();
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    toast({
      title: "Language Changed",
      description: `The language has been changed to ${language}`,
      className: "bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 text-blue-800",
    });
  };

  return (
    <FarmerDashboard
      currentLanguage={currentLanguage}
      onLanguageChange={handleLanguageChange}
      translations={translations}
    />
  );
};

export default Dashboard2;
