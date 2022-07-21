import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Search.module.css";
import search from "../../icons/rightarrow.svg";

interface IProps {
  getWeather: () => void;
  setLocation: Dispatch<SetStateAction<string | null>>;
}

export const Search = ({ getWeather, setLocation }: IProps) => {
  const [textInput, setTextInput] = useState("");

  function searchWeather(e: any) {
    if (e.code === "Enter") {
      getWeather();
      e.target.value = "";
    }
  }

  function handleClick() {
    getWeather();
  }

  function handleChange(e: any) {
    setTextInput(e.target.value);
    setLocation(textInput);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onKeyUp={searchWeather}
        onChange={handleChange}
      />
      <button className={styles.search} onClick={handleClick}>
        <img className={styles.searchIcon} alt="search" src={search} />
      </button>
    </div>
  );
};
