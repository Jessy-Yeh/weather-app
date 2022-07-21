import { ICurrentData, ILocationData } from "../../App";
import styles from "./Display.module.css";
import humidity from "../../icons/humidity.png";
import temperature from "../../icons/temperature.png";
import man from "../../icons/man.png";
import errorIcon from "../../icons/error.svg";

interface IProps {
  currentData: ICurrentData | null;
  locationData: ILocationData | null;
  error: boolean;
}

export const Display = ({ currentData, locationData, error }: IProps) => {
  if (!currentData || !locationData) return null;

  if (error === true) {
    return (
      <p className={styles.error}>
        <img className={styles.errorIcon} alt="error" src={errorIcon} />
        INVALID SEARCH
      </p>
    );
  }

  const iconUrl = currentData.condition.icon.substring(2);
  const weatherImg = `https://${iconUrl}`;

  return (
    <div className={styles.container}>
      <img alt="weather" src={weatherImg}></img>
      <h3>{`${locationData.name}, ${locationData.country}`}</h3>
      <p>Today is {currentData.condition.text}</p>
      <p className={styles.description}>
        <img className={styles.Icon} alt="humidity" src={temperature} />{" "}
        {currentData.temp_c}°C
      </p>

      <p className={styles.description}>
        <img className={styles.Icon} alt="humidity" src={man} />{" "}
        {currentData.feelslike_c}°C
      </p>

      <p className={styles.description}>
        <img className={styles.Icon} alt="humidity" src={humidity} />{" "}
        {currentData.humidity}%
      </p>
    </div>
  );
};
