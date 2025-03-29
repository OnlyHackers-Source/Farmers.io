
export interface WeatherData {
  location: string;
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    feelslike_c: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // Note: In a production environment, you should use environment variables for the API key
    const apiKey = 'YOUR_WEATHERAPI_KEY';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Weather data could not be fetched');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return mock data for demonstration
    return {
      location: 'Delhi, India',
      current: {
        temp_c: 32,
        temp_f: 89.6,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
        },
        humidity: 65,
        wind_kph: 12.6,
        wind_dir: 'NW',
        precip_mm: 0,
        feelslike_c: 34
      },
      forecast: {
        forecastday: [
          {
            date: '2023-05-01',
            day: {
              maxtemp_c: 36,
              mintemp_c: 25,
              condition: {
                text: 'Sunny',
                icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
              }
            }
          },
          {
            date: '2023-05-02',
            day: {
              maxtemp_c: 35,
              mintemp_c: 26,
              condition: {
                text: 'Partly cloudy',
                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
              }
            }
          },
          {
            date: '2023-05-03',
            day: {
              maxtemp_c: 33,
              mintemp_c: 27,
              condition: {
                text: 'Light rain',
                icon: '//cdn.weatherapi.com/weather/64x64/day/296.png'
              }
            }
          }
        ]
      }
    };
  }
};

export const getFormattedForecast = (weatherData: WeatherData): WeatherForecast[] => {
  return weatherData.forecast.forecastday.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition.text,
    icon: day.day.condition.icon
  }));
};
