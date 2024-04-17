import React, { useState, useRef, useEffect, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiRightArrow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function ReaderWriter() {
  const reader = useRef(null);
  const name = useRef(null);
  const message = useRef(null);
  const allowReaderWriter = useRef(true);
  const readerCount = useRef(0);
  const [showAlert, setshowAlert] = useState(false);
  const [userReader, setuserReader] = useState([]);
  const [userReaderInDb, setUserReaderInDb] = useState([]);
  const [userWriter, setuserWriter] = useState([]);
  const [userWriterInDb, setuserWriterInDb] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    addReaders();
    addWriter();
  }, [userReader, userWriter, userWriterInDb, userReaderInDb]);

  // Function for deleting process from main memory
  const deleteProcess = ({ index, isReader }) => {
    if (isReader) {
      const updatedUsers = userReader.filter((_, i) => i !== index);
      setuserReader(updatedUsers);
    } else {
      const updatedUsers = userWriter.filter((_, i) => i !== index);
      setuserWriter(updatedUsers);
    }
  };

  //   Function that defines the process
  const process = (props) => {
    return (
      <motion.div
        key={props.key}
        initial={{ opacity: 0, translateY: 5 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -5 }}
        className="min-h-[15%] h-[15%] w-full flex border-b-emerald-300 border-b-[3px] duration-700 ease-linear"
      >
        <div className="h-full w-1/2 overflow-auto flex items-center text-[1.3vw] font-normal">
          {props.isReader ? "Reader" : "Writer"}: {props.name}
        </div>
        <div className="h-full w-1/2 flex items-center justify-end gap-5">
          <Spinner />
          <button
            className=" bg-slate-500/10 w-9 h-9 flex justify-center items-center cursor-pointer rounded-md text-[1.6vw] duration-300 ease-linear text-black hover:bg-red-400"
            onClick={() => {
              deleteProcess({ index: props.index, isReader: props.isReader });
            }}
          >
            <AiFillDelete />
          </button>
        </div>
      </motion.div>
    );
  };

  //   Function that defines the reader in Db
  const readerInDb = (props) => {
    return (
      <motion.div
        key={props.index}
        initial={{ opacity: 0, translateY: 5 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-[20%] h-[20%] border-b-black border-b-[1px] flex items-center"
      >
        <div className="h-full w-1/2 flex items-center text-[1.2vw] overflow-auto">
          {props.name}
        </div>
        <div className="h-full w-1/2 flex items-center justify-end">
          <button
            className="w-max font-medium px-2 py-1 bg-emerald-400 rounded-lg text-[1vw] duration-300 ease-linear text-black hover:bg-emerald-300"
            onClick={() => removeReaderFromDb(props.index)}
          >
            Done
          </button>
        </div>
      </motion.div>
    );
  };

  //   Function for adding readers in database
  const addReaders = () => {
    if (allowReaderWriter.current && userReader.length > 0) {
      allowReaderWriter.current = false;
      readerCount.current++;
      setUserReaderInDb([...userReaderInDb, userReader[0]]);
      deleteProcess({ index: 0, isReader: true });
      allowReaderWriter.current = true;
    }
  };

  //   Function for removing readers from database
  const removeReaderFromDb = (index) => {
    readerCount.current--;
    const updatedReaders = userReaderInDb.filter((_, ind) => ind !== index);
    setUserReaderInDb(updatedReaders);
  };

  const addWriter = () => {
    if (
      allowReaderWriter.current &&
      userWriter.length > 0 &&
      readerCount.current == 0
    ) {
      allowReaderWriter.current = false;

      setuserWriterInDb(userWriter[0]);
      deleteProcess({ index: 0, isReader: false });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-[75vh] mt-16 flex justify-evenly px-20"
    >
      <Alert
        show={showAlert}
        setshow={setshowAlert}
        title="Alert!"
        message={message.current}
      />
      {/* Adding Reader/Writer */}
      <div className="h-[70vh] w-[45%] flex flex-col justify-center items-center">
        <div className="h-full w-full rounded-xl bg-gray-200/90 overflow-hidden">
          {/* Taking Input */}
          <div className="w-full h-[12%] bg-gray-200 flex items-center px-5 bg-gradient-to-r from-slate-400 to-slate-500">
            <div className="w-[60%] h-full flex items-center">
              <p className="font-light text-[1.13vw] w-[45%]">
                Enter the name:
              </p>
              <input
                ref={name}
                type="text"
                placeholder="Eg. Dhruvin"
                className="rounded-lg w-[55%] h-[60%] text-[1.05vw] pl-2 remove-arrow font-medium focus:outline-emerald-500 bg-gray-100 shadow-inner"
              />
            </div>
            <div className="w-[40%] h-full flex justify-evenly gap-3 items-center">
              <select
                ref={reader}
                className="rounded-lg w-[55%] h-[60%] text-[1.05vw] pl-2 font-medium focus:outline-emerald-500 bg-gray-100 shadow-inner cursor-pointer"
              >
                <option value="Reader">Reader</option>
                <option value="Writer">Writer</option>
              </select>
              <button
                className="w-max font-medium px-4 py-2 bg-emerald-400 rounded-lg text-[1.3vw] duration-300 ease-linear text-black hover:bg-emerald-300"
                onClick={() => {
                  if (name.current.value == "") {
                    message.current = "Please enter the name of the person";
                    setshowAlert(() => true);
                  } else {
                    if (reader.current.value == "Reader") {
                      setuserReader([...userReader, name.current.value]);
                    } else {
                      setuserWriter([...userWriter, name.current.value]);
                    }
                    name.current.value = "";
                  }
                }}
              >
                <BiRightArrow />
              </button>
            </div>
          </div>

          {/* Process showing */}
          <div className="w-full h-[88%] flex justify-center items-center">
            <div className="w-[80%] h-[90%] overflow-auto">
              <AnimatePresence>
                {userReader.map((element, index) => {
                  return process({
                    name: element,
                    key: `reader_${index}`,
                    index: index,
                    isReader: true,
                  });
                })}
                {userWriter.map((element, index) => {
                  return process({
                    name: element,
                    key: `writer_${index}`,
                    index: index,
                    isReader: false,
                  });
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* DataBase div */}
      <div className="h-[70vh] w-[45%] bg-gray-200/90 rounded-xl overflow-hidden">
        <div className="h-[12%] w-full flex justify-center items-center text-[1.5vw] font-medium bg-gradient-to-r from-slate-500 to-slate-400">
          Database
        </div>
        <div className="h-[88%] w-full flex justify-evenly items-center">
          <div className="w-[45%] h-[70%] bg-white rounded-xl overflow-hidden px-1">
            <div className="w-full h-[15%]  text-[1.5vw] flex justify-center items-center font-medium border-b-emerald-300 border-b-[3px]">
              Readers
            </div>

            <div className="w-full h-[70%] overflow-auto px-3">
              <AnimatePresence>
                {userReaderInDb.length > 0 ? (
                  userReaderInDb.map((element, index) => {
                    return readerInDb({ name: element, index: index });
                  })
                ) : (
                  <p className="h-full w-full flex justify-center items-center text-[1.5vw] text-center font-medium text-gray-400">
                    No reader is present in database
                  </p>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full h-[15%] text-[1.3vw] flex justify-center items-center font-medium border-t-red-400 border-t-[3px]">
              Reader Count : {readerCount.current}
            </div>
          </div>
          <div className="w-[45%] h-[70%] bg-white rounded-xl">
            <div className="w-full h-[15%]  text-[1.5vw] flex justify-center items-center font-medium border-b-emerald-300 border-b-[3px]">
              Writer
            </div>
            <div className="w-full h-[70%] flex justify-center items-center px-1 gap-5">
              {userWriterInDb == "" && (
                <p className="text-[1.5vw] text-center font-medium text-gray-400">
                  No writer is updating database
                </p>
              )}
              {userWriterInDb != "" && (
                <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                  <p className="text-[1.5vw] text-center font-medium">
                    Writer{" "}
                    <span className="text-emerald-500">{userWriterInDb}</span>{" "}
                    is updating database
                  </p>
                  <button
                    className="w-max font-medium px-4 py-2 bg-emerald-400 rounded-lg text-[1.3vw] duration-300 ease-linear text-black hover:bg-emerald-300"
                    onClick={() => {
                      allowReaderWriter.current = true;
                      setuserWriterInDb("");
                    }}
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>
            <div className="w-full h-[15%] text-[1.3vw] flex justify-center items-center font-medium border-t-red-400 border-t-[3px]">
              Writer Lock :{" "}
              {readerCount.current == 0 && allowReaderWriter.current ? (
                <span className="text-emerald-500"> False</span>
              ) : (
                <span className="text-red-500"> True</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReaderWriter;
