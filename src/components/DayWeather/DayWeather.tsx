import styles from "../DayWeather/DayWeather.module.css";

interface IProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  key: string;
  icon: string;
}

export const DayWeather = ({ date, maxTemp, minTemp, icon }: IProps) => {
  const iconUrl = icon.substring(2);
  const weatherImg = `https://${iconUrl}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(date);
  const dayName = days[d.getDay()];
  return (
    <li className={styles.li} key={`${date}weather`}>
      <h3 className={styles.date}>{dayName}</h3>
      <img alt="weather" src={weatherImg} />
      <div className={styles.temps}>
        <p className={`${styles.temp} ${styles.highTemp}`}>{maxTemp}°</p>
        <p className={styles.temp}>{minTemp}°</p>
      </div>
    </li>
  );
};
