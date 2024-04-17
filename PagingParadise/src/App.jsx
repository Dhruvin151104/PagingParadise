import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import PageReplacement from "./Pages/PageReplacement";
import ReaderWriter from "./Pages/ReaderWriter";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="bg-gray-100 w-full min-h-[100vh] font-[Poppins]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/pagereplacementalgorithm" element={<PageReplacement />}/>
        <Route path="/readerwriter" element={<ReaderWriter />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
