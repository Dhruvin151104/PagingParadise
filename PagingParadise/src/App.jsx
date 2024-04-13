import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Learn from "./Pages/Learn";

function App() {
  return (
    <div className="bg-gray-100 w-full min-h-[100vh] font-[Poppins] px-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/learn" element={<Learn />}/>
      </Routes>
    </div>
  )
}

export default App
