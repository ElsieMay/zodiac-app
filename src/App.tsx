import "./App.css";
import { Background } from "./components/background/Background";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./components/common/error";
import { Home } from "./pages/Home";
import { Solaria } from "./pages/Solaria";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solaria-map" element={<Solaria />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
