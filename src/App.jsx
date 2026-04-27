/*import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Launches from "./pages/Launches";
import Rockets from "./pages/Rockets";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/rockets" element={<Rockets />} />
         
        </Routes>
      </main>
    </div>
  );
}

export default App;*/




import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Launches from "./Pages/Launches";
import Rockets from "./Pages/Rockets";
import LaunchDetail from "./Pages/LaunchDetails";


function App() {
  return (
    <>
      {/* 🔥 VIDEO BACKGROUND */}
   <div className="video-bg">
  <video className="video-dark" autoPlay loop muted playsInline>
    <source src="/mars.mp4" type="video/mp4" />
  </video>

  <video className="video-light" autoPlay loop muted playsInline>
    <source src="/mars-light.mp4" type="video/mp4" />
  </video>
</div>




      {/* 🔥 MAIN APP */}
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/rockets" element={<Rockets />} />

          <Route path="/launches/:id" element={<LaunchDetail />} />

          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;