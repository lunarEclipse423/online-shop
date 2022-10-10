import { React } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import Modal from "./components/UI/modal/modal";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <AppRouter />
        </Router>
        <Modal>
          <Login />
        </Modal>
      </div>
    </>
  );
};

export default App;
