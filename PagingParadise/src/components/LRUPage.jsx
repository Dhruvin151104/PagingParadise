import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function LRUPage(props) {
  const data = Object.values(props.data);
  const frameValue = useRef({});
  const isPageFault = useRef(false);
  const totalPageFaults = useRef(0);
  var queue = [];
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    frameValue.current = {};
    for (let j = 1; j <= queue.length; j++) {
      frameValue.current[j] = { value: null, isRed: false };
    }
  }, []);

  const checkFramePresent = (value) => {
    for (let j = 0; j <= props.frameSize; j++) {
      if (
        frameValue.current[queue[j]] &&
        frameValue.current[queue[j]].value === value
      ) {
        const frameOut = queue[j];
        queue.splice(j, 1);
        queue.push(frameOut);
        frameValue.current[frameOut] = { value: value, isRed: false };
        return true;
      }
    }
    return false;
  };

  const isRed = (index) => {
    return frameValue.current[index + 1] && frameValue.current[index + 1].isRed;
  };

  const turnAllWhite = () => {
    isPageFault.current = false;
    Object.values(frameValue.current).map((element) => {
      element.isRed = false;
    });
  };

  const nextSequenceGenerator = (value) => {
    turnAllWhite();
    if (checkFramePresent(value)) return;
    isPageFault.current = true;
    totalPageFaults.current = totalPageFaults.current + 1;
    if (queue.length < props.frameSize) {
      queue.push(queue.length + 1);
      frameValue.current[queue.length] = { value: value, isRed: true };
    } else {
      const frameOut = queue.shift();
      queue.push(frameOut);
      frameValue.current[frameOut] = { value: value, isRed: true };
    }
  };

  const faultPercent = () => {
    const percent = ((totalPageFaults.current / data.length) * 100).toFixed(2);
    return percent;
  };

  //   Value  indicates data
  const content = ({ value, ind }) => {
    return (
      <div
        key={ind}
        className="h-full min-w-[4vw] w-[4vw] text-[1.3vw] font-medium border-l-[1px] border-l-black"
      >
        <div className="w-full h-[8vh] bg-white flex justify-center items-center border-b-emerald-300 border-b-[3px]">
          {value}
        </div>
        {[...Array(props.frameSize)].map((_, index) => {
          return (
            <motion.div
              key={index}
              className={`w-full h-[8vh] flex justify-center items-center ${
                isRed(index) ? "text-2xl text-red-600" : "bg-white"
              } ${
                index == props.frameSize - 1
                  ? ""
                  : "border-b-black border-b-[1px]"
              } `}
              animate={
                isRed(index) ? { fontSize: ["1.3vw", "1.7vw", "1.3vw"] } : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
            >
              {frameValue.current[index + 1]
                ? frameValue.current[index + 1].value
                : "-"}
            </motion.div>
          );
        })}
        <motion.div
          animate={
            isPageFault.current ? { fontSize: ["1.3vw", "1.7vw", "1.3vw"] } : {}
          }
          transition={{ duration: 1, repeat: Infinity }}
          className={`w-full h-[8vh] flex justify-center items-center border-t-[3px] border-t-red-400 ${
            isPageFault.current ? "text-red-600" : "text-black"
          }`}
        >
          {isPageFault.current ? "P" : "-"}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 1 }}
      className="h-max w-full px-5 flex justify-center items-center flex-col gap-10"
    >
      <div className="h-max max-w-full w-max rounded-xl bg-white overflow-hidden flex">
        <div className="h-full min-w-[10vw] w-[10vw] text-[1.3vw] font-medium">
          <div className="w-full h-[8vh] bg-white flex justify-center items-center border-b-emerald-300 border-b-[3px]">
            Process
          </div>
          {[...Array(props.frameSize)].map((_, index) => {
            console.log(index);
            return (
              <div
                key={index}
                className={`w-full h-[8vh] bg-white flex justify-center items-center ${
                  index == props.frameSize - 1
                    ? ""
                    : "border-b-black border-b-[1px]"
                } `}
              >
                Frame{index + 1}
              </div>
            );
          })}
          <div className="w-full h-[8vh] flex justify-center items-center border-t-[3px] border-t-red-400">
            PageFault
          </div>
        </div>
        <div className="h-full max-w-full overflow-auto flex">
          {data.map((value, index) => {
            nextSequenceGenerator(value);
            return content({ value: value, ind: index });
          })}
        </div>
      </div>

      <div className="h-[20%] w-[30%] rounded-lg  flex flex-col justify-center items-center gap-5 text-[1.3vw] font-medium">
        <p>
          <span className="text-emerald-500">Total Page Faults</span> :{" "}
          {totalPageFaults.current}
        </p>
        <p>
          <span className="text-red-500">Fault Rate Percent</span> :{" "}
          {faultPercent()}%
        </p>
      </div>
    </motion.div>
  );
}

export default LRUPage;
