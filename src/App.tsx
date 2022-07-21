import { useState } from "react";
import axios from "axios";
import { Search } from "./components/Search/Search";
import { Display } from "./components/Display/Display";

export interface ICurrentData {
  condition: {
    text: string;
    icon: string;
  };
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  pressure_mb?: number;
}

export interface ILocationData {
  country: string;
  name: string;
  localtime: string;
}

export interface IForecastData {
  forecastday: {
    date: string;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        icon: string;
      };
    };
  }[];
}

export interface IWeatherData {
  location: ILocationData;
  current: ICurrentData;
  forecast: IForecastData;
}

function App() {
  const [location, setLocation] = useState<string | null>(null);

  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [error, setError] = useState(false);

  const url = `https://api.weatherapi.com/v1/forecast.json?key=d32c84d25a194393b5f92754221807&q=${location}&days=5`;

  async function getWeather() {
    try {
      const response = await axios.get(url);
      console.log(response);
      setError(false);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
      setWeatherData(null);
    }
  }

  return (
    <>
      <h1>How's the Weather?</h1>
      <Search getWeather={getWeather} setLocation={setLocation} />
      {weatherData === null ? (
        <p className="reminder">search any city...</p>
      ) : (
        <Display weatherData={weatherData} error={error} />
      )}
    </>
  );
}

export default App;
