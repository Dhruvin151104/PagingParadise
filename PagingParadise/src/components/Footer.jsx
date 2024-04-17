import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import page_replacement from "../assets/page_replacement.png";
import reader_writer from "../assets/reader_writer.png"

function Footer() {
  return (
    <div className="w-full h-[50vh] bg-gradient-to-r from-slate-300 to-slate-400 mt-20 flex px-20">
      <div className="h-full w-[50%] flex flex-col justify-center items-center gap-3">
        <div className="w-full h-24">
          <Link to="/" className="h-[10%] w-[50%]">
            <Logo />
          </Link>
        </div>
        <div className="h-max text-sm font-light pr-20">
          Discover the intricacies of page replacement algorithms and the
          reader-writer problem on our website. Explore essential concepts in
          memory management and synchronization in modern computing.
        </div>
        <div className="h-max w-full flex gap-5">
          <a
            href="https://www.linkedin.com/in/dhruvin-savla-4991a1259/"
            target="blank"
            className="h-9"
          >
            <img src={linkedin} alt="" className="h-full" />
          </a>
          <a
            href="https://github.com/Dhruvin151104/PagingParadise"
            target="blank"
            className="h-9"
          >
            <img src={github} alt="" className="h-full" />
          </a>
        </div>
      </div>
      <div className="h-full w-[50%] flex justify-end items-center gap-28">
        <div className="h-[60%] w-[45%] bg-slate-400 rounded-xl cursor-pointer">
          <Link to="/pagereplacementalgorithm">
            <div className="h-full w-full bg-slate-400/90 shadow-2xl hover:-translate-x-3 hover:bg-slate-500 hover:-translate-y-3 duration-150 ease-linear rounded-xl ">
              <div className="h-[70%] w-full flex justify-center items-center">
                <img src={page_replacement} alt="" className="h-[60%]" />
              </div>
              <div className="h-[30%] w-full flex justify-center items-center text-center text-[1.2vw] font-light">
                Page Replacement Algorithms
              </div>
            </div>
          </Link>
        </div>
        <div className="h-[60%] w-[45%] bg-slate-500/30 rounded-xl cursor-pointer">
          <Link to="/readerwriter">
            <div className="h-full w-full bg-slate-500/20 hover:bg-slate-500 shadow-2xl hover:-translate-x-3 hover:-translate-y-3 duration-150 ease-linear rounded-xl px-5">
              <div className="h-[70%] w-full flex justify-center items-center">
                <img src={reader_writer} alt="" className="h-[60%]" />
              </div>
              <div className="h-[30%] w-full flex justify-center items-center text-center text-[1.3vw] font-light">
                Reader Writer Problem
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
