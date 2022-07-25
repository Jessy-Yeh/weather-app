import { PropsWithChildren } from "react";

import styles from "./Background.module.css";

interface IProps {
  backgroundImg: string | null;
}

export const Background = ({
  backgroundImg,
  children,
}: PropsWithChildren<IProps>) => {
  const styleObj = {
    backgroundImage: `url(${backgroundImg})`,
  };

  return (
    <div className={styles.background} style={styleObj}>
      {children}
    </div>
  );
};
