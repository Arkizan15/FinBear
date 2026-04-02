import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <Loading onFinish={() => setIsLoading(false)} />
  }

  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route 
          path="/"
          element={
            <>
              <Navbar />
              <div className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />}/>
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </>
  )
};

export default App;