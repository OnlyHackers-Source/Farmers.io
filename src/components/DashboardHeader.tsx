
import React from 'react';
import { Translation } from '../utils/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ShoppingCart, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ProfileOverview from './ProfileOverview';
import CurrentCrops from './CurrentCrops';
import WeatherWidget from './dashboard/WeatherWidget';

interface DashboardHeaderProps {
  translations: Translation;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ translations }) => {
  const navigate = useNavigate();

  // Mock data for orders
  const incomingOrders = 5;
  const completedOrders = 28;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        {translations.dashboard}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Incoming Orders Card */}
        <Card className="bg-amber-50 border-amber-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-amber-800">{translations.incomingOrders}</h3>
                <p className="text-4xl font-bold text-amber-900 mt-2">{incomingOrders}</p>
                <p className="text-sm text-amber-700 mt-1">{translations.ordersAwaitingAction}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-amber-500" />
            </div>
            <Button
              variant="outline"
              className="mt-4 text-amber-800 border-amber-300 bg-amber-100 hover:bg-amber-200 w-full"
              onClick={() => navigate('/orders')}
            >
              {translations.viewOrders}
            </Button>
          </CardContent>
        </Card>

        {/* Completed Orders Card */}
        <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-emerald-800">{translations.completedOrders}</h3>
                <p className="text-4xl font-bold text-emerald-900 mt-2">{completedOrders}</p>
                <p className="text-sm text-emerald-700 mt-1">{translations.successfullyDelivered}</p>
              </div>
              <Package className="h-8 w-8 text-emerald-500" />
            </div>
            <Button
              variant="outline"
              className="mt-4 text-emerald-800 border-emerald-300 bg-emerald-100 hover:bg-emerald-200 w-full"
              onClick={() => navigate('/previous-orders')}
            >
              {translations.viewHistory}
            </Button>
          </CardContent>
        </Card>

        <WeatherWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ProfileOverview translations={translations} />
        <CurrentCrops translations={translations} />
      </div>
    </div>
  );
};

export default DashboardHeader;
