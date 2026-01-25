import type { ButtonProps } from "../../../types/component.types";
import styles from "./Button.module.css";

function Button({ onPress, text }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onPress}
      data-testid="button"
    >
      {text}
    </button>
  );
}

export default Button;
