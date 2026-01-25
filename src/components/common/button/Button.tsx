import type { ButtonProps } from "../../../types/component.types";
import styles from "./Button.module.css";

function Button({ onPress, text, disabled = false }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onPress}
      disabled={disabled}
      data-testid="button"
    >
      {text}
    </button>
  );
}

export default Button;
