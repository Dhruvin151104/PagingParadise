import React, { useEffect } from "react";
import home from "../assets/home.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[80vh] w-full flex mt-5 px-20"
    >
      <div className="w-1/2 h-full  flex flex-col justify-center gap-7 pr-20">
        <p className="text-3xl font-medium">
          <span className="text-emerald-500">Page</span> Replacement Algorithm
        </p>
        <div className="text-md font-light flex flex-col gap-2">
          <p>
            One of the techniques which are used for memory management is
            paging. In paging, processes are divided into pages and main memory
            is divided into frames.
          </p>
          <p>
            Pages of a process are loaded into frames of main memory when
            required.Page Replacement Algorithm is used when a page fault
            occurs. Page Fault means the page referenced by the CPU is not
            present in the main memory.
          </p>
          <p>
            {" "}
            Page Replacement Algorithm is used to decide which page will be
            replaced to allocate memory to the current referenced page.There
            different types of Page Replacement Algorithm...
          </p>
        </div>

        <Link
          to="/pagereplacementalgorithm"
          className="w-max px-5 py-2 bg-emerald-500 rounded-lg text-lg mt-3 hover:bg-emerald-300 duration-300 ease-linear"
        >
          Learn More...
        </Link>
      </div>
      <div className="w-1/2 h-full  flex justify-center items-center">
        <img src={home} alt="" className="h-full" />
      </div>
    </motion.div>
  );
}

export default Home;
