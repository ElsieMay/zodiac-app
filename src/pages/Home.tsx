import { useNavigate } from "react-router-dom";
import Button from "../components/common/button/Button";
import Dice from "../components/background/Dice";
import styles from "../components/common/button/Button.module.css";

export function Home() {
  const navigation = useNavigate();

  return (
    <>
      <Dice />
      <div className="text-overlay" data-testid="home-header">
        <h1>You have been summoned for The Awakening</h1>
      </div>
      <div className={styles.buttonOverlay} data-testid="home-button">
        <Button
          onPress={() => navigation("/solaria-map")}
          text={"Enter Solaria"}
        />
      </div>
    </>
  );
}
