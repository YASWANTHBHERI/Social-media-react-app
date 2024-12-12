import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { useFirebase } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";

export const EditProfile=() => {
  const firebase = useFirebase();
  const {fetchCurrentUserProfile,updateUserProfile,userId } = useFirebase();
  const navigate = useNavigate();

  // State for user data and individual fields
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState("");
  const [userProfilePic,setUserProfilePic] = useState("");
  const [bio, setBio] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchCurrentUserProfile();
        console.log("Fetched user profile data:", data);
        setUserData(data);
        setUserName(data.userName || "");
        setBio(data.bio || "");
        setUserProfilePic(data.profileURL||"");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [fetchCurrentUserProfile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  //form handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...userData, userName, bio };
      await updateUserProfile(updatedData);
      setUserData(updatedData);
      navigate(`/userProfile/${userId}`);
      console.log("Profile updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-white p-3 flex items-center flex-col gap-3">
      <span className="w-full lg:w-11/12 flex items-center justify-center relative">
      <FaArrowLeftLong className="relative cursor-pointer self-start" onClick={()=>navigate(`/userProfile/${userId}`)} />
        {!firebase.url ? (
          <img
            src="/user.png"
            alt=""
            className="w-full h-96 object-contain rounded-2xl overflow-hidden shadow-md relative"
          />
        ) : (
          <img
            src={userProfilePic}
            alt=""
            onError={(e) => (e.target.src = '/user.png')}
            className="w-full h-96 object-cover rounded-2xl overflow-hidden shadow-md relative"
          />
        )}

        {!firebase.url ? (
          <img
            src="/user.png"
            alt=""
            onError={(e) => (e.target.src = '/user.png')}
            className="w-36 h-36 absolute left-5 bg-black -bottom-20 border-8 border-gray-700 rounded-full object-cover"
          />
        ) : (
          <img
            src={userProfilePic}
            alt=""
            className="w-36 h-36 absolute left-5 -bottom-20 border-8 border-gray-700 rounded-full object-cover"
          />
        )}

        <input type="file" id="image" className="hidden" accept="image/*" />
        <label htmlFor="image">
          <LuImagePlus
            fontSize={25}
            className="absolute right-3 text-white bottom-2 cursor-pointer"
          />
        </label>

        
      </span>

      {/* Update profile */}

      <form onSubmit={handleSubmit} className="relative w-11/12 lg:w-11/12 top-20">
        <div className="flex flex-col gap-2">
          <label htmlFor="userName" className="font-medium">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="bg-transparent px-4 py-1 border-b-2 border-gray-500 focus:outline-none focus:ring-0"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="bio" className="font-medium">Bio</label>
          <input
            type="text"
            id="bio"
            name="bio"
            className="bg-transparent px-4 py-1 border-b-2 border-gray-500 focus:outline-none focus:ring-0"
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-full mt-4 font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
