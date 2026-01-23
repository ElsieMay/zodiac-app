interface ButtonProps {
  onPress: () => void;
  text: string;
}

function Button({ onPress, text }: ButtonProps) {
  return (
    <button type="button" className="home-button" onClick={onPress}>
      {text}
    </button>
  );
}

export default Button;
