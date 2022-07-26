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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=3`;

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
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_IMG_API_KEY}&query=${location}`;

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
      <div className="search-container">
        <h1>How's the Weather?</h1>
        <Search
          getWeather={getWeather}
          getBackgroundImage={getBackgroundImage}
        />
      </div>
      {weatherData || isError ? (
        <Display weatherData={weatherData} isError={isError} />
      ) : (
        <p className="reminder">search any city...</p>
      )}
    </Background>
  );
}

export default App;
