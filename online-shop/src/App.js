import Navbar from "./components/UI/navbar/Navbar";
import AboutShopPage from "./components/AboutShopPage";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="App">
        <AboutShopPage />
      </div>
    </>
  );
};

export default App;
