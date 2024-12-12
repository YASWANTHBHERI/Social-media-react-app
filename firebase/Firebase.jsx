import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseContext = createContext();
const firebaseConfig = {
  apiKey: "AIzaSyCE8t1OfuDDwdcAk8h8m-CdoyDsOvP-g18",
  authDomain: "chattogether-98e7e.firebaseapp.com",
  projectId: "chattogether-98e7e",
  storageBucket: "chattogether-98e7e.appspot.com",
  messagingSenderId: "302724399297",
  appId: "1:302724399297:web:d85911c09d5df4774e9440",
  measurementId: "G-XXTV3SYJG8",
};

export const useFirebase = () => useContext(firebaseContext);

const FirebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(FirebaseApp);
console.log(firebaseAuth);
const GoogleProvider = new GoogleAuthProvider();
const firestore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

// eslint-disable-next-line react/prop-types
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("user");
  const [email, setEmail] = useState(null);
  const [url, setUrl] = useState(null);
  const [userId, setUserId] = useState(null);

  // sign up user
  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  // sign in user
  const signInUser = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  // google login
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, GoogleProvider);
    handleGoogleSignIn();
  };
  //signInWithRedirect(firebaseAuth, GoogleProvider);

  // check user login or not

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth); // Sign out the user
      setUser(null); 
      setName("user"); 
      setEmail(null); 
      setUrl(null);
      setUserId(null);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        saveUsers(user);
        //fetchCurrentUserProfile();
      } else setUser(null);
    });
  }, []);



  const saveUsers = async (user) => {
    try {
      const userCollectionRef = collection(firestore, "users");
      const userDocRef = doc(userCollectionRef, user.uid);

      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        console.log("User already exists in Firestore, skipping save.");
        return;
      }
      // Set the user's data
      await setDoc(userDocRef, {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        email: user.email,
        profileURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
        bio: "I am a FrontEnd Developer",
      });

      console.log("User saved successfully in Firestore!");
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signinWithGoogle(); // Google sign-in
      const user = userCredential.user; // Extract the user object
      await saveUsers(user); // Save the user's data in Firestore
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // fectch current user profile
  const fetchCurrentUserProfile = async () => {
    try {
      if (!user) {
        console.log("No user is currently logged in.");
        return null;
      }

      const userDocRef = doc(firestore, "users", user.uid); // Reference the user document by UID
      const userSnapshot = await getDoc(userDocRef); // Fetch the document

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data(); // Extract user data
        console.log("Fetched current user data:", userData);
        return userData; // Return user data
      } else {
        console.log("No user data found for the current user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching current user data:", error);
      throw error;
    }
  };

  const isLoggedIn = user ? true : false;

  // LoggedOut user
  const LoggedOut = () => {
    signOut(firebaseAuth);
  };
  // get user name in display
  const DisplayName = () => {
    onAuthStateChanged(firebaseAuth, (user) => setName(user.displayName));
  };

  // get username or email
  const DisplayEmail = () => {
    onAuthStateChanged(firebaseAuth, (user) => setEmail(user.email));
  };
  // get user image
  const UserImg = () => {
    onAuthStateChanged(firebaseAuth, (user) => setUrl(user.photoURL));
  };

  // edit profile
  const updateUserProfile = async ({ bio, profileURL, userName }) => {
    try {
      const userProfileDocRef = doc(firestore, "users", user.uid);

      // Update specific fields in the document
      await updateDoc(userProfileDocRef, {
        userName: userName,
        bio: bio,
        profileURL: profileURL,
        updatedAt: new Date(),
      });
      
      console.log("User profile updated successfully");
      return updateDoc;
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // create user post data
  const handleCreatePost = async (disc, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);

    const userDocRef = doc(firestore, "posts", user.uid);
    //creating parent collection
    const userPostsCollectionRef = collection(userDocRef, "userPosts");

    const postDocRef = await addDoc(userPostsCollectionRef, {
      disc,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      useEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      userUid: user.uid,
    });
    return postDocRef;
  };

  // Fetching posts collection
  const fetchAllUsersPosts = async () => {
    try {
      const postsCollectionRef = collection(
        firestore,
        "posts",
        user.uid,
        "userPosts"
      ); // Accessing the userPosts sub-collection
      const snapshot = await getDocs(postsCollectionRef);

      if (!snapshot.empty) {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched posts in firebase:", posts);
        return posts;
      } else {
        console.log("No documents found in userPosts sub-collection.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addAllUsersPost = async (disc, cover) => {
    try {
      // Create a reference to upload the image to Firebase Storage
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${cover.name}`
      );
      const uploadResult = await uploadBytes(imageRef, cover);
      console.log("Image uploaded successfully at:", uploadResult.ref.fullPath);

      // Add the post data to the 'allUsersPosts' collection in Firestore
      const postDocRef = await addDoc(collection(firestore, "allUsersPosts"), {
        disc,
        imageURL: uploadResult.ref.fullPath, // Store the image path
        userID: user.uid, // User's UID (ensure 'user' is properly defined)
        useEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userUid: user.uid,
      });

      console.log("Post added to allUsersPosts with ID:", postDocRef.id);
      return postDocRef; // Return the document reference
    } catch (error) {
      console.error("Error adding post to allUsersPosts:", error);
      throw error; // Throw the error to handle it later
    }
  };

  // set user post data
  const listPost = () => {
    // return getDocs(collection(firestore, "userUpload"));
    console.log(
      "allUsersPosts",
      getDocs(collection(firestore, "allUsersPosts"))
    );
    return getDocs(collection(firestore, "allUsersPosts"));
  };

  // get image for post data
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  useEffect(() => {
    DisplayName();
    DisplayEmail();
    UserImg();
  }, []);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);
  return (
    <firebaseContext.Provider
      value={{
        signupUser,
        signInUser,
        signinWithGoogle,
        isLoggedIn,
        LoggedOut,
        signOutUser,
        name,
        email,
        url,
        handleCreatePost,
        listPost,
        getImageURL,
        userId,
        fetchAllUsersPosts,
        addAllUsersPost,
        fetchCurrentUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
