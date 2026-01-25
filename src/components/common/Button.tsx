import type { ButtonProps } from "../../types/component.types";

function Button({ onPress, text }: ButtonProps) {
  return (
    <button
      type="button"
      className="home-button"
      onClick={onPress}
      data-testid="button"
    >
      {text}
    </button>
  );
}

export default Button;
