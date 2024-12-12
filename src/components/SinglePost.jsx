/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "../../firebase/Firebase";

function SinglePost(props) {
  const [url, setUrl] = useState("");
  //const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  const firebase = useFirebase();

  //let hexColor = `#${Math.random().toString(16).slice(2,8).padEnd(6,0)}`;
  const hexColor = [
    "#F7EBFF",
    "#FFFAEE",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFF5",
    "#FFC133",
    "#E4F1FE",
    "#F5E3E0",
    "#EAE7DC",
  ];

  const colorGenerator = () => {
    const randomColor = hexColor[Math.floor(Math.random() * hexColor.length)];
    return randomColor;
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, [firebase, props]);

  return (
    <div
      style={{ backgroundColor: colorGenerator() }}
      className="w-full lg:px-4 py-2 my-3  rounded-3xl flex items-center justify-center flex-col"
      // eslint-disable-next-line react/prop-types
      key={props.id}
    >
      {/* post top section  */}

      <span className="w-full flex items-center justify-center my-2">
        <span className="w-1/12 flex items-center justify-center">
          {!props.photoURL ? (
            <img
              // eslint-disable-next-line react/prop-types
              src="/user.png"
              alt="userPic"
              className="lg:w-10 lg:h-10 w-8 h-8 rounded-full object-cover border-2 bg-gray-500 border-gray-500 cursor-pointer"
              // eslint-disable-next-line react/prop-types
              onClick={() => navigate(`/userProfile/${props.userID}`)}
            />
          ) : (
            <img
              // eslint-disable-next-line react/prop-types
              src={props.photoURL}
              alt="profilePic"
              className="lg:w-10  rounded-full object-cover border-2 border-gray-500 cursor-pointer"
              onError={(e) => (e.target.src = '/user.png')}
              // eslint-disable-next-line react/prop-types
              onClick={() => navigate(`/userProfile/${props.userID}`)}
            />
          )}
        </span>
        {/* Name and Date */}
        <span className="w-3/4 flex items-start justify-center flex-col">
          <h3
            className="mx-2 text-black text-xs lg:text-sm cursor-pointer font-semibold flex items-center justify-center"
            onClick={() => navigate(`/userProfile/${props.userID}`)}
          >
            {props.displayName}
          </h3>
          <p className="mx-2"> {currTime}</p>
        </span>

        <span className="w-1/12  flex items-center justify-center">
          <BsThreeDotsVertical
            fontSize={22}
            className="text-black cursor-pointer my-2 rotate-90"
          />
        </span>
      </span>
      <span className="text-black text-sm font-semibold lg:text-xs w-full px-5 my-2 tracking-wider">
        {/* eslint-disable-next-line react/prop-types */}
        {props.disc}
      </span>
      {/* post image section  */}
      <span className="w-full object-cover px-5 my-4">
        {!url ? (
          <img
            src="https://res.cloudinary.com/dfnyfupmc/image/upload/c_fill,h_500,w_500/fd493749-3cf1-4d74-ae59-aa3e5ddb69ed?_a=DAGAACARZAA0"
            className="w-full h-72 bg-gray-600 rounded-lg dark:bg-gray-600 border-none"
          />
        ) : (
          <img
            src={url}
            alt="post"
            className="w-full h-1/2 object-cover rounded-2xl"
          />
        )}
      </span>
      {/* like share */}

      <div className="w-full flex items-center justify-between text-black px-5 my-1 py-3">
        <span><AiOutlineHeart fontSize={19} className="mx-2 cursor-pointer"/></span>
        <div className="flex items-center justify-center bg-[#00000012] text-black font-bold rounded-lg px-3 py-1">
          <IoIosSend fontSize={19} className="cursor-pointer" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
