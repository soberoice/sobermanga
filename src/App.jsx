import { Provider } from "./components/ui/provider";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import SearchFeed from "./Pages/SearchFeed";
import Navbar from "./components/Navbar";
import MangaDetails from "./Pages/MangaDetails";
import MangaView from "./components/MangaView";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/search/:searchterm" element={<SearchFeed />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route
            path="/read/:mangaid/:id/:chapter/:title"
            element={<MangaView />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
