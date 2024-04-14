import React, { useState, useRef, useEffect } from "react";
import Alert from "../components/Alert";
import { motion, AnimatePresence } from "framer-motion";
import ChooseAlgorithm from "../components/ChooseAlgorithm";

function Visualize() {
  const [showAlert, setshowAlert] = useState(false);
  const [showPageSeq, setshowPageSeq] = useState(false);
  const [pageNo, setpageNo] = useState("");
  const [index, setindex] = useState(0);
  const [frameSize, setframeSize] = useState("");
  const message = useRef(null);
  const seqValues = useRef({});
  const focusRefSeq = useRef({});
  const [chooseAlgo, setchooseAlgo] = useState(0)

  const validInput = (e) => {
    if (e.target.value === "") return e.target.value;
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);

    if (value < min) return min;
    return value;
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if(e.key==='Tab'){
        e.preventDefault()
    }
    if (e.key === "Enter") {
      setindex(() => index + 1);
    }
  };

  useEffect(() => {
    console.log(focusRefSeq.current[index]);
    focusRefSeq.current[index] && focusRefSeq.current[index].focus();
  }, [index]);

  return (
    <div className="h-[100vh] w-full  mt-16 flex flex-col items-center gap-10 mb-10">
      <Alert
        show={showAlert}
        setshow={setshowAlert}
        title="Alert!"
        message={message.current}
      />

      {/* Selection Part */}
      <div className="w-[90%] h-[50%] shadow-inner rounded-xl overflow-hidden flex flex-col items-center relative">
        {/* Taking Size of Parameters */}
        <div className="w-full h-[25%] bg-red-300 flex text-[1.5vw] justify-evenly relative z-10">
          <div className="h-full  flex justify-center items-center gap-5">
            <p className="font-normal">Enter the frame size</p>
            <input
              type="number"
              placeholder="Eg. 3"
              min="1"
              value={frameSize}
              onChange={(e) => setframeSize(validInput(e))}
              className="rounded-lg w-[30%] h-[55%] pl-5 remove-arrow font-light focus:outline-emerald-500 bg-gray-100 shadow-inner"
            />
          </div>
          <div className="h-full  flex justify-center items-center gap-5">
            <p className="font-normal">Enter the number of pages</p>
            <input
              type="number"
              placeholder="Eg. 8"
              min="1"
              value={pageNo}
              onChange={(e) => {
                setshowPageSeq(() => false);
                setpageNo(validInput(e));
              }}
              className="rounded-lg w-[30%] h-[55%] pl-5 remove-arrow font-light focus:outline-emerald-500 bg-gray-100 shadow-inner"
            />
          </div>
        </div>

        {/* Pages Sequence Input */}
        <div className="w-full h-[75%] flex justify-center items-center relative">
          <AnimatePresence>
            {!showPageSeq && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.8, 1] }}
                exit={{ opacity: 0 }}
                className="h-full w-full bg-gray-200/90 flex justify-center items-center absolute transition-opacity duration-1000 ease-linear"
              >
                <button
                  disabled={pageNo === ""}
                  className={`w-max font-medium  px-7 py-3 bg-emerald-400 rounded-lg text-[1.5vw] duration-300 ease-linear ${
                    pageNo === ""
                      ? " text-neutral-500 cursor-not-allowed"
                      : "text-black hover:bg-emerald-300"
                  }`}
                  onClick={() => {
                    setindex(0);
                    if (pageNo > 30) {
                      message.current = "Maximum number of pages allowed is 30";
                      setshowAlert(true);
                    } else setshowPageSeq(true);
                  }}
                >
                  Enter Page Sequence
                </button>
              </motion.div>
            )}

            {showPageSeq && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.8, 1] }}
                exit={{ opacity: 0 }}
                className="w-full h-full bg-white flex items-center absolute duration-1000 ease-linear px-5 "
              >
                <div className="h-[50%] min-w-[15%] w-[15%] text-lg font-medium flex flex-col gap-3">
                  <div className="h-1/2 w-full flex justify-center items-center border-b-emerald-400 border-b-2">
                    Page No.
                  </div>
                  <div className="h-1/2 w-full flex justify-center items-center">
                    Sequence
                  </div>
                </div>
                <div className="h-[50%] w-[85%] flex overflow-auto">
                  {[...Array(pageNo)].map((_, ind) => {
                    return (
                      <div
                        key={ind}
                        className="h-full min-w-[12%] w-[12%] flex flex-col gap-3"
                      >
                        <div
                          className={`h-1/2 w-full flex justify-center items-center font-medium text-xl duration-300 ease-linear border-b-emerald-400 border-b-2 ${
                            index === ind+1 ? "text-black " : "text-neutral-400"
                          } `}
                        >
                          P{ind + 1}
                        </div>
                        <div className="h-1/2 w-full flex justify-center items-center">
                          <input
                            type="number"
                            min="1"
                            ref={(el) => (focusRefSeq.current[ind+1] = el)}
                            onClick={() => setindex(ind+1)}
                            onChange={(e) => {
                                e.target.value = validInput(e)
                                seqValues.current[ind+1]=e.target.value
                            }}
                            onKeyDown={handleKeyDown}
                            className={`h-[95%] w-[65%] rounded-lg remove-arrow text-lg font-medium bg-gray-200 shadow-inner text-center duration-300 ease-linear ${
                              index === ind+1
                                ? "focus:outline-emerald-500"
                                : " focus:outline-none"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Choosing Algorithm */}
      <div className="w-[90%] h-[50%]">
        <ChooseAlgorithm index={chooseAlgo} setindex={setchooseAlgo}/>
      </div>
    </div>
  );
}

export default Visualize;
