import { useState } from "react";
import Loading from "./pages/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return(
    <div>
      {isLoading ? (
        <Loading onFinish={() => setIsLoading(false)} />
      ) : (
        <div>Home Page</div>
      )}
    </div>
  )
};

export default App;