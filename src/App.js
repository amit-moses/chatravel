import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './components/chatbox/Chat';



function App() {
  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    // Reference to the "color" collection
    const colorCollection = collection(db, 'colors');

    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(colorCollection, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Update the component state with the new data
      setColorData(newData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once

  // Render your component with the updated state
  return (
  //   <div>
  //   <h1>Colors:</h1>
  //   {colorData.map((color) => (
  //     <h1 key={color.id}>{color.name}</h1>
  //   ))}
  // </div>


  <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<></>}
        />
        <Route
          path="/chat"
          element={<Chat/>}
        />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;