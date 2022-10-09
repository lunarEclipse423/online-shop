import { React } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";

const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <AppRouter />
        </Router>
      </div>
    </>
  );
};

export default App;
