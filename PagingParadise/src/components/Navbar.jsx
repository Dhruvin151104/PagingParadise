import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const element = (props) => {
    return (
      <Link
        to={props.link}
        className="text-lg w-[40%] text-gray-400 font-medium flex justify-center items-center cursor-pointer py-1 "
      >
        <span className="hover:border-b-emerald-500 hover:border-b-[3px] duration-150 ease-linear hover:text-emerald-500 py-1 hover:text-xl">
          {props.text}
        </span>
      </Link>
    );
  };
  return (
    <div className=" h-24 w-full flex px-20">
      <Link to="/" className="h-full w-[50%]">
        <Logo />
      </Link>
      <div className="h-full w-[50%]  flex justify-center items-center gap-20">
        {element({ text: "Page Replacement", link: "/pagereplacementalgorithm" })}
        {element({ text: "Reader/Writer", link: "/readerwriter" })}
      </div>
    </div>
  );
}

export default Navbar;
