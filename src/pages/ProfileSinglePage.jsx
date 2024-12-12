import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useFirebase } from "../../firebase/Firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function ProfileSinglePage() {
  const firebase = useFirebase();
  const { fetchAllUsersPosts,name } = useFirebase();
  const [accountPostedImages, setAccountPostedImages] = useState([]);

  let [userName, setUserName] = useState(name);

  const handleUserName = (currname) =>{
    setUserName(()=>userName = currname);
  }


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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-black/10 p-3 flex items-center justify-center flex-col gap-3">
      <span className="w-full lg:w-11/12 flex items-center justify-center relative">
        {!firebase.url ? (
          <img
            src="/user.png"
            alt=""
            className="w-full h-96 object-contain rounded-2xl overflow-hidden shadow-md relative"
          />
        ) : (
          <img
            src={firebase.url}
            alt=""
            className="w-full h-96 object-cover rounded-2xl overflow-hidden shadow-md relative"
          />
        )}

        {!firebase.url ? (
          <img
            src="/user.png"
            alt=""
            className="w-36 h-36 absolute left-0 bg-black -bottom-20 border-8 border-gray-700 rounded-full object-cover"
          />
        ) : (
          <img
            src={firebase.url}
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
        <button className="border-2 border-gray-700 rounded-full py-1 px-5 hover:bg-green-400 font-semibold">
          Edit Profile
        </button>
      </div>

      {/* display profile */}
      <div className="relative lg:w-11/12 top-8">
      <div className="hiddenInput flex gap-2">
      <input
          type="text"
          id="fname"
          name="fname"
          className="bg-transparent px-4 py-1 border-b-2 border-red-500 focus:outline-none focus:ring-0"
          placeholder="Enter your name"
          value={userName}
          onChange={(e)=>handleUserName(e.target.value)}
        />
        <div className="self-end">
          <button className="py-1 px-5 bg-green-800 font-semibold rounded-lg text-white">Update</button>
        </div>
        
      </div>
        

        <h1 className="text-lg font-semibold">Name</h1>
        <h2 className="text-md font-semibold">Bio</h2>
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
