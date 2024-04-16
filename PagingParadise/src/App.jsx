import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import PageReplacement from "./Pages/PageReplacement";
import ReaderWriter from "./Pages/ReaderWriter";


function App() {
  return (
    <div className="bg-gray-100 w-full min-h-[100vh] font-[Poppins] px-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/pagereplacementalgorithm" element={<PageReplacement />}/>
        <Route path="/readerwriter" element={<ReaderWriter />}/>
      </Routes>
    </div>
  )
}

export default App
