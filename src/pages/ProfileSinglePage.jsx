import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { useFirebase } from "../../firebase/Firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function ProfileSinglePage() {
  const firebase = useFirebase();
  const { fetchAllUsersPosts,fetchCurrentUserProfile } = useFirebase();
  const [accountPostedImages, setAccountPostedImages] = useState([]);
  const navigate = useNavigate();

  const [userData,setUserData] = useState([]);

  const handleEditProfile = () => {
    const userId = firebase.userId; // Replace with the actual user ID from Firebase or your app logic
    navigate(`/edituserprofile/${userId}`);
  };

  useEffect(() => {
    const fetchAndLogPosts = async () => {
      try {
        const allPosts = await fetchAllUsersPosts();
        console.log("Fetched Posts:", allPosts);

        // Initialize an array to store the image URLs
        const imageUrls = [];

        for (const eachPost of allPosts) {
          // Get the Firebase Storage reference for the image
          const imageRef = ref(getStorage(), eachPost.imageURL);

          // Get the download URL for the image
          const imageUrl = await getDownloadURL(imageRef);

          // Push the image URL into the array
          imageUrls.push(imageUrl);
        }

        // Update the state with the image URLs
        setAccountPostedImages(imageUrls);
        console.log("Account Posted Images:", imageUrls);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAndLogPosts();
  }, [fetchAllUsersPosts]);


  //fetchin user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchCurrentUserProfile();
        console.log("Fetched user profile data:", data);
        setUserData(()=>data)
      
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserProfile();
  }, [fetchCurrentUserProfile]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full  bg-white p-3 flex items-center justify-center flex-col gap-3">
      
      <span className="w-full lg:w-11/12 flex items-center justify-center relative">
      <FaArrowLeftLong className="relative cursor-pointer self-start" onClick={()=>navigate(`/`)} />
        {!firebase.url ? (
          <img
            src="/user.png"
            alt="default image"
            className="w-full h-96 object-contain overflow-hidden shadow-md relative"
          />
        ) : (
          <img
            src={userData.profileURL}
            alt="userprofile"
            onError={(e) => (e.target.src = '/user.png')}
            className="w-full h-60 object-cover  overflow-hidden shadow-md relative"
          />
        )}

        {!firebase.url ? (
          <img
            src="/user.png"
            alt=""
            onError={(e) => (e.target.src = '/user.png')}
            className="w-36 h-36 absolute left-0 bg-black -bottom-20 border-8 border-gray-700 rounded-full object-cover"
          />
        ) : (
          <img
            src={userData.profileURL}
            alt=""
            className="w-36 h-36 absolute left-0  -bottom-20 border-8 border-gray-700 rounded-full object-cover"
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
      {/* edit profile */}
      <div className="relative lg:w-8/12">
        <button
          className="border-2 border-gray-700 rounded-full py-1 px-5 hover:bg-green-400 font-semibold"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>

      {/* display profile */}
      <div className="relative lg:w-11/12 top-8">
      <h1 className="text-lg font-semibold">{userData.userName}</h1>
      <h2>{userData.bio}</h2>    
        
      </div>

      {/* posts */}
      <div className="mt-20">
        <h1 className="font-semibold text-md">My Posts</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {accountPostedImages.map((eachImageURL, index) => (
          <div key={index}>
            <img
              className="h-60 max-w-full rounded-lg"
              src={eachImageURL}
              alt={`Post ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSinglePage;
