import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../../firebase/Firebase";
export const GoogleLogin = () => {
    const firebase = useFirebase();
  return (
    <div className="flex justify-center">
      <button
        className="text-white flex items-center justify-center bg-gray-700 px-3 lg:px-4 py-2 text-xs lg:text-sm rounded-full shadow-lg font-semibold cursor-pointer my-2"
        onClick={firebase.signinWithGoogle}
      >
        <FcGoogle fontSize={20} className="shadow mx-1 lg:mx-2" /> Continue with
        Google
      </button>
    </div>
  );
};
