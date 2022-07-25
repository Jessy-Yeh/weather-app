import { useState } from "react";
import axios from "axios";
import { Search } from "./components/Search/Search";
import { Display } from "./components/Display/Display";
import { Background } from "./components/Background/Background";

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
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [isError, setIsError] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);

  async function getWeather(location: string) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=d32c84d25a194393b5f92754221807&q=${location}&days=3`;

    try {
      const response = await axios.get(url);
      console.log(response);
      setIsError(false);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }

  async function getBackgroundImage(location: string) {
    const url = `https://api.unsplash.com/search/photos?client_id=ll_NH5KWzn6lpZGVnNQb53PKH65mFhVVGIRCGhPjsT0&query=${location}`;

    try {
      const response = await axios.get(url);
      console.log(response);
      setBackgroundImg(response.data.results[0].urls.regular);
    } catch (error) {
      console.log(error);
      setBackgroundImg(null);
    }
  }

  return (
    <Background backgroundImg={backgroundImg}>
      <h1>How's the Weather?</h1>
      <Search getWeather={getWeather} getBackgroundImage={getBackgroundImage} />
      {weatherData || isError ? (
        <Display weatherData={weatherData} isError={isError} />
      ) : (
        <p className="reminder">search any city...</p>
      )}
    </Background>
  );
}

export default App;
