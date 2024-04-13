import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const element = (props) => {
    return (
      <Link
        to={props.link}
        className="text-lg w-[10%] text-gray-400 font-medium flex justify-center items-center cursor-pointer py-1 "
      >
        <span className="hover:border-b-emerald-500 hover:border-b-[3px] duration-150 ease-linear hover:text-emerald-500 hover:text-xl">
          {props.text}
        </span>
      </Link>
    );
  };
  return (
    <div className=" h-24 w-full flex">
      <div className="h-full w-[30%]">
        <Logo />
      </div>
      <div className="h-full w-[70%]  flex justify-center items-center gap-20">
        {element({ text: "Learn", link: "/learn" })}
        {element({ text: "Practice", link: "/" })}
        {element({ text: "Visualize", link: "/" })}
      </div>
    </div>
  );
}

export default Navbar;
