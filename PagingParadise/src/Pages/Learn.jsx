import React from "react";

function Learn() {
  const line = (text) => {
    return (
      <div className="flex gap-5">
        <p>&gt;</p>
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[100vh] mt-16 flex flex-col gap-10">
      <div className="w-full text-4xl flex justify-center font-light">
        Different Page Replacement Algorithms
      </div>

      <div className="w-full h-[200vh] mt-16 flex flex-col items-center justify-center gap-3">
        <div className="h-[33%] w-full  flex flex-col items-center gap-8">
          <p className="text-3xl font-light  w-full text-center border-b-[3px] border-emerald-300 py-2">
            First In First Out(FIFO)
          </p>

          <div className="text-xl h-[70%] font-light w-full flex flex-col justify-center gap-8 px-20">
            {line(
              "The first in first out page replacement algorithm is the simplest page replacement algorithm."
            )}
            {line(
              "The operating system maintains a list of all pages currently in memory, with the most recently arrived page at the tail and least recent at the head."
            )}
            {line(
              "On a page fault, the page at head is removed and the new page is added to the tail. When a page replacement is required the oldest page in memory needs to be replaced."
            )}
            {line(
              "The performance of the FIFO algorithm is not always good because it may happen that the page which is the oldest is frequently referred by OS."
            )}
            {line(
              "Hence removing the oldest page may create page fault again."
            )}
          </div>
        </div>

        <div className="h-[33%] w-full flex flex-col items-center justify-center gap-8">
          <p className="text-3xl font-light  w-full text-center border-b-[3px] border-emerald-300 py-2">
            Optimal Page Replacement Algorithm
          </p>

          <div className="text-xl h-[90%] font-light w-full flex flex-col justify-center gap-8 px-20">
            {line(
              "After filling up of the frames, the next page in the waiting queue tries to enter the frame. If the frame is present then, no problem is occurred. Because of the page which is to be searched is already present in the allocated frames."
            )}
            {line(
              "If the page to be searched is not found among the frames then, this process is known as Page Fault."
            )}
            {line(
              "Then replace the Page which is not used in the Longest Dimension of time in future"
            )}
            {line(
              "This principle means that after all the frames are filled then, see the future pages which are to occupy the frames. Go on checking for the pages which are already available in the frames. Choose the page which is at last."
            )}
            {line(
              "The only problem with this algorithm is that it is unrealizable."
            )}
            {line(
              "At the time of the page fault, the operating system has no way of knowing when each of the pages will be referenced next."
            )}
          </div>
        </div>

        <div className="h-[33%] w-full flex flex-col justify-center items-center gap-8">
          <p className="text-3xl font-light  w-full text-center border-b-[3px] border-emerald-300 py-2">
            Least Recently Used(LRU)
          </p>

          <div className="text-xl h-[70%] font-light w-full flex flex-col justify-center gap-8 px-20">
            {line(
              "A good approximation to the optimal algorithm is based on the observation that pages that have been heavily used in last few instructions will probably be heavily used again in next few instructions."
            )}
            {line(
              "When page fault occurs, throw out the page that has been used for the longest time. This strategy is called LRU (Least Recently Used) paging."
            )}
            {line(
              "To fully implement LRU, it is necessary to maintain a linked list of all pages in memory, with the most recently used page at the front and the least recently used page at the rear. "
            )}
            {line("The list must be updated on every memory reference.")}
            {line(
              "Finding a page in the list, deleting it, and then moving it to the front is a very time consuming operations."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
