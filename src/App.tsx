import { useState } from "react";
import axios from "axios";
import { Search } from "./components/Search/Search";
import { Display } from "./components/Display/Display";

interface ICondition {
  text: string;
  icon: string;
}

export interface IData {
  condition: ICondition;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
}

function App() {
  const [location, setLocation] = useState<string | null>(null);
  const [data, setData] = useState<IData | null>(null);

  const url = `https://api.weatherapi.com/v1/current.json?key=d32c84d25a194393b5f92754221807&q=${location}`;

  async function getWeather() {
    try {
      const response = await axios.get(url);
      console.log(response);
      setData(response.data.current);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Weather</h1>
      <Search getWeather={getWeather} setLocation={setLocation} />
      {data === null ? <p>no search results</p> : <Display data={data} />}
    </>
  );
}

export default App;
