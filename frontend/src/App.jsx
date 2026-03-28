import { useState } from "react";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

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
      
        </div>
      )}
      
    </div>
  )
};

export default App;