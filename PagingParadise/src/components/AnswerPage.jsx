import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnswerPage(props) {
  const totalPageFaults = useRef(0);
  const data = Object.values(props.data);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [finalSequence, setfinalSequence] = useState([]);
  const [pageFaultIndex, setpageFaultIndex] = useState([]);

  // Check whether current frames contains the page
  const containFrame = ({ frames, value }) => {
    return frames.indexOf(value);
  };

  // To insert data in answer matrix
  const insertData = ({ ans, redFrame, frames }) => {
    var arr = [];
    for (let j = 0; j < props.frameSize; j++) {
      arr.push({ value: frames[j] ? frames[j] : "-", isRed: redFrame == j });
    }
    ans.push(arr);
  };

  // Return which frame to be replaced from queue
  const frameOutIndex = ({ queue, frames ,index}) => {
    if (props.chooseAlgo !=2) return 0;
    else {
      var ind={index:0,max:0}
      queue.map((element,i)=>{
        const lastIndex = data.indexOf(frames[element],index)
        if(ind.max!=-1 && (ind.max<lastIndex || lastIndex==-1)){
          ind={index:i,max:lastIndex}
        }
      })
      return ind.index;
    }
  };

  useEffect(() => {
    const frames = [];
    const queue = [];
    const ans = [];
    const faultIndex = [];
    var redFrame = -1;

    data.forEach((element, index) => {
      var isFrameAvailable = containFrame({ frames: frames, value: element });
      if (isFrameAvailable != -1) {
        if (props.chooseAlgo == 3) {
          isFrameAvailable = queue.indexOf(isFrameAvailable)
          const frameOut = queue[isFrameAvailable];
          queue.splice(isFrameAvailable, 1);
          queue.push(frameOut);
        }
        faultIndex[index] = false;
        redFrame = -1;
      } else if (frames.length < props.frameSize) {
        frames.push(element);
        queue.push(queue.length);
        totalPageFaults.current++;
        redFrame = frames.length - 1;
        faultIndex[index] = true;
      } else {
        const frameIndex = frameOutIndex({ queue: queue, frames:frames,index:index });
        const frameOut = queue[frameIndex];
        queue.splice(frameIndex, 1);
        queue.push(frameOut);
        frames[frameOut] = element;
        totalPageFaults.current++;
        redFrame = frameOut;
        faultIndex[index] = true;
      }
      insertData({ ans: ans, redFrame: redFrame, frames: frames });
    });

    setfinalSequence(() => ans);
    setpageFaultIndex(() => faultIndex);
  }, []);

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
        {finalSequence[ind] &&
          finalSequence[ind].map((element, index) => {
            return (
              <motion.div
                key={index}
                className={`w-full h-[8vh] flex justify-center items-center ${
                  element.isRed ? "text-2xl text-red-600" : "bg-white"
                } ${
                  index == props.frameSize - 1
                    ? ""
                    : "border-b-black border-b-[1px]"
                } `}
                animate={
                  element.isRed ? { fontSize: ["1.3vw", "1.7vw", "1.3vw"] } : {}
                }
                transition={{ duration: 1, repeat: Infinity }}
              >
                {element.value}
              </motion.div>
            );
          })}
        <motion.div
          animate={
            pageFaultIndex[ind] ? { fontSize: ["1.3vw", "1.7vw", "1.3vw"] } : {}
          }
          transition={{ duration: 1, repeat: Infinity }}
          className={`w-full h-[8vh] flex justify-center items-center border-t-[3px] border-t-red-400 ${
            pageFaultIndex[ind] ? "text-red-600" : "text-black"
          }`}
        >
          {pageFaultIndex[ind] ? "P" : "-"}
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
          {data.map((value, ind) => {
            return content({ value: value, ind: ind });
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

export default AnswerPage;
