
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  dt: number; // Timestamp of data calculation
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // This would be replaced with user's actual location or preference
  const [location, setLocation] = useState("Amaravati,India");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      // This API key would typically be stored securely
      // For demo purposes, we're using a public sample key
      const apiKey = "bd5e378503939ddaee76f12ad7a97608";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(response.statusText || "Weather data not available");
      }

      const data = await response.json();
      setWeather(data);
      setLastUpdated(new Date());
      setLoading(false);

      toast({
        title: "Weather Updated",
        description: `Latest weather data for ${data.name} loaded successfully`,
        duration: 3000,
      });
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err instanceof Error ? err.message : "Unable to fetch weather data");
      setLoading(false);

      toast({
        variant: "destructive",
        title: "Weather Update Failed",
        description: "Could not retrieve the latest weather data. Please try again later.",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchWeather();

    // Set up interval to refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [location]);

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'haze':
      case 'mist':
      case 'fog':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "N/A";

    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";

    return `${diffHours} hours ago`;
  };

  if (loading) {
    return (
      <Card className="bg-farmer-blue-light">
        <CardHeader>
          <CardTitle className="text-farmer-earth">Weather Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <p className="text-farmer-earth">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="bg-farmer-blue-light">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-farmer-earth">Weather Updates</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchWeather}
            className="h-8 px-2 border-farmer-earth text-farmer-earth"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Retry
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <p className="text-red-500">{error || "Weather data unavailable"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-farmer-blue-light h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-farmer-earth">Weather Updates</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchWeather}
          className="h-8 px-2 border-farmer-earth text-farmer-earth"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getWeatherIcon(weather.weather[0].main)}
              <div className="ml-2">
                <h3 className="text-lg font-semibold">{weather.name}</h3>
                <p className="text-sm text-gray-600">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
              <p className="text-xs text-gray-500">Feels Like</p>
              <p className="font-medium">{Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Wind className="h-5 w-5 text-blue-500 mb-1" />
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-medium">{weather.wind.speed} m/s</p>
            </div>

            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Droplets className="h-5 w-5 text-blue-400 mb-1" />
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-medium">{weather.main.humidity}%</p>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-right mt-2">
            Updated: {formatLastUpdated()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
