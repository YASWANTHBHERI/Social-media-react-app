// import { FaCirclePlus } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsImage } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { useFirebase } from "../../firebase/Firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const NewpostUploader = ({ handleClose }) =>{
  const [cover, setCover] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [disc, setDisc] = useState("");
  const [value, setValue] = useState("Create");
  const navigate = useNavigate();

  const firebase = useFirebase();



  const handleSubmit = async (e) => {
    console.log("submiting the data to firebase");
    e.preventDefault();
    await firebase.handleCreatePost(disc, cover);
    await firebase.addAllUsersPost(disc, cover);
    navigate(`/`);
  };

  const handleClick = () => {
    const submit = document.querySelector(".submit");
    submit.style.cursor = "no-drop";
    setValue("Creating..");
    setInterval(() => {
      setValue("Create");
      submit.style.cursor = "pointer";
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2 items-center cursor-pointer">
        <FaArrowLeftLong onClick={handleClose} />
        <h1 className="text-lg font-semibold text-black">New Post</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* display */}
        {coverURL.length > 0 && (
          <div className="load image mb-3">
            <img
              className="w-full max-h-44 max-w-full object-contain"
              src={`${coverURL}`}
              alt="cover"
            />
          </div>
        )}

        <textarea
          maxLength={250}
          onChange={(e) => setDisc(e.target.value)}
          value={disc}
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border outline-none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none"
          placeholder="What's on your mind...."
          required
        />
        <div className="flex flex-col items-start justify-center w-full gap-2 mt-2">
          {/* upload data */}
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setCover(file);
                console.log("e target", file);
                // if(file) console.log("file is present",true);
                // else if(!file) console.log("file is not present");
                const url = file ? URL.createObjectURL(file) : "";
                // console.log("url",url);
                // console.log("check url",url.length>0);
                setCoverURL(file ? url : "");
              }}
              required
            />
            <label htmlFor="image" className="cursor-pointer flex gap-2">
              <BsImage className="text-green-600 text-2xl" />
              Photos
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="video"
              className="hidden"
              accept="video/mp4,video/mkv, video/x-m4v,video/*"
            />
            <label className="cursor-pointer flex gap-2" htmlFor="video">
              <SiYoutubemusic className="text-blue-600 text-2xl cursor-pointer" />
              Video
            </label>
          </div>
        </div>
        <div className="w-full">
          <input
            type="submit"
            className="bg-black px-5 py-2 my-4 text-white font-semibold cursor-pointer submit w-full rounded-full"
            value={value}
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
}
