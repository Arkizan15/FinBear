import { useState } from "react";
import { Routes, Route, Outlet  } from "react-router-dom";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import Learn from "./pages/Learn";

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
                <Outlet />
              </div>
            </>
          }
        >
          <Route index element={<Home />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="belajar" element={<Learn />}/>
        </Route>
      </Routes>
    </> 
  )
};

export default App;