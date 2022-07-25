import { useState } from "react";

import search from "../../icons/rightarrow.svg";

import styles from "./Search.module.css";

interface IProps {
  getWeather: (location: string) => void;
  getBackgroundImage: (location: string) => void;
}

export const Search = ({ getWeather, getBackgroundImage }: IProps) => {
  const [textInput, setTextInput] = useState("");

  function searchWeather() {
    getWeather(textInput);
    getBackgroundImage(textInput);
    setTextInput("");
  }

  function handleClick() {
    searchWeather();
  }

  function handleEnter(e: any) {
    if (e.code === "Enter") {
      searchWeather();
    }
  }

  function handleChange(e: any) {
    setTextInput(e.target.value);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onKeyUp={handleEnter}
        onChange={handleChange}
        value={textInput}
      />
      <button className={styles.search} onClick={handleClick}>
        <img className={styles.searchIcon} alt="search" src={search} />
      </button>
    </div>
  );
};
