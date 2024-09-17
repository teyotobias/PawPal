import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DogGallery from "./pages/DogGallery/DogGallery";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<DogGallery />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
