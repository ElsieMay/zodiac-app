interface ButtonProps {
  onPress: () => void;
  bgColour: string;
  colour: string;
  text: string;
}

function Button({ onPress, text, bgColour, colour }: ButtonProps) {
  return (
    <button
      className="home-button"
      onClick={onPress}
      style={{ backgroundColor: `${bgColour}`, color: `${colour}` }}
    >
      {text}
    </button>
  );
}

export default Button;
