import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

function Alert(props) {
  return (
    <AnimatePresence>
      {props.show && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => props.setshow(false)}
          className="bg-black/30 backdrop-blur p-8 z-50 cursor-pointer font-[Poppins] h-[100vh] w-[100vw] flex justify-center items-center fixed top-0"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-r from-red-300 via-red-400 to-red-500 text-white p-6 rounded-lg  max-w-lg shadow-xl cursor-default relative overflow-hidden h-[40vh] w-[50%] flex justify-evenly items-center"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16  h-16 mb-2 rounded-full text-4xl text-sky-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <div className="text-3xl h-14 font-semibold flex justify-center items-center mb-2">
                {props.title}
              </div>
              <div className="text-center mb-6 text-lg px-5">
                {props.message}
              </div>
              <div className="flex gap-10 justify-center items-center">
                <button className="w-[10vw]  py-2 bg-white/40 text-xl font-semibold rounded-lg text-white shadow-inner hover:bg-black/20 duration-150 ease-in-out" onClick={()=>{props.setshow(false)}}>CANCEL</button>
                <button className="w-[10vw]  py-2 bg-white/40 text-xl font-semibold rounded-lg text-white shadow-inner hover:bg-black/20 duration-150 ease-in-out" onClick={()=>{props.setshow(false)}}>OK!</button>
              </div>
            </div>
          </motion.div>
        </motion.div>}
    </AnimatePresence>
  );
}

export default Alert;