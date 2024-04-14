import React from "react";
import fifo from "../assets/fifo.png";
import opr from "../assets/opr.png";
import lru from "../assets/lru.png";

function ChooseAlgorithm(props) {
  const card = ({ind,imgName,text}) => {
    return (
      <div className={`w-[30%] h-full bg-white shadow-inner rounded-lg overflow-hidden cursor-pointer duration-150 ease-linear   ${props.index===ind?"bg-green-200/50 outline-emerald-300 outline":"hover:outline-red-300 hover:outline"}`} onClick={()=>props.setindex(ind)}>
        <div className="w-full h-[60%]  flex justify-center items-center pt-5">
          <img src={imgName} alt="" className="h-[80%]" />
        </div>
        <div className="w-full h-[40%] flex justify-center items-center text-[1.45vw] font-light px-2">
          {text}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-200/90 rounded-xl overflow-hidden flex flex-col gap-5">
      <div className="w-full h-[20%] flex justify-center items-center text-[1.8vw] bg-red-300 ">
        Choose Algorithm
      </div>
      <div className="h-[70%] w-full flex justify-evenly items-center">
        {card({ind:1,text:"First In First Out (FIFO)",imgName:fifo})}
        {card({ind:2,text:"Optimal Page Replacement",imgName:opr})}
        {card({ind:3,text:"Least Recently Used (LRU)",imgName:lru})}
      </div>
    </div>
  );
}

export default ChooseAlgorithm;
