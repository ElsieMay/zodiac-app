interface ButtonProps {
  onPress: () => void;
  bgColour: string;
  colour: string;
  text: string;
}

function Button({ onPress, text, bgColour, colour }: ButtonProps) {
  return (
    <button
      type="button"
      className="home-button"
      onClick={onPress}
      data-bg-colour={bgColour}
      data-text-colour={colour}
    >
      {text}
    </button>
  );
}

export default Button;
