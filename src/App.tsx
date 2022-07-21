import { useState } from "react";
import axios from "axios";
import { Search } from "./components/Search/Search";
import { Display } from "./components/Display/Display";

interface ICondition {
  text: string;
  icon: string;
}

export interface ICurrentData {
  condition: ICondition;
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

function App() {
  const [location, setLocation] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<ICurrentData | null>(null);
  const [locationData, setLocationData] = useState<ILocationData | null>(null);
  const [error, setError] = useState(false);

  const url = `https://api.weatherapi.com/v1/current.json?key=d32c84d25a194393b5f92754221807&q=${location}`;

  async function getWeather() {
    try {
      const response = await axios.get(url);
      console.log(response);
      setError(false);
      setCurrentData(response.data.current);
      setLocationData(response.data.location);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  return (
    <>
      <h1>How's the Weather?</h1>
      <Search getWeather={getWeather} setLocation={setLocation} />
      {currentData === null ? (
        <p>no search results</p>
      ) : (
        <Display
          currentData={currentData}
          locationData={locationData}
          error={error}
        />
      )}
    </>
  );
}

export default App;
