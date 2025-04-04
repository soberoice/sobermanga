import { Provider } from "./components/ui/provider";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import SearchFeed from "./Pages/SearchFeed";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/search/:searchterm" exact element={<SearchFeed />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
