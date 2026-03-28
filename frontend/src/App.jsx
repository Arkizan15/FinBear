import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return(
    <div>
      {isLoading ? (
        <Loading onFinish={() => setIsLoading(false)} />
      ) : (
        <div>
        <Navbar />
        <Routes>
          <Route />
          <Route />
          <Route />
        </Routes>
        <Home />
        </div>
      )}
      
    </div>
  )
};

export default App;