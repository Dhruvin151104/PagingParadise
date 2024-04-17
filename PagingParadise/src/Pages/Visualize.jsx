import React, { useState, useRef, useEffect } from "react";
import Alert from "../components/Alert";
import { motion, AnimatePresence } from "framer-motion";
import ChooseAlgorithm from "../components/ChooseAlgorithm";
import AnswerPage from "../components/AnswerPage";

function Visualize(props) {
  const [showAlert, setshowAlert] = useState(false);
  const [showPageSeq, setshowPageSeq] = useState(false);
  const [showFinalSequence, setshowFinalSequence] = useState(false);
  const [pageNo, setpageNo] = useState("");
  const [index, setindex] = useState(0);
  const [frameSize, setframeSize] = useState("");
  const [showAnswer, setshowAnswer] = useState(false);
  const message = useRef(null);
  const seqValues = useRef({});
  const focusRefSeq = useRef({});

  const validInput = (e) => {
    if (e.target.value === "") return e.target.value;
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);

    if (value < min) return min;
    return value;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      setindex(() => index + 1);
    }
  };

  useEffect(() => {
    focusRefSeq.current[index] && focusRefSeq.current[index].focus();
  }, [index]);

  useEffect(() => {
    setshowAnswer(() => false);
  }, [props.chooseAlgo, showPageSeq, showFinalSequence]);

  return (
    <div className="h-max w-full  mt-16 flex flex-col items-center gap-20">
      <Alert
        show={showAlert}
        setshow={setshowAlert}
        title="Alert!"
        message={message.current}
      />

      {/* Selection Part */}
      <div className="w-[90%] h-[55vh] max-h-max shadow-inner rounded-xl overflow-hidden flex flex-col items-center">
        {/* Taking Size of Parameters */}
        <div className="w-full h-[20%] bg-gradient-to-r from-slate-300 to-slate-500 flex text-[1.5vw] justify-evenly">
          <div className="h-full  flex justify-center items-center gap-5">
            <p className="font-normal">Enter the frame size</p>
            <input
              type="number"
              placeholder="Eg. 3"
              min="1"
              value={frameSize}
              onChange={(e) => {
                setshowFinalSequence(() => false);
                setframeSize(validInput(e));
              }}
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
                setshowFinalSequence(() => false);
                setshowPageSeq(() => false);
                setpageNo(validInput(e));
              }}
              className="rounded-lg w-[30%] h-[55%] pl-5 remove-arrow font-light focus:outline-emerald-500 bg-gray-100 shadow-inner"
            />
          </div>
        </div>

        {/* Pages Sequence Input */}
        <AnimatePresence>
          <motion.div className="w-full h-[80%] flex justify-center items-center overflow-hidden">
            {/* Start Button */}
            {!showPageSeq && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "linear" }}
                exit={{ opacity: 0 }}
                className="h-full w-full bg-gray-200/90 flex justify-center items-center"
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
                    } else {
                      seqValues.current = {};
                      focusRefSeq.current = {};
                      setshowPageSeq(true);
                    }
                  }}
                >
                  Enter Page Sequence
                </button>
              </motion.div>
            )}

            {/* Taking sequence input */}
            {showPageSeq && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "linear" }}
                exit={{ opacity: 0 }}
                className="w-full h-full bg-white"
              >
                {/* Single Input */}
                <div className="w-full h-[60%] flex items-center px-5">
                  <div
                    className={`h-[60%] w-full flex overflow-auto items-center ${
                      pageNo >= 9 ? "justify-start" : " justify-center"
                    }`}
                  >
                    <div className="h-full min-w-[15%] w-[15%] text-[1.4vw] font-medium flex flex-col gap-3">
                      <div className="h-1/2 w-full flex justify-center items-center border-b-emerald-400 border-b-2">
                        Page No.
                      </div>
                      <div className="h-1/2 w-full flex justify-center items-center">
                        Sequence
                      </div>
                    </div>
                    {/* Mapping Part */}
                    {[...Array(pageNo)].map((_, ind) => {
                      return (
                        <div
                          key={ind}
                          className="h-full min-w-[10%] w-[10%] flex flex-col gap-3"
                        >
                          <div
                            className={`h-1/2 w-full flex justify-center items-center font-medium text-[1.4vw] duration-300 ease-linear border-b-emerald-400 border-b-2 ${
                              index === ind + 1
                                ? "text-black "
                                : "text-neutral-400"
                            } `}
                          >
                            P{ind + 1}
                          </div>
                          <div className="h-1/2 w-full flex justify-center items-center">
                            <input
                              type="number"
                              min="0"
                              ref={(el) => (focusRefSeq.current[ind + 1] = el)}
                              onClick={() => setindex(ind + 1)}
                              onChange={(e) => {
                                setshowFinalSequence(() => false);
                                e.target.value = validInput(e);
                                seqValues.current[ind + 1] = e.target.value;
                              }}
                              onKeyDown={handleKeyDown}
                              className={`h-[95%] w-[65%] rounded-lg remove-arrow text-[1.4vw] font-medium bg-gray-200 shadow-inner text-center duration-300 ease-linear ${
                                index === ind + 1
                                  ? "focus:outline-emerald-500"
                                  : " focus:outline-none"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Input */}
                <div className="w-full h-[40%] flex justify-center items-start">
                  {!showFinalSequence && (
                    <button
                      onClick={() => {
                        if (frameSize === "") {
                          message.current = "Please enter frame size";
                          setshowAlert(true);
                        } else if (frameSize > 30) {
                          message.current = "Maximum frame size allowed is 30";
                          setshowAlert(() => true);
                        } else {
                          for (let j = 1; j <= pageNo; j++) {
                            if (!focusRefSeq.current[j].value) {
                              message.current = `Enter the value for Page No. ${j}`;
                              setshowAlert(true);
                              return;
                            }
                          }
                          setshowFinalSequence(true);
                        }
                      }}
                      className="w-max font-medium mt-10 px-5 py-2 bg-emerald-400 rounded-lg text-[1.4vw] duration-300 ease-linear text-black hover:bg-emerald-300"
                    >
                      Confirm Sequence
                    </button>
                  )}

                  {showFinalSequence && (
                    <div className="w-full h-full  flex justify-evenly items-center text-[1.6vw] px-5 flex-col border-t-red-300 border-t-[3px]">
                      <div className="h-1/2 w-full  flex justify-center gap-5 font-medium">
                        <div className="h-full w-1/2 flex justify-center items-center">
                          Frame Size : {frameSize}
                        </div>
                        <div className="h-full w-1/2 flex items-center justify-center gap-5">
                          <div className="text-right">Sequence:</div>
                          <div className="flex overflow-auto">
                            {Object.values(focusRefSeq.current).map(
                              (element, ind) => {
                                return (
                                  <p key={ind} className="h-full">
                                    {element.value +
                                      (ind + 1 !== pageNo ? ", " : ".")}
                                  </p>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Generating answer button */}
                      <div className="h-1/2 w-full flex justify-center items-start">
                        <button
                          className="w-max font-medium px-5 py-2 bg-emerald-400 rounded-lg text-[1.4vw] duration-300 ease-linear text-black hover:bg-emerald-300"
                          onClick={() => {
                            if (props.chooseAlgo === 0) {
                              message.current = "Choose some algorithm";
                              setshowAlert(() => true);
                            } else {
                              setshowAnswer(() => true);
                            }
                          }}
                        >
                          Generate Answer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Generating Answer */}
      {showAnswer && (
        <div className="h-max w-[90%] rounded-xl flex flex-col items-center gap-10 overflow-hidden bg-gray-200/90">
          <div className="h-[10vh] w-full text-[1.8vw] font-medium flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
            {props.chooseAlgo === 1 ? "First In First Out (FIFO)" : ""}
            {props.chooseAlgo === 2 ? "Optimal Page Replacement" : ""}
            {props.chooseAlgo === 3 ? "Least Recently Used (LRU)" : ""}
          </div>
          <AnswerPage data={seqValues.current} frameSize={frameSize} chooseAlgo={props.chooseAlgo}/>
        </div>
      )}
    </div>
  );
}

export default Visualize;
