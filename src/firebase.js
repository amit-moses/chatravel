 // Import the functions you need from the SDKs you need
 import { initializeApp } from 'firebase/app';
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
 import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
 import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig =  {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

  
 // Initialize Firebase
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const registerUser = async (email, password, name, date1, date2, destination, lastedit) => {
  try {
    // Create user with email and password
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Add additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      date1,
      date2,
      destination,
      lastedit,
    });

    return true;
  } catch (error) {
    return false;
  }
};

const loginUser = async (email, password) => {
  try {
    // Sign in user with email and password
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};

const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          resolve({ uid: user.uid, email: user.email, ...userData });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};

const updateUserData = async (userdata)=>{
  const washingtonRef = doc(db, "users", userdata.id);
  try{
    await updateDoc(washingtonRef, {
      uid: userdata.id,
      destination: userdata.destination,
      date1: userdata.date1,
      date2: userdata.date2,
      name: userdata.name,
      lastedit: new Date().getTime()
    });
    return true;
  }catch (error){
    return false;
  }
}
const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully.');
    return true;
  } catch (error) {
    console.error('Logout error:', error.message);
    return false;
  }
};

const addMessage = async (uid, destination, date1, date2, message, picture) => {
  try {
    // Create a new document in the "messages" collection with an auto-generated ID
    const messagesCollectionRef = collection(db, 'messages');
    await addDoc(messagesCollectionRef, {
      uid,
      destination,
      date1,
      date2,
      message,
      picture,
      time: new Date().getTime(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

const handleUpload = (image, setProgress, useruid, des, date1, date2) => {
  const myref = ref(storage, `images/${new Date().getTime()}-${useruid}`);
  const uploadTask = uploadBytesResumable(myref,image);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (error) => {
      console.error('Upload error:', error.message);
    },
    () => {


      getDownloadURL(uploadTask.snapshot.ref)
      .then((url) => {
        addMessage(useruid, des, date1, date2, "", url);
          setProgress(-1);
    }).catch((downloadError) => {
          console.error('Download URL error:', downloadError.message);
        });
    }
  );
};




export { auth, db, registerUser, loginUser, getCurrentUser, logout, addMessage, handleUpload, updateUserData };