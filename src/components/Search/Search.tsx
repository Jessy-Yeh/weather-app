import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  getWeather: () => void;
  setLocation: Dispatch<SetStateAction<string | null>>;
}

export const Search = ({ getWeather, setLocation }: IProps) => {
  const [textInput, setTextInput] = useState("");

  function handleClick() {
    getWeather();
  }

  function handleChange(e: any) {
    setTextInput(e.target.value);
    setLocation(textInput);
  }

  return (
    <>
      <input onChange={handleChange} />
      <button onClick={handleClick}>GO</button>
    </>
  );
};
