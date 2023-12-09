 // Import the functions you need from the SDKs you need
 import { initializeApp } from 'firebase/app';
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
 import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 

  
 // Initialize Firebase
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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

    console.log('User registered successfully!');
  } catch (error) {
    console.error('Registration error:', error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    // Sign in user with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    console.log('User logged in successfully:', user.uid);
  } catch (error) {
    console.error('Login error:', error.message);
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

const addMessage = async (uid, destination, date1, date2, message) => {
  try {
    // Create a new document in the "messages" collection with an auto-generated ID
    const messagesCollectionRef = collection(db, 'messages');
    await addDoc(messagesCollectionRef, {
      uid,
      destination,
      date1,
      date2,
      message,
      time: new Date().getTime(),
    });
    return true;
  } catch (error) {
    return false;
  }
};




export { auth, db, registerUser, loginUser, getCurrentUser, logout, addMessage };