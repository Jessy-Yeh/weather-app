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
  return (
    <li key={`${date}weather`}>
      <h3>{date}</h3>
      <img alt="weather" src={weatherImg} />
      <p>{maxTemp}</p>
      <p>{minTemp}</p>
    </li>
  );
};
