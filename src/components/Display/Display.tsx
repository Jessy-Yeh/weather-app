import { IWeatherData } from "../../App";
import { DayWeather } from "../DayWeather/DayWeather";

import humidity from "../../icons/humidity.png";
import temperature from "../../icons/temperature.png";
import man from "../../icons/man.png";
import errorIcon from "../../icons/error.svg";

import styles from "./Display.module.css";

interface IProps {
  weatherData: IWeatherData | null;
  isError: boolean;
}

export const Display = ({ weatherData, isError }: IProps) => {
  if (isError) {
    return (
      <p className={styles.error}>
        <img className={styles.errorIcon} alt="error" src={errorIcon} />
        INVALID SEARCH
      </p>
    );
  }

  if (!weatherData) return null;

  const iconUrl = weatherData.current.condition.icon.substring(2);
  const weatherImg = `https://${iconUrl}`;

  return (
    <div className={styles.container}>
      <img alt="weather" src={weatherImg}></img>
      <h3
        className={styles.location}
      >{`${weatherData.location.name}, ${weatherData.location.country}`}</h3>
      <p>Today is {weatherData.current.condition.text}</p>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>
          <img className={styles.Icon} alt="humidity" src={temperature} />{" "}
          {weatherData.current.temp_c}°C
        </p>

        <p className={styles.description}>
          <img className={styles.Icon} alt="humidity" src={man} />{" "}
          {weatherData.current.feelslike_c}°C
        </p>

        <p className={styles.description}>
          <img className={styles.Icon} alt="humidity" src={humidity} />{" "}
          {weatherData.current.humidity}%
        </p>
      </div>

      <ul className={styles.ul}>
        {weatherData.forecast.forecastday.map((item) => {
          return (
            <DayWeather
              date={item.date}
              icon={item.day.condition.icon}
              maxTemp={item.day.maxtemp_c}
              minTemp={item.day.mintemp_c}
              key={item.date}
            />
          );
        })}
      </ul>
    </div>
  );
};
