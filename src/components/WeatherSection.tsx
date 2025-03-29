
import React, { useEffect, useState } from 'react';
import { Translation } from '../utils/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { WeatherData, WeatherForecast, fetchWeatherData, getFormattedForecast } from '../utils/weatherApi';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherSectionProps {
  translations: Translation;
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ translations }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('Delhi, India');

  useEffect(() => {
    const getWeatherData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWeatherData(location);
        setWeather(data);
        setForecast(getFormattedForecast(data));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, [location]);

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-10 w-10 text-blue-300" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="h-10 w-10 text-gray-500" />;
    } else if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
      return <CloudDrizzle className="h-10 w-10 text-gray-400" />;
    } else {
      // Default to sun or appropriate icon
      return <Thermometer className="h-10 w-10 text-amber-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-muted rounded-md"></div>
        <div className="h-64 bg-muted rounded-md"></div>
        <div className="h-48 bg-muted rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src="https://images.unsplash.com/photo-1504827910984-54026fd4a0c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Agriculture landscape with weather conditions"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">{translations.currentWeather}</h2>
            <p className="text-sm opacity-90">{location}</p>
          </div>
        </div>
      </div>
      
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="relative pb-0">
          <CardTitle>{translations.currentWeather}</CardTitle>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
        <CardContent>
          {weather && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <div className="mr-4">
                  {getWeatherIcon(weather.current.condition.text)}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{weather.current.temp_c}°C</h3>
                  <p className="text-muted-foreground">{weather.current.condition.text}</p>
                  <p className="text-sm text-muted-foreground">Feels like {weather.current.feelslike_c}°C</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Droplets className="h-6 w-6 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.humidity}</p>
                    <p className="font-medium">{weather.current.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind className="h-6 w-6 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.wind}</p>
                    <p className="font-medium">{weather.current.wind_kph} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{translations.forecast}</CardTitle>
          <CardDescription>Next 3 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg flex flex-col items-center text-center">
                <p className="font-medium mb-2">{day.date}</p>
                {day.icon && <img src={`https:${day.icon}`} alt={day.condition} className="w-12 h-12 my-2" />}
                <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-amber-500 font-medium">{day.maxTemp}°</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-blue-500 font-medium">{day.minTemp}°</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Agricultural Weather Advisory</CardTitle>
          <CardDescription>Recommendations based on current weather</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-medium text-amber-800 mb-1">Heat Advisory</h4>
                <p className="text-sm text-amber-700">
                  High temperatures expected. Consider additional irrigation for crops and ensure livestock have access to shade and water.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
                alt="Sunny field"
                className="absolute right-0 top-0 w-16 h-16 object-cover opacity-30"
              />
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-medium text-blue-800 mb-1">Irrigation Schedule</h4>
                <p className="text-sm text-blue-700">
                  Based on current humidity and expected rainfall, optimal irrigation time would be early morning.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2071&auto=format&fit=crop" 
                alt="Irrigation system"
                className="absolute right-0 top-0 w-16 h-16 object-cover opacity-30"
              />
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-medium text-green-800 mb-1">Crop Protection</h4>
                <p className="text-sm text-green-700">
                  Current conditions are favorable for fungal growth. Consider preventative fungicide application.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ce?q=80&w=2072&auto=format&fit=crop" 
                alt="Crop protection"
                className="absolute right-0 top-0 w-16 h-16 object-cover opacity-30"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherSection;
