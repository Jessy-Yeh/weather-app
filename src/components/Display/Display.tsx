import { ICurrentData, ILocationData } from "../../App";
import styles from "./Display.module.css";
import humidity from "../../icons/humidity.png";
import temperature from "../../icons/temperature.png";
import man from "../../icons/man.png";

interface IProps {
  currentData: ICurrentData | null;
  locationData: ILocationData | null;
}

export const Display = ({ currentData, locationData }: IProps) => {
  if (!currentData || !locationData) return null;

  const iconUrl = currentData.condition.icon.substring(2);
  const weatherImg = `https://${iconUrl}`;

  return (
    <div className={styles.container}>
      <img alt="weather" src={weatherImg}></img>
      <h3>{`${locationData.name}, ${locationData.country}`}</h3>
      <p>today is {currentData.condition.text}</p>
      <p>
        <img className={styles.Icon} alt="humidity" src={temperature} />
        {currentData.temp_c}°C
      </p>
      <p>
        {" "}
        <img className={styles.Icon} alt="humidity" src={man} />
        {currentData.feelslike_c}°C
      </p>

      <p>
        <img className={styles.Icon} alt="humidity" src={humidity} />
        {currentData.humidity}%
      </p>
    </div>
  );
};
