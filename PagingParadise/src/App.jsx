import { Route, Routes } from "react-router-dom";
import logo from "./assets/logo.png"

function App() {

  return (
    <div className=" font-[Poppins] bg-black w-full min-h-[100vh]">
      <div className="w-full h-32">
        <img src={logo} alt="" className="h-full"/>
      </div>
      <Routes>
        {/* <Route path="/" element=""/> */}
      </Routes>
    </div>
  )
}

export default App
