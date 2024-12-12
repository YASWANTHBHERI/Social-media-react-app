import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProfileSinglePage from "./pages/ProfileSinglePage";
import { useFirebase } from "../firebase/Firebase";
import LoginSignpage from "./components/LoginSignpage";
import { EditProfile } from "./components/EditProfile";

function App() {
  const firebase = useFirebase();

  if (!firebase.isLoggedIn) {
    return <LoginSignpage />;
  }

  return (
    <>
      <div className="w-full h-full bg-white">
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login&signup" element={<LoginSignpage />} />
          <Route path="/userProfile/:id" element={<ProfileSinglePage />} />
          <Route path="/edituserprofile/:id" element={<EditProfile/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
