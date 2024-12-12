import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {NewpostUploader} from "./NewpostUploader";
import { Share } from "./Share";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Modal toggle button */}
      <div
        onClick={handleOpen}
        className="rounded-full text-white bg-black p-4 cursor-pointer"
      >
       <FaPlus />
      </div>

      {/* Main modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              

              {/* Modal body */}
              <div className="p-5 flex justify-center">
                <NewpostUploader handleClose={handleClose}/>
                
              </div>

              {/* Modal footer */}
              {/* <div className="flex items-center justify-end p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                
                <button
                  onClick={handleClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
