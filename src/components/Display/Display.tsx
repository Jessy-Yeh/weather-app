import { IData } from "../../App";
import styles from "./Display.module.css";

interface IProps {
  data: IData | null;
}

export const Display = ({ data }: IProps) => {
  if (!data) return null;

  const iconUrl = data.condition.icon.substring(2);
  const weatherImg = `https://${iconUrl}`;

  return (
    <div className={styles.container}>
      <img alt="weather" src={weatherImg}></img>
      <p>today is {data.condition.text}</p>
      <p>current temperature: {data.temp_c}</p>
      <p>feel temperature: {data.feelslike_c}</p>
      <p>humidity: {data.humidity}%</p>
    </div>
  );
};
