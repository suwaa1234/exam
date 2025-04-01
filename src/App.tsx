import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<NoteDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
