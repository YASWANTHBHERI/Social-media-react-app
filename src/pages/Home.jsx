import Post from "../components/Post";
import { useEffect } from "react";
import TopHeader from "../components/TopHeader";
//import NewpostUploader from "../components/NewpostUploader";
import { Modal } from "../components/Modal";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-full flex items-start justify-center relative inset-0 z-0">
        {/* Left side components */}

        <div className="hidden lg:flex items-center justify-center flex-col p-4 w-0 md:w-1/4 sticky left-0 top-16">
          {/* <ProfileCom /> */}
        </div>

        {/* Center side components */}
        <div className="flex items-center justify-center flex-col p-3 w-full lg:w-1/2">
          <TopHeader />
          {/* <NewpostUploader/> */}

          <div className="w-full lg:w-4/5 lg:px-3 py-2 flex items-start justify-center flex-col-reverse text-white">
            <h1 className="px-1 text-lg text-black font-semibold">Feeds</h1>
          </div>
          <Post />
        </div>

        {/* Right side components */}

        <div className="hidden lg:flex items-center justify-center flex-col  p-3 w-1/4 sticky right-0 top-16">
          {/* <Recent /> */}
        </div>
      </div>
      <div className="fixed bottom-5 right-5 md:left-3/4 md:right-1/2 z-10 flex justify-center items-center">
        <Modal />
      </div>
    </>
  );
}

export default Home;
