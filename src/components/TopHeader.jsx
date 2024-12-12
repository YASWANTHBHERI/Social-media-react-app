import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase/Firebase";

function TopHeader() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const id = firebase.userId;

  const { signOutUser,fetchCurrentUserProfile } = useFirebase();
  const handleLogout = () => {
    signOutUser();
  };

  const [userName, setUserName] = useState("");
  const [userProfilePic,setUserProfilePic] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchCurrentUserProfile();
        console.log("Fetched user profile data:", data);
        setUserName(data.userName || "");
        setUserProfilePic(data.profileURL||"");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [fetchCurrentUserProfile]);

  return (
    <div className="w-full lg:w-4/5 lg:px-3 py-2 flex items-start justify-center flex-col-reverse">
      {/* user menu  */}
      <div className="w-full flex items-center justify-start md:justify-start p-1 cursor-pointer relative z-50 gap-2">
        {/* firebase phot or default photo */}
        <div
          className="text-white"
          onClick={() => {
            navigate(`/userProfile/${id}`);
          }}
        >
          {!firebase.url ? (
            <img
              src="/user.png"
              alt="userPic"
              className="w-9 h-5/6 object-cover rounded-full"
            />
          ) : (
            <img
              src={userProfilePic}
              alt="userPic"
              onError={(e) => (e.target.src = '/user.png')}
              className="object-cover rounded-full w-10"
            />
          )}
          
        </div>
        {/* firebase name or email */}
        <div className="">
          <p className="text-xs text-gray-600">Welcome back</p>
          {!firebase.name ? (
            <h2 className="text-md text-white font-semibold lg:flex">
              {firebase.email}
            </h2>
          ) : (
            <h2 className="text-md text-black font-semibold lg:flex">
              {userName}
            </h2>
          )}
          
        </div>
        
      </div>
    </div>
  );
}

export default TopHeader;
